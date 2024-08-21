<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\Pengajuan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function dashboard() {
        $pengajuan = Pengajuan::where('status', 'diproses')->count();
        $rejected = Pengajuan::where('status', 'ditolak')->count();
        $accepted = Pengajuan::where('status', 'selesai')->count();
        return Inertia::render('Dashboard', [
            'title' => 'Dashboard',
            'userCount' => User::all()->count(),
            'divisiCount' => User::select('divisi')->distinct()->count('divisi'),
            'ketuaTimCount' => User::where('divisi', 'Ketua Tim')->count(),
            'kegiatanCount' => Pengajuan::all()->count(),
            'documentCount' => Document::all()->count(),
            'rejectedCount' => $rejected,
            'acceptedCount' => $accepted,
            'processCount' => $pengajuan,

        ]);
    }

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

        return Inertia::render('DaftarBerkas', [
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

    public function riwayat_pengajuan()
    {

        $pengajuans = Pengajuan::latest();
        $subTitle = "";


        // Kalau Ketua Tim hanya bisa lihat Pengajuan dari dirinya
        if(Auth::user()->divisi == "Ketua Tim") {
            $pengajuans = Pengajuan::where('created_by', Auth::user()->id)->latest();
        }


        if (request('byStatus')) {
            $subTitle = 'Berdasarkan Status : ' . request('byStatus');
        }

        if (request('byStage')) {
            $subTitle = 'Berdasarkan Stage : ' . request('byStage');
        }

        return Inertia::render('RiwayatPengajuan', [
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
}
