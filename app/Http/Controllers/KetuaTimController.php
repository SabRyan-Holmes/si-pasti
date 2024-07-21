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

        // Logic Store KAK
        if ($request->file('kak')) {

            // if ($request->oldImage) {
            //     Storage::delete($request->oldImage);
            // }

            // KAK
            $KAKFileName = 'KAK-' . $request->nama_kegiatan . '.' . $request->file('kak')->getClientOriginalExtension();
            $path = 'public/kak-file/';
            Storage::disk('local')->putFileAs($path, $request->file('kak'), $KAKFileName);
            $validated['kak'] = 'kak-file/' . $KAKFileName;


            Document::create([
                'nama' => 'KAK - ' . $validated['nama_kegiatan'],
                'tipe_file' => $request->file('kak')->getClientOriginalExtension(),
                'path' => $validated['kak'],
                'jenis_dokumen' => 'kerangka ajuan kerja',


                // Relas dgn Kegiatan & User
                'kegiatan_id' => $new_kegiatan->id,
                'submitted_by' => Auth::user()->id,
                // 'is_approved' => false
            ]);
        }

        // Logic Store Form Permintaan
        if ($request->file('form_permintaan')) {

            // FP /Form Permintaan
            $FPFileName = 'FP-' .$request->nama_kegiatan . '.' . $request->file('form_permintaan')->getClientOriginalExtension();
            $path = 'public/fp-file/';
            Storage::disk('local')->putFileAs($path, $request->file('form_permintaan'), $FPFileName);
            $validated['form_permintaan'] = 'fp-file/' . $FPFileName;


            Document::create([
                'nama' => 'FP - ' .$validated['nama_kegiatan'],
                'tipe_file' => $request->file('form_permintaan')->getClientOriginalExtension(),
                'path' => $validated['form_permintaan'],
                'jenis_dokumen' => 'form permintaan',

                // Relas dgn Kegiatan
                'kegiatan_id' => $new_kegiatan->id,
                'submitted_by' => Auth::user()->id,
                // 'is_approved' => false
            ]);
        }

        // Logic Store Surat Permintaan
        if ($request->file('surat_permintaan')) {

            $SPFileName = 'SP-' .$request->nama_kegiatan . '.' . $request->file('surat_permintaan')->getClientOriginalExtension();
            $path = 'public/sp-file/';
            Storage::disk('local')->putFileAs($path, $request->file('surat_permintaan'), $SPFileName);
            $validated['surat_permintaan'] = 'sp-file/' . $SPFileName;


            Document::create([
                'nama' => 'SP - ' . $validated['nama_kegiatan'],
                'tipe_file' => $request->file('surat_permintaan')->getClientOriginalExtension(),
                'path' => $validated['surat_permintaan'],
                'jenis_dokumen' => 'surat permintaan',
                // Relas dgn Kegiatan
                'kegiatan_id' => $new_kegiatan->id,
                'submitted_by' => Auth::user()->id,
                // 'is_approved' => false
            ]);
        }

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

    public function open_document(Request $request){
        dd($request);
        return response()->file($request->path);
    }
}
