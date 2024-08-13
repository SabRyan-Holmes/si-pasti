<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Pengajuan;
use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PBJController extends Controller
{
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

        return Inertia::render('PBJ/DaftarBerkas', [
            // "title" => "Pengajuan " . $title,
            "title" => "Daftar Berkas",
            "subTitle" => $subTitle,
            // "pengajuans" => $pengajuans->paginate(10),
            "pengajuans" => $pengajuans->filter(request(['search', 'byStatus', 'byStage']))->paginate(10),
            "search" => request('search'),
            "byStatusReq" => request('byStatus'),
            "byStageReq" => request('byStage'),
        ]);
    }

    public function show_berkas(Pengajuan $pengajuan)
    {
        $berkas_pbj = Document::where('pengajuan_id', $pengajuan->id)
            ->where('kategori', 'Pengajuan PBJ')->get();

        $pengajuan_kontrak = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Pengajuan Kontrak')->get();

        $berita_acara = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Pengajuan Berita Acara')->get();

        $kuitansi = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Pengajuan Kuitansi')->get();
        $pembayaran = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Pengajuan Kuitansi')->get();

        // dd($berkas_pbj);
        return Inertia::render('PBJ/ShowBerkas', [
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
        return Inertia::render('PBJ/UnggahBerkas', [
            'title' => 'Pengajuan berkas ke divisi PPK',
            'pengajuan' => $pengajuan,
        ]);
    }

    public function ajukan_berkas(Request $request)
    {

        $rule = [
            'pengajuan_id' => ['required', 'integer'],
            'nama_kegiatan' => ['required', 'string', 'max:100'],
            'ban' => ['nullable', 'file', 'mimes:pdf', 'max:15192'],
            'bahp' => ['nullable', 'file', 'mimes:pdf', 'max:15192'],
        ];

        $validated = $request->validate($rule);
        $this->storeDocument($request, 'ban', 'BAN', 'Berita Acara Negoisasi', 'Pengajuan Berkas ke divisi PPK', $validated['pengajuan_id']);
        $this->storeDocument($request, 'bahp', 'BAHP', 'Berita Acara Hasil Pemilihan', 'Pengajuan Berkas ke divisi PPK', $validated['pengajuan_id']);

        return redirect()->back()->with('message', 'Berkas Berhasil Diajukan');
    }

    private function storeDocument($request, $fileKey, $prefix, $jenisDokumen, $kategori, $pengajuanId)
    {
        if ($request->file($fileKey)) {
            // Membuat nama file
            $fileName = $prefix . '-' . $request->nama_kegiatan . '.' . $request->file($fileKey)->getClientOriginalExtension();
            $path = 'public/' . strtolower($prefix) . '-file/';

            // Menyimpan file
            Storage::disk('local')->putFileAs($path, $request->file($fileKey), $fileName);

            // Path yang akan disimpan di database
            $filePath = strtolower($prefix) . '-file/' . $fileName;


            // Mencari dokumen yang sudah ada berdasarkan pengajuan_id, nama, dan kategori
            $existingDocument = Document::where('pengajuan_id', $pengajuanId)
                ->where('nama', $prefix . ' - ' . $request->nama_kegiatan)
                ->where('kategori', $kategori)
                ->where('submitted_by', Auth::user()->id)
                ->first();

            if ($existingDocument) {
                // Menghapus file sebelumnya
                Storage::delete('/storage/' . $existingDocument->path);

                // Mengupdate dokumen yang sudah ada
                $existingDocument->update([
                    'tipe_file' => $request->file($fileKey)->getClientOriginalExtension(),
                    'path' => $filePath,
                    'jenis_dokumen' => $jenisDokumen,
                    'submitted_by' => Auth::user()->id,
                ]);
            } else {
                // Membuat entri dokumen
                Document::create([
                    'nama' => $prefix . ' - ' . $request->nama_kegiatan,
                    'kategori' => $kategori,
                    'tipe_file' => $request->file($fileKey)->getClientOriginalExtension(),
                    'path' => $filePath,
                    'jenis_dokumen' => $jenisDokumen,
                    'pengajuan_id' => $pengajuanId,
                    'submitted_by' => Auth::user()->id,
                ]);
            }
        }
    }

    public function riwayat_pengajuan()
    {

        $pengajuans = Pengajuan::latest();
        $subTitle = "";


        if (request('byStatus')) {
            $subTitle = 'Berdasarkan Status : ' . request('byStatus');
        }

        if (request('byStage')) {
            $subTitle = 'Berdasarkan Stage : ' . request('byStage');
        }

        return Inertia::render('PBJ/RiwayatPengajuan', [
            // "title" => "Pengajuan " . $title,
            "title" => "Riwayat Pengajuan",
            "subTitle" => $subTitle,
            // "pengajuans" => $pengajuans->paginate(10),
            "pengajuans" => $pengajuans->filter(request(['search', 'byStatus', 'byStage']))->paginate(10),
            "search" => request('search'),
            "byStatusReq" => request('byStatus'),
            "byStageReq" => request('byStage'),
        ]);
    }

    public function show_pengajuan(Pengajuan $pengajuan)
    {
        $berkas_pbj = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Pengajuan PBJ')->get();

        $pengajuan_kontrak = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Pengajuan Kontrak')->get();

        $berita_acara = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Pengajuan Berita Acara')->get();

        $kuitansi = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Pengajuan Kuitansi')->get();

        // dd($berkas_pbj);
        return Inertia::render('PBJ/ShowPengajuan', [
            'title' => 'Detail Riwayat Pengajuan',
            'pengajuan' => $pengajuan,
            'ketuaTim' => $pengajuan->created_by,
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
