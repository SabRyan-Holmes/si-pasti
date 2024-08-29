<?php

namespace App\Http\Controllers;

use App\Http\Requests\berkasPembayaranStoreRequest;
use App\Http\Requests\PengajuanStoreRequest;
use App\Http\Requests\PPK\UnggahBerkasStoreRequest;
use Inertia\Inertia;
use App\Models\Document;
use App\Models\Pengajuan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;


class KeuanganController extends Controller
{


    public function daftar_berkas()
    {
        $pengajuans = Pengajuan::latest();
        $subTitle = "";


        if (request('byStatus')) {
            $subTitle = 'Berdasarkan Status : ' . request('byStatus');
        }

        if (request('byStage')) {
            $subTitle = 'Berdasarkan Stage : ' . request('byStage');
        }

        return Inertia::render('Keuangan/DaftarBerkas', [
            // "title" => "Pengajuan " . $title,
            "title" => "Daftar Berkas",
            "subTitle" => $subTitle,
            // "pengajuans" => $pengajuans->paginate(10),
            "pengajuans" => $pengajuans->filter(request(['search', 'byStatus', 'byStage']))->paginate(10),
            "searchReq" => request('search'),
            "byStatusReq" => request('byStatus'),
            "byStageReq" => request('byStage'),
        ]);
    }

    public function show_berkas(Pengajuan $pengajuan)
    {
        $kuitansi = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Pengajuan Kuitansi')->get();
        $pembayaran = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Berkas Pembayaran')->get();
        $stagesDoneOrder = ['pesanan selesai', 'pembayaran', 'selesai'];
        $isDoneOrder = in_array($pengajuan->stage, $stagesDoneOrder);

        return Inertia::render('Keuangan/ShowBerkas', [
            'title' => 'Detail Berkas',
            'pengajuan' => $pengajuan,
            'ketuaTim' => $pengajuan->created_by,
            'berkasKuitansi' => $kuitansi,
            'berkasPembayaran' => $pembayaran,
            'isDoneOrder' => $isDoneOrder

        ]);
    }


    public function unggah_berkas(Pengajuan $pengajuan)
    {

        $berkasPembayaran = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Berkas Pembayaran')->get();
        // Menggunakan array untuk pengecekan kondisi stage
        $stagesDoneOrder = ['pesanan selesai', 'pembayaran', 'selesai'];
        $isDoneOrder = in_array($pengajuan->stage, $stagesDoneOrder);
        return Inertia::render('Keuangan/UnggahBerkas', [
            'title' => 'Pengajuan berkas ke divisi PBJ',
            'pengajuan' => $pengajuan,
            'berkasPembayaran' => $berkasPembayaran,
            'isDoneOrder' => $isDoneOrder
        ]);
    }

    public function ajukan_berkas(berkasPembayaranStoreRequest $request)
    {


        $request->validated();

        $this->storeDocument($request, 'spm', 'SPM', 'Surat Perintah Pembayaran(SPM)', 'Berkas Pembayaran');
        // Update Stage jadi pembayaran jika sudah mengirim BA, kuitansi oleh PPK, & spm oleh keuangan
        Pengajuan::where('id', $request->pengajuan_id)->update([
            'stage' => 'pembayaran'
        ]);
        return redirect()->back()->with('message', 'Berkas berhasil diunggah!');
    }



    public function riwayat_pengajuan()
    {

        $pengajuans = Pengajuan::latest();
        $subTitle = "";


        if (request('byStatus')) {
            $subTitle = 'Berdasarkan Status : ' . request('byStatus');
        }

        if (request('byStage')) {
            $subTitle = 'Berdasarkan Stage : ' . request('byStage');
        }

        return Inertia::render('Keuangan/RiwayatPengajuan', [
            // "title" => "Pengajuan " . $title,
            "title" => "Riwayat Pengajuan",
            "subTitle" => $subTitle,
            // "pengajuans" => $pengajuans->paginate(10),
            "pengajuans" => $pengajuans->filter(request(['search', 'byStatus', 'byStage']))->paginate(10),
            "searchReq" => request('search'),
            "byStatusReq" => request('byStatus'),
            "byStageReq" => request('byStage'),
        ]);
    }

    public function show_pengajuan(Pengajuan $pengajuan)
    {
        $berkas_pembayaran = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Berkas Pembayaran')->get();
        // Menggunakan array untuk pengecekan kondisi stage
        $stagesDoneOrder = ['pesanan selesai', 'pembayaran', 'selesai'];
        // dd($pengajuan->stage);
        $isDoneOrder = in_array($pengajuan->stage, $stagesDoneOrder);
        // dd($berkas_pembayaran);
        return Inertia::render('Keuangan/ShowPengajuan', [
            'title' => 'Detail Riwayat Pengajuan',
            'pengajuan' => $pengajuan,
            'berkasPembayaran' => $berkas_pembayaran,
            'isDoneOrder' => $isDoneOrder
        ]);
    }

    public function ajukan_pengajuan(PengajuanStoreRequest $request)
    {
        // dd($request);
        $validated = $request->validated();
        // Store Pengajuan/Pengajuan

        $new_pengajuan = Pengajuan::create([
            'nama_kegiatan' => $validated['nama_kegiatan'],
            'nama_tim' => $validated['nama_tim'],
            'created_by' => Auth::user()->id,
            'status' => 'diproses',
            'stage' => 'diajukan ketua tim',
            'start_date' => now(),
            'end_date' => null,
        ]);

        // Logic Store Document
        $this->storeDocument($request, 'kak', 'KAK', 'Kerangka Ajuan Kerja', 'Pengajuan Permintaan Pengadaan', $new_pengajuan->id);
        $this->storeDocument($request, 'form_permintaan', 'FP', 'Form Permintaan', 'Pengajuan Permintaan Pengadaan', $new_pengajuan->id);
        $this->storeDocument($request, 'surat_permintaan', 'SP', 'Surat Permintaan', 'Pengajuan Permintaan Pengadaan', $new_pengajuan->id);

        return redirect()->back()->with('message', 'Pengajuan berhasil diajukan!');
    }



    private function storeDocument($request, $fileKey, $prefix, $jenisDokumen, $kategori)
    {
        if ($request->file($fileKey)) {
            // Membuat nama file
            $fileName = $prefix . '-' . $request->nama_kegiatan . '.' . $request->file($fileKey)->getClientOriginalExtension();
            $path = 'public/' . strtolower($prefix) . '-file/';

            // Menyimpan file
            Storage::disk('local')->putFileAs($path, $request->file($fileKey), $fileName);

            // Path yang akan disimpan di database
            $filePath = strtolower($prefix) . '-file/' . $fileName;

            // Mencari dokumen yang sudah ada berdasarkan pengajuan_id, nama, dan kategori
            $existingDocument = Document::where('pengajuan_id', $request->pengajuan_id)
                ->where('nama', $prefix . ' - ' . $request->nama_kegiatan)
                ->where('kategori', $kategori)
                ->where('submitted_by', Auth::user()->id)
                ->first();

            if ($existingDocument) {
                // Menghapus file sebelumnya
                Storage::delete('/public/storage/' . $existingDocument->path);

                // Mengupdate dokumen yang sudah ada
                $existingDocument->update([
                    'tipe_file' => $request->file($fileKey)->getClientOriginalExtension(),
                    'path' => $filePath,
                    'is_valid' => null,
                    'jenis_dokumen' => $jenisDokumen,
                    'submitted_by' => Auth::user()->id,
                ]);
            } else {
                // Membuat dokumen baru
                Document::create([
                    'nama' => $prefix . ' - ' . $request->nama_kegiatan,
                    'kategori' => $kategori,
                    'tipe_file' => $request->file($fileKey)->getClientOriginalExtension(),
                    'path' => $filePath,
                    'jenis_dokumen' => $jenisDokumen,
                    'pengajuan_id' => $request->pengajuan_id,
                    'submitted_by' => Auth::user()->id,
                ]);
            }
        }
    }
}
