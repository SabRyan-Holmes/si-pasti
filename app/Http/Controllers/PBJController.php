<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Process;
use App\Models\Pengajuan;
use Illuminate\Http\Request;
use App\Models\Document;

class PBJController extends Controller
{
    public function daftar_berkas()
    {
        $pengajuans = Process::with(["kegiatan" => function ($q) {
            $q->where('kegiatans.created_by', "=", "1");
        }])->paginate(10);

        return Inertia::render('PBJ/DaftarBerkas', [
            'title' => 'Cek Berkas Ketua Tim',
            'pengajuans' => $pengajuans,
        ]);
    }

    public function show_berkas(Process $pengajuan)
    { {
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
            return Inertia::render('PBJ/CekBerkas', [
                'title' => 'Detail Berkas',
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



    public function unggah_berkas(Process $pengajuan)
    {


        // dd($pengajuan);
        return Inertia::render('PBJ/UnggahBerkas', [
            'title' => 'Pengajuan berkas ke divisi PPK',
            'pengajuan' => $pengajuan,
            'kegiatan' => $pengajuan->kegiatan,
            'ketuaTim' => $pengajuan->kegiatan->user,
        ]);
    }

    public function pengadaan()
    {
        return Inertia::render('PBJ/Pengadaan', [
            'title' => 'Pengadaan',
            'pengajuan' => Pengajuan::all()
        ]);
    }

    public function riwayat_pengajuan()
    {

        return Inertia::render('PBJ/RiwayatPengajuan', [
            'title' => 'Riwayat Pengajuan',
            'pengajuan' => Process::latest()->paginate(10)
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
        return Inertia::render('PBJ/DetailPengajuan', [
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

    public function validasi(Request $request)
    {
        Document::where('id', $request->id)->update([
            'is_valid' => $request->is_valid
        ]);

        redirect()->back();
    }
}
