<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Process;
use App\Models\Document;
use App\Models\Pengajuan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\PPK\UnggahBerkasStoreRequest;
use Illuminate\Support\Facades\Auth;

class PPKController extends Controller
{
    // PPK
    /**
     * Display the specified resource.
     */

    public function daftar_berkas()
    {
        $pengajuans = Process::with(["kegiatan" => function ($q) {
            $q->where('kegiatans.created_by', "=", "1");
        }])->get();
        return Inertia::render('PPK/DaftarBerkas', [
            'title' => 'Cek Berkas Ketua Tim',
            'pengajuans' => $pengajuans,
        ]);
    }


    public function show_berkas(Process $pengajuan)
    {
        $berkas_pbj = Document::whereHas('kegiatan', function ($q) use ($pengajuan) {
            $q->where('kegiatans.id', $pengajuan->kegiatan->id);
        })->where('submitted_by', 3)->get();

        return Inertia::render('PPK/Detail/CekBerkas', [
            'title' => 'Status Pengadaan Barang',
            'pengajuan' => $pengajuan,
            'kegiatan' => $pengajuan->kegiatan,
            'ketuaTim' => $pengajuan->kegiatan->user,
            'berkas_pbj' => $berkas_pbj

        ]);
    }

    public function unggah_berkas(Process $pengajuan)
    {

        // dd($pengajuan);
        return Inertia::render('PPK/UnggahBerkas', [
            'title' => 'Pengajuan berkas ke divisi PBJ',
            'kegiatan' => $pengajuan->kegiatan,
            'ketuaTim' => $pengajuan->kegiatan->user,
        ]);
    }

    public function ajukan_berkas(UnggahBerkasStoreRequest $request)
    {
        // dd($request);
        $validated = $request->validated();

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

            // Mencari dokumen yang sudah ada berdasarkan kegiatan_id, nama, dan kategori
            $existingDocument = Document::where('kegiatan_id', $request->kegiatan_id)
                ->where('nama', $prefix . ' - ' . $request->nama_kegiatan)
                ->where('kategori', $kategori)
                ->where('submitted_by', Auth()->user()->id)
                ->first();

            if ($existingDocument) {
                // Menghapus file sebelumnya
                Storage::delete('/storage/'. $existingDocument->path);

                // Mengupdate dokumen yang sudah ada
                $existingDocument->update([
                    'tipe_file' => $request->file($fileKey)->getClientOriginalExtension(),
                    'path' => $filePath,
                    'jenis_dokumen' => $jenisDokumen,
                    'submitted_by' => Auth()->user()->id,
                ]);
            } else {
                // Membuat dokumen baru
                Document::create([
                    'nama' => $prefix . ' - ' . $request->nama_kegiatan,
                    'kategori' => $kategori,
                    'tipe_file' => $request->file($fileKey)->getClientOriginalExtension(),
                    'path' => $filePath,
                    'jenis_dokumen' => $jenisDokumen,
                    'kegiatan_id' => $request->kegiatan_id,
                    'submitted_by' => Auth()->user()->id,
                ]);
            }
        }
    }


    public function berkas_kt()
    {
        $pengajuans = Process::with(["kegiatan" => function ($q) {
            $q->where('kegiatans.created_by', "=", "1");
        }])->get();
        return Inertia::render('PPK/CekBerkasKT', [
            'title' => 'Cek Berkas Ketua Tim',
            'pengajuans' => $pengajuans,
        ]);
    }


    /**
     * Display the specified resource.
     */
    // public function show_pbj()
    // {
    //     $pengajuans = Process::with(["kegiatan" => function ($q) {
    //         $q->where('kegiatans.created_by', "=", "3");
    //     }])->get();
    //     return Inertia::render('PPK/CekBerkasPBJ', [
    //         'title' => 'Cek Berkas PBJ',
    //         'pengajuan' => $pengajuans
    //     ]);
    // }

    public function pengajuan_pbj(Pengajuan $pengajuan)
    {
        return Inertia::render('PPK/PengajuanPBJ', [
            'title' => 'Unggah Berkas Pengajuan PBJ',
            'pengajuan' => Pengajuan::all()
        ]);
    }

    public function kontrak(Pengajuan $pengajuan)
    {
        return Inertia::render('PPK/PengajuanPBJ', [
            'title' => 'Unggah Berkas Pengajuan PBJ',
            'pengajuan' => Pengajuan::all()
        ]);
    }

    public function unggah_pemesanan(Pengajuan $pengajuan)
    {
        return Inertia::render('PPK/Pemesanan', [
            'title' => 'Unggah Berkas Pengajuan PBJ',
            'pengajuan' => Pengajuan::all()
        ]);
    }
    public function unggah_pbj(Pengajuan $pengajuan)
    {
        return Inertia::render('PPK/Kuitansi', [
            'title' => 'Unggah Berkas Pengajuan PBJ',
            'pengajuan' => Pengajuan::all()
        ]);
    }


    public function riwayat_pengajuan()
    {
        return Inertia::render('PPK/RiwayatPengajuan', [
            'title' => 'Riwayat Pengajuan',
            'pengajuan' => Process::latest()->get()
        ]);
    }

    public function show_pengajuan(Process $pengajuan)
    {
        $berkas_pbj = Document::whereHas('kegiatan', function ($q) use ($pengajuan) {
            $q->where('kegiatans.id', $pengajuan->kegiatan->id);
        })->where('kategori', 'Pengajuan PBJ')->get();

        $pengajuan_kontrak = Document::whereHas('kegiatan', function ($q) use ($pengajuan) {
            $q->where('kegiatans.id', $pengajuan->kegiatan->id);
        })->where('kategori', 'Pengajuan Kontrak')->get();

        $berita_acara = Document::whereHas('kegiatan', function ($q) use ($pengajuan) {
            $q->where('kegiatans.id', $pengajuan->kegiatan->id);
        })->where('kategori', 'Pengajuan Berita Acara')->get();

        $kuitansi = Document::whereHas('kegiatan', function ($q) use ($pengajuan) {
            $q->where('kegiatans.id', $pengajuan->kegiatan->id);
        })->where('kategori', 'Pengajuan Kuitansi')->get();

        // dd($berkas_pbj);
        return Inertia::render('PPK/DetailPengajuan', [
            'title' => 'Detail Riwayat Pengajuan',
            'pengajuan' => $pengajuan,
            'kegiatan' => $pengajuan->kegiatan,
            'ketuaTim' => $pengajuan->kegiatan->user,
            'berkasPBJ' => $berkas_pbj,
            'pengajuanKontrak' => $pengajuan_kontrak,
            'beritaAcara' => $berita_acara,
            'kuitansi' => $kuitansi,
        ]);
    }
}
