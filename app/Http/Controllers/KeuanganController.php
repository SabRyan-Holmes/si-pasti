<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Document;
use App\Models\Pengajuan;
use Illuminate\Http\Request;


class KeuanganController extends Controller
{
    public function daftar_berkas()
    {
        return Inertia::render('Keuangan/CekBerkas', [
            'title' => 'Cek Berkas',
            'pengajuan' => Pengajuan::all()
        ]);
    }

    public function show_berkas(Pengajuan $pengajuan)
    {
        $berkas_pbj = Document::where('pengajuan_id', $pengajuan->id)
            ->where('kategori', 'Pengajuan PBJ')->get();

        $pengajuan_kontrak = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Pengajuan Kontrak')->get();

        $berita_acara = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Pengajuan Berita Acara')->get();

        $kuitansi = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Pengajuan Kuitansi')->get();

        // dd($berkas_pbj);
        return Inertia::render('Keuangan/CekBerkas', [
            'title' => 'Detail Berkas',
            'pengajuan' => $pengajuan,
            'ketuaTim' => $pengajuan->created_by,
            'berkasPBJ' => $berkas_pbj,
            'pengajuanKontrak' => $pengajuan_kontrak,
            'beritaAcara' => $berita_acara,
            'kuitansi' => $kuitansi,
        ]);
    }


    public function unggah_berkas(Pengajuan $pengajuan)
    {
        // dd($pengajuan);
        return Inertia::render('Keuangan/UnggahBerkas', [
            'title' => 'Unggah Berkas',
            'pengajuan' => $pengajuan,
            'kegiatan' => $pengajuan->kegiatan,
            'ketuaTim' => $pengajuan->kegiatan->user,
        ]);
    }



    public function riwayat_pengajuan()
    {
        return Inertia::render('Keuangan/RiwayatPengajuan', [
            'title' => 'Riwayat Pengajuan',
            'pengajuan' => Pengajuan::latest()->paginate(10)
        ]);
    }

    public function show_pengajuan(Pengajuan $pengajuan)
    {
        $berkas_pbj = Document::whereHas('kegiatan', function ($q) use ($pengajuan) {
            $q->where('kegiatans.id', $pengajuan->kegiatan->id);
        })->where('submitted_by', 3)->get();

        // dd($berkas_pbj);
        return Inertia::render('Keuangan/DetailPengajuan', [
            'title' => 'Detail Riwayat Pengajuan',
            'pengajuan' => $pengajuan,
            'kegiatan' => $pengajuan->kegiatan,
            'ketuaTim' => $pengajuan->kegiatan->user,
            'berkasPBJ' => $berkas_pbj,


        ]);
    }
}
