<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\Pengajuan;
use App\Models\Process;
use Inertia\Inertia;
use Illuminate\Http\Request;

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


        return Inertia::render('PPK/UnggahBerkas', [
            'title' => 'Status Pengadaan Barang',
            'pengajuan' => $pengajuan,
            'kegiatan' => $pengajuan->kegiatan,
            'ketuaTim' => $pengajuan->kegiatan->user,

        ]);
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
            'pengajuan' => Pengajuan::all()
        ]);
    }
}
