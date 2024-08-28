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
        $processed = Pengajuan::where('status', 'diproses')->count();
        $rejected = Pengajuan::where('status', 'ditolak')->count();
        $done = Pengajuan::where('status', 'selesai')->count();
        $data = [
            'diproses' => $processed,
            'ditolak' => $rejected,
            'selesai' => $done,
        ];

        return Inertia::render('Dashboard', [
            'title' => 'Dashboard',
            'userCount' => User::all()->count(),
            'divisiCount' => User::select('divisi')->distinct()->count('divisi'),
            'ketuaTimCount' => User::where('divisi', 'Ketua Tim')->count(),
            'pengajuanCount' => Pengajuan::all()->count(),
            'documentCount' => Document::all()->count(),
            'rejectedCount' => $rejected,
            'doneCount' => $done,
            'processCount' => $processed,
            'data'=> $data

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


    public function show_all_berkas(Pengajuan $pengajuan)
    {
        $berkas_kt = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Pengajuan Permintaan Pengadaan')->get();
        $berkas_ppk = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Pengajuan Berkas ke divisi PPK')->get();

        $berkas_pbj = Document::where('pengajuan_id', $pengajuan->id)
            ->where('kategori', 'Pengajuan PBJ')->get();

        $pengajuan_kontrak = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Pengajuan Kontrak')->get();
        $berita_acara = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Pengajuan Berita Acara')->get();

        $kuitansi = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Pengajuan Kuitansi')->get();
        $pembayaran = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Berkas Pembayaran')->get();

        return Inertia::render('ShowAllBerkas', [
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
