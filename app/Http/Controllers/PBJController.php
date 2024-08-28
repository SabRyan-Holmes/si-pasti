<?php

namespace App\Http\Controllers;

use App\Http\Requests\PengajuanPPKStoreRequest;
use App\Http\Requests\PPK\UnggahBerkasStoreRequest;
use App\Http\Requests\PPK\UnggahBerkasUlangRequest;
use Inertia\Inertia;
use App\Models\Pengajuan;
use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;


class PBJController extends Controller
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

        return Inertia::render('PBJ/DaftarBerkas', [
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
        $berkas_kt = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Pengajuan Permintaan Pengadaan')->get();
        $berkas_ppk = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Pengajuan Berkas ke divisi PPK')->get();

        $berkas_pbj = Document::where('pengajuan_id', $pengajuan->id)
            ->where('kategori', 'Pengajuan PBJ')->get();

        $pengajuan_kontrak = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Pengajuan Kontrak')->get();

        $berita_acara = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Pengajuan Berita Acara')->get();

        $kuitansi = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Pengajuan Kuitansi')->get();
        $pembayaran = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Berkas Pembayaran')->get();
        $stagesDoneOrder = ['pesanan selesai', 'pembayaran', 'selesai'];
        $isDoneOrder = in_array($pengajuan->stage, $stagesDoneOrder);



        // Menggabungkan semua koleksi ke dalam satu array
        $all_documents = $berkas_pbj
            ->merge($pengajuan_kontrak)
            ->merge($berita_acara)
            ->merge($kuitansi)
            ->merge($pembayaran);


        // dd($berkas_pbj);
        return Inertia::render('PBJ/ShowBerkas', [
            'title' => 'Detail Berkas',
            'pengajuan' => $pengajuan,
            'ketuaTim' => $pengajuan->created_by,
            'berkasKT' => $berkas_kt,
            'berkasPPK' => $berkas_ppk,
            'berkasPBJ' => $berkas_pbj,
            'berkasPK' => $pengajuan_kontrak,
            'berkasBA' => $berita_acara,
            'berkasPembayaran' => $pembayaran,
            'berkasKuitansi' => $kuitansi,
            'isDoneOrder' => $isDoneOrder

        ]);
    }


    public function unggah_berkas(Pengajuan $pengajuan)
    {
        $berkas_ke_ppk = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Pengajuan Berkas ke divisi PPK')->get();

        return Inertia::render('PBJ/UnggahBerkas', [
            'title' => 'Pengajuan berkas ke divisi PPK',
            'pengajuan' => $pengajuan,
            'berkasPPK' => $berkas_ke_ppk,
        ]);
    }

    public function ajukan_berkas(PengajuanPPKStoreRequest $request)
    {
        $request->validated();
        $this->storeDocument($request, 'ban', 'BAN', 'Berita Acara Negoisasi', 'Pengajuan Berkas ke divisi PPK');
        $this->storeDocument($request, 'bahp', 'BAHP', 'Berita Acara Hasil Pemilihan(BAHP)', 'Pengajuan Berkas ke divisi PPK');
        return redirect()->back()->with('message', 'Berkas Berhasil Diajukan');
    }

    public function ajukan_berkas_ulang(UnggahBerkasUlangRequest $request)
    {
        // dd($request);
        $request->validated();
        //Pengajuan Ketua Tim /Pengadaan Barang
        $this->storeDocument($request, 'kak', 'KAK', 'Kerangka Ajuan Kerja', 'Pengajuan Permintaan Pengadaan');
        $this->storeDocument($request, 'form_permintaan', 'FP', 'Form Permintaan', 'Pengajuan Permintaan Pengadaan');
        $this->storeDocument($request, 'surat_permintaan', 'SP', 'Surat Permintaan', 'Pengajuan Permintaan Pengadaan');

        // Pengajuan PBJ
        $this->storeDocument($request, 'rancangan_kontrak', 'RC', 'Rancangan Kontrak', 'Pengajuan PBJ');
        $this->storeDocument($request, 'spekteknis', 'SPEKTEKNIS', 'Spekteknis', 'Pengajuan PBJ');
        $this->storeDocument($request, 'rab', 'RAB', 'RAB/HPS', 'Pengajuan PBJ');
        $this->storeDocument($request, 'sppp', 'SPPP', 'Surat Penunjukan Penjabat Pengadaan(SPPP)', 'Pengajuan PBJ');

        //Pengajuan Kontrak
        $this->storeDocument($request, 'sppbj', 'SPPBJ', 'Surat Penetapan Pemenang Barang dan Jasa(SPPBJ)', 'Pengajuan Kontrak');
        $this->storeDocument($request, 'surat_kontrak', 'SK', 'Surat Kontrak/Surat Pesanan', 'Pengajuan Kontrak');

        //pengajuan Berita Acara
        $this->storeDocument($request, 'bast', 'BAST', 'Berita Acara Serah Terima(BAST)', 'Pengajuan Berita Acara');
        $this->storeDocument($request, 'bap', 'BAP', 'Berita Acara Pembayaran(BAP)', 'Pengajuan Berita Acara');

        //Pengajuan kuintansi
        $this->storeDocument($request, 'kuitansi', 'KUITANSI', 'Kuitansi', 'Pengajuan Kuitansi');
        $this->storeDocument($request, 'surat_pesanan', 'SP', 'Surat Pesanan', 'Pengajuan Kuitansi');

        // Berkas Pembayaran
        $this->storeDocument($request, 'spm', 'SPM', 'Surat Perintah Pembayaran(SPM)', 'Berkas Pembayaran');


        // return redirect()->back()->with('message', 'Pengajuan berhasil diajukan');
        return redirect()->back()->with('message', 'Berkas berhasil diunggah!');
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
                Storage::delete('/storage/' . $existingDocument->path);

                // Mengupdate dokumen yang sudah ada
                $existingDocument->update([
                    'tipe_file' => $request->file($fileKey)->getClientOriginalExtension(),
                    'path' => $filePath,
                    'is_valid' => null,
                    'jenis_dokumen' => $jenisDokumen,
                    'submitted_by' => Auth::user()->id,
                ]);
            } else {
                // Membuat entri dokumen
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

        return Inertia::render('PBJ/RiwayatPengajuan', [
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
        $berkas_ppk = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Pengajuan Berkas ke divisi PPK')->get();

        return Inertia::render('PBJ/ShowPengajuan', [
            'title' => 'Detail Riwayat Pengajuan',
            'pengajuan' => $pengajuan,
            'berkasPPK' => $berkas_ppk,

        ]);
    }

    public function validasi(Request $request)
    {
        Document::where('id', $request->id)->update([
            'is_valid' => $request->is_valid
        ]);

        $berkas = Document::find($request->id);
        if ($berkas->kategori == "Pengajuan Kontrak") {
            Pengajuan::where('id', $request->pengajuan_id)->update([
                'stage' => 'dipesan PBJ'
            ]);
        }

        // Status jadi ditolak sementara jika ada dokumen yg tidak valid
        if ($request->is_valid == false) {
            Pengajuan::where('id', $request->pengajuan_id)->update([
                'status' => 'ditolak'
            ]);
        }

        // Pengajuan Berubah jadi selesai jika kuitansi sudah di validasi
        if ($berkas->jenis_dokumen == "Kuitansi" && $request->is_valid == true) {
            Pengajuan::where('id', $request->pengajuan_id)->update([
                'stage' => 'selesai',
                'status' => 'selesai',
                'end_data' => now()
            ]);
        }

        redirect()->back();
    }

    public function order_done(Request $request)
    {
        Pengajuan::where('id', $request->pengajuan_id)->update([
            'stage' => 'pesanan selesai'
        ]);
        return redirect()->back()->with('message', 'Pemesanana berhasil ditandai selesai!');
    }
}
