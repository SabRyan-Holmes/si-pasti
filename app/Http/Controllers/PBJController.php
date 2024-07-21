<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Pengajuan;
use Illuminate\Http\Request;

class PBJController extends Controller
{
    public function daftar_berkas(){
        return Inertia::render('PBJ/DaftarBerkas', [
            'title' => 'Daftar Berkas',
            'pengajuan' => Pengajuan::all()
        ]);
    }

    public function cek_berkas(){
        return Inertia::render('PBJ/CekBerkas', [
            'title' => 'Cek Berkas',
            'pengajuan' => Pengajuan::all()
        ]);
    }


    public function unggah_berkas(){
        return Inertia::render('PBJ/UnggahBerkas', [
            'title' => 'Unggah Berkas',
            'pengajuan' => Pengajuan::all()
        ]);
    }

    public function pengadaan(){
        return Inertia::render('PBJ/Pengadaan', [
            'title' => 'Pengadaan',
            'pengajuan' => Pengajuan::all()
        ]);
    }

    public function riwayat_pengajuan(){
        return Inertia::render('PBJ/RiwayatPengajuan', [
            'title' => 'Riwayat Pengajuan',
            'pengajuan' => Pengajuan::all()
        ]);
    }


}
