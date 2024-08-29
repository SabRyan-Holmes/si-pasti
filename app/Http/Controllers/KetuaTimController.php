<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Document;
use App\Models\Pengajuan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\PengajuanStoreRequest;
use App\Http\Requests\PPK\UnggahBerkasUlangRequest;

class KetuaTimController extends Controller
{
    public function create_pengajuan()
    {
        return Inertia::render('KetuaTim/CreatePengajuan', [
            'title' => 'Buat Pengajuan',
        ]);
    }

    public function ajukan_pengajuan(PengajuanStoreRequest $request)
    {
        // dd($request);
        $validated = $request->validated();
        // Store Pengajuan/Pengajuan

        $new_pengajuan = Pengajuan::create([
            'nama_kegiatan' => $validated['nama_kegiatan'],
            'nama_tim' => $validated['nama_tim'],
            'created_by' => Auth::user()->id,
            'status' => 'diproses',
            'stage' => 'diajukan ketua tim',
            'start_date' => now(),
            'end_date' => null,
        ]);

        // Logic Store Document
        $this->storeDocument($request, 'kak', 'KAK', 'Kerangka Ajuan Kerja', 'Pengajuan Permintaan Pengadaan', $new_pengajuan->id);
        $this->storeDocument($request, 'form_permintaan', 'FP', 'Form Permintaan', 'Pengajuan Permintaan Pengadaan', $new_pengajuan->id);
        $this->storeDocument($request, 'surat_permintaan', 'SP', 'Surat Permintaan', 'Pengajuan Permintaan Pengadaan', $new_pengajuan->id);

        return redirect()->back()->with('message', 'Pengajuan berhasil diajukan!');
    }

    public function ajukan_berkas_ulang(UnggahBerkasUlangRequest $request)
    {
        // dd($request);

        $request->validated();
        //Pengajuan Ketua Tim /Pengadaan
        $this->storeDocument($request, 'kak', 'KAK', 'Kerangka Ajuan Kerja', 'Pengajuan Permintaan Pengadaan', $request->pengajuan_id);
        $this->storeDocument($request, 'form_permintaan', 'FP', 'Form Permintaan', 'Pengajuan Permintaan Pengadaan', $request->pengajuan_id);
        $this->storeDocument($request, 'surat_permintaan', 'SP', 'Surat Permintaan', 'Pengajuan Permintaan Pengadaan', $request->pengajuan_id);


        // Jika Diupload Ulang maka status dokumen kembali berubah dari tidak valid menjadi null/diproses


        return redirect()->back()->with('message', 'Berkas berhasil diunggah!');
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
                // NOTE: Default
                Storage::delete('/public/storage/' . $existingDocument->path);

                // Mengupdate dokumen yang sudah ada
                $existingDocument->update([
                    'tipe_file' => $request->file($fileKey)->getClientOriginalExtension(),
                    'path' => $filePath,
                    'is_valid' => null,
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

    public function show_pengajuan(Pengajuan $pengajuan)
    {
        $berkas_kt = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Pengajuan Permintaan Pengadaan')->get();
        return Inertia::render('KetuaTim/ShowPengajuan', [
            'title' => 'Detail Riwayat Pengajuan',
            'pengajuan' => $pengajuan,
            'berkasKT' => $berkas_kt,

        ]);
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


        return Inertia::render('KetuaTim/RiwayatPengajuan', [
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

    public function open_document(Request $request)
    {
        dd($request);
        return response()->file($request->path);
    }

    public function ajukan_ulang(Request $request)
    {
        // dd($request);
        $rule = [
            'kegiatan_id' => ['required', 'file', 'mimes:pdf', 'max:15192'],
            'kak' => ['nullable', 'file', 'mimes:pdf', 'max:15192'],
            'form_permintaan' => ['nullable', 'file', 'mimes:pdf', 'max:15192'],
            'surat_permintaan' => ['nullable', 'file',  'mimes:pdf', 'max:15192']
        ];
        $request->validate($rule);

        // Logic Store Document
        $this->storeDocument($request, 'kak', 'KAK', 'Kerangka Ajuan Kerja', 'Pengajuan Permintaan Pengadaan', $request->kegiatan_id);
        $this->storeDocument($request, 'form_permintaan', 'FP', 'Form Permintaan', 'Pengajuan Permintaan Pengadaan', $request->kegiatan_id);
        $this->storeDocument($request, 'surat_permintaan', 'SP', 'Surat Permintaan', 'Pengajuan Permintaan Pengadaan', $request->kegiatan_id);

        return redirect()->back()->with('message', 'Berkas berhasil Diupload!');
    }
}
