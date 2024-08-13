<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Pengajuan;
use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\PPK\UnggahBerkasStoreRequest;
use App\Http\Requests\PPK\UnggahBerkasUlangRequest;
use Illuminate\Support\Facades\Auth;


class PPKController extends Controller
{
    // PPK
    /**
     * Display the specified resource.
     */

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

        return Inertia::render('PPK/DaftarBerkas', [
            // "title" => "Pengajuan " . $title,
            "title" => "Daftar Berkas",
            "subTitle" => $subTitle,
            // "pengajuans" => $pengajuans->paginate(10),
            "pengajuans" => $pengajuans->filter(request(['search', 'byStatus', 'byStage']))->paginate(10),
            "search" => request('search'),
            "byStatusReq" => request('byStatus'),
            "byStageReq" => request('byStage'),
        ]);
    }


    public function show_berkas(Pengajuan $pengajuan)
    {
        // $berkas_pbj = Document::whereHas('kegiatan', function ($q) use ($pengajuan) {
        //     $q->where('kegiatans.id', $pengajuan->id);
        // })->where('submitted_by', 3)->get();

        $berkas_pbj = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Pengajuan PBJ')->get();
        $berkas_ketua_tim = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Pengajuan Permintaan Pengadaan Barang')->get();


        return Inertia::render('PPK/ShowBerkas', [
            'title' => 'Status Pengadaan Barang',
            'pengajuan' => $pengajuan,
            'berkasPBJ' => $berkas_pbj,
            'berkasKT' => $berkas_ketua_tim

        ]);
    }

    public function unggah_berkas(Pengajuan $pengajuan)
    {

        // dd($pengajuan);
        return Inertia::render('PPK/UnggahBerkas', [
            'title' => 'Pengajuan berkas ke divisi PBJ',
            'pengajuan' => $pengajuan,
        ]);
    }

    public function ajukan_berkas(UnggahBerkasStoreRequest $request)
    {
        // dd($request);
        $request->validated();
        //Pengajuan Ketua Tim /Pengadaan Barang
        $this->storeDocument($request, 'kak', 'KAK', 'Kerangka Ajuan Kerja', 'Pengajuan Permintaan Pengadaan Barang');
        $this->storeDocument($request, 'form_permintaan', 'FP', 'Form Permintaan', 'Pengajuan Permintaan Pengadaan Barang');
        $this->storeDocument($request, 'surat_permintaan', 'SP', 'Surat Permintaan', 'Pengajuan Permintaan Pengadaan Barang');

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




        // return redirect()->back()->with('message', 'Pengajuan berhasil diajukan');
        return redirect()->back()->with('message', 'Berkas berhasil diunggah!');
    }

    public function ajukan_berkas_ulang(UnggahBerkasUlangRequest $request)
    {
        // dd($request);
        $request->validated();
        //Pengajuan Ketua Tim /Pengadaan Barang
        $this->storeDocument($request, 'kak', 'KAK', 'Kerangka Ajuan Kerja', 'Pengajuan Permintaan Pengadaan Barang');
        $this->storeDocument($request, 'form_permintaan', 'FP', 'Form Permintaan', 'Pengajuan Permintaan Pengadaan Barang');
        $this->storeDocument($request, 'surat_permintaan', 'SP', 'Surat Permintaan', 'Pengajuan Permintaan Pengadaan Barang');

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

        return Inertia::render('PPK/RiwayatPengajuan', [
            // "title" => "Pengajuan " . $title,
            "title" => "Riwayat Pengajuan",
            "subTitle" => $subTitle,
            // "pengajuans" => $pengajuans->paginate(10),
            "pengajuans" => $pengajuans->filter(request(['search', 'byStatus', 'byStage']))->paginate(10),
            "search" => request('search'),
            "byStatusReq" => request('byStatus'),
            "byStageReq" => request('byStage'),
        ]);
    }

    public function show_pengajuan(Pengajuan $pengajuan)
    {
        $berkas_pbj = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Pengajuan PBJ')->get();

        $pengajuan_kontrak = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Pengajuan Kontrak')->get();

        $berita_acara = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Pengajuan Berita Acara')->get();

        $kuitansi = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Pengajuan Kuitansi')->get();

        // dd($berkas_pbj);
        return Inertia::render('PPK/ShowPengajuan', [
            'title' => 'Detail Riwayat Pengajuan',
            'pengajuan' => $pengajuan,
            'ketuaTim' => $pengajuan->created_by,
            'berkasPBJ' => $berkas_pbj,
            'pengajuanKontrak' => $pengajuan_kontrak,
            'beritaAcara' => $berita_acara,
            'kuitansi' => $kuitansi,
        ]);
    }

    public function validasi(Request $request)
    {
        Document::where('id', $request->id)->update([
            'is_valid' => $request->is_valid
        ]);

        redirect()->back();
    }
}
