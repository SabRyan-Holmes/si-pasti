<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Process;
use App\Models\Document;
use App\Models\Pengajuan;
use Illuminate\Http\Request;


class KeuanganController extends Controller
{
    public function cek_berkas()
    {
        return Inertia::render('Keuangan/CekBerkas', [
            'title' => 'Cek Berkas',
            'pengajuan' => Pengajuan::all()
        ]);
    }

    public function unggah_berkas(Process $pengajuan)
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
            'pengajuan' => Process::latest()->paginate(10)
        ]);
    }

    public function show_pengajuan(Process $pengajuan)
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
