<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Process;
use App\Models\Document;
use App\Models\Kegiatan;
use App\Models\Pengajuan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\PengajuanStoreRequest;

class KetuaTimController extends Controller
{
    public function pengajuan()
    {
        return Inertia::render('KetuaTim/Pengajuan', [
            'title' => 'Pengajuan Permintaan Pengadaan Barang',
        ]);
    }

    public function ajukan_pengajuan(PengajuanStoreRequest $request)
    {
        // dd($request);
        $validated = $request->validated();


        // Store Kegiatan
        $new_kegiatan = Kegiatan::create([
            'nama_kegiatan' => $validated['nama_kegiatan'],
            'status' => 'diproses',
            'created_by' => Auth::user()->id, // Relasi dgn Tabel User(divisi)
        ]);


        // Logic Store Document
        $this->storeDocument($request, 'kak', 'KAK', 'Kerangka Ajuan Kerja', 'Pengajuan Permintaan Pengadaan Barang', $new_kegiatan->id);
        $this->storeDocument($request, 'form_permintaan', 'FP', 'Form Permintaan', 'Pengajuan Permintaan Pengadaan Barang', $new_kegiatan->id);
        $this->storeDocument($request, 'surat_permintaan', 'SP', 'Surat Permintaan', 'Pengajuan Permintaan Pengadaan Barang', $new_kegiatan->id);


        // Store Process/Pengajuan
        Process::create([
            'kegiatan_id' => $new_kegiatan->id,
            'status' => 'diproses',
            'stage' => 'diajukan ketua tim',
            'start_date' => now(),
            'end_date' => null,

        ]);

        // return redirect()->back()->with('message', 'Pengajuan berhasil diajukan');
        return Redirect::route('ketua_tim.pengajuan')->with('message', 'Pengajuan berhasil diajukan!');
    }

    private function storeDocument($request, $fileKey, $prefix, $jenisDokumen, $kategori, $kegiatanId)
    {
        if ($request->file($fileKey)) {
            // Membuat nama file
            $fileName = $prefix . '-' . $request->nama_kegiatan . '.' . $request->file($fileKey)->getClientOriginalExtension();
            $path = 'public/' . strtolower($prefix) . '-file/';

            // Menyimpan file
            Storage::disk('local')->putFileAs($path, $request->file($fileKey), $fileName);

            // Path yang akan disimpan di database
            $filePath = strtolower($prefix) . '-file/' . $fileName;


            // Mencari dokumen yang sudah ada berdasarkan kegiatan_id, nama, dan kategori
            $existingDocument = Document::where('kegiatan_id', $kegiatanId)
                ->where('nama', $prefix . ' - ' . $request->nama_kegiatan)
                ->where('kategori', $kategori)
                ->where('submitted_by', Auth()->user()->id)
                ->first();

            if ($existingDocument) {
                // Menghapus file sebelumnya
                Storage::delete('/storage/'. $existingDocument->path);

                // Mengupdate dokumen yang sudah ada
                $existingDocument->update([
                    'tipe_file' => $request->file($fileKey)->getClientOriginalExtension(),
                    'path' => $filePath,
                    'jenis_dokumen' => $jenisDokumen,
                    'submitted_by' => Auth()->user()->id,
                ]);
            } else {
                // Membuat entri dokumen
                Document::create([
                    'nama' => $prefix . ' - ' . $request->nama_kegiatan,
                    'kategori' => $kategori,
                    'tipe_file' => $request->file($fileKey)->getClientOriginalExtension(),
                    'path' => $filePath,
                    'jenis_dokumen' => $jenisDokumen,
                    'kegiatan_id' => $kegiatanId,
                    'submitted_by' => Auth()->user()->id,
                ]);
            }
        }
    }

    public function show_pengajuan(Process $pengajuan)
    {

        return Inertia::render('KetuaTim/DetailPengajuan', [
            'title' => 'Status Pengadaan Barang',
            'pengajuan' => $pengajuan,
            'kegiatan' => $pengajuan->kegiatan,

        ]);
    }

    public function riwayat_pengajuan()
    {
        return Inertia::render('KetuaTim/RiwayatPengajuan', [
            'title' => 'Riwayat Pengajuan',
            'pengajuan' => Process::latest()->get()
        ]);
    }

    public function open_document(Request $request)
    {
        dd($request);
        return response()->file($request->path);
    }
}
