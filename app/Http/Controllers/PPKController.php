<?php

namespace App\Http\Controllers;

use App\Models\Pengajuan;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PPKController extends Controller
{
     // PPK
        /**
     * Display the specified resource.
     */

     public function show_kt(Pengajuan $pengajuan)
     {
         return Inertia::render('PPK/CekBerkasKT', [
             'title' => 'Cek Berkas Ketua Tim',
             'pengajuan' => Pengajuan::all()
         ]);
     }

     /**
      * Display the specified resource.
      */
     public function show_pbj(Pengajuan $pengajuan)
     {
         return Inertia::render('PPK/CekBerkasPBJ', [
             'title' => 'Cek Berkas PBJ',
             'pengajuan' => Pengajuan::all()
         ]);
     }

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
