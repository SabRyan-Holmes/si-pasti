<?php

namespace App\Http\Controllers;

use App\Models\Pengajuan;
use Illuminate\Http\Request;
use Inertia\Inertia;


class KeuanganController extends Controller
{
    public function cek_berkas(){
        return Inertia::render('Keuangan/CekBerkas', [
            'title' => 'Cek Berkas',
            'pengajuan' => Pengajuan::all()
        ]);
    }

    public function unggah_berkas(){
        return Inertia::render('Keuangan/UnggahBerkas', [
            'title' => 'Unggah Berkas',
            'pengajuan' => Pengajuan::all()
        ]);
    }



    public function riwayat_pengajuan(){
        return Inertia::render('Keuangan/RiwayatPengajuan', [
            'title' => 'Riwayat Pengajuan',
            'pengajuan' => Pengajuan::all()
        ]);
    }
}
