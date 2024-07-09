<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Pengajuan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\PengajuanStoreRequest;
use App\Models\Document;
use App\Models\Kegiatan;
use App\Models\Process;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;

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
        $validated = $request->validated();


        // Store Kegiatan
        $new_kegiatan = Kegiatan::create([
            'nama_kegiatan' => $validated['nama_kegiatan'],
            'status' => 'diproses',
            'created_by' => Auth::user()->id, // Relasi dgn Tabel User(divisi)
            'current_stage' => 'diproses PPK',
        ]);

        // Logic Store KAK
        if ($request->file('kak')) {
            // if ($request->oldImage) {
            //     Storage::delete($request->oldImage);
            // }

            // KAK
            $KAKFileName = $request->nama_kegiatan . '.' . $request->file('kak')->getClientOriginalExtension();
            $path = 'public/kak-file/';
            Storage::disk('local')->putFileAs($path, $request->file('kak'), $KAKFileName);
            $validated['kak'] = 'kak-file/' . $KAKFileName;


            Document::create([
                'nama' => $validated['nama_kegiatan'],
                'tipe' => $request->file('kak')->getClientOriginalExtension(),
                'path' => $validated['kak'],

                // Relas dgn Kegiatan
                'kegiatan_id' => $new_kegiatan->id,
                'submitted_by' => Auth::user()->id,
                'is_approved' => false
            ]);
        }

        // Logic Store Form Permintaan
        if ($request->file('form_permintaan')) {

            // FP /Form Permintaan
            $FPFileName = $request->nama_kegiatan . '.' . $request->file('form_permintaan')->getClientOriginalExtension();
            $path = 'public/fp-file/';
            Storage::disk('local')->putFileAs($path, $request->file('form_permintaan'), $FPFileName);
            $validated['form_permintaan'] = 'fp-file/' . $FPFileName;


            Document::create([
                'nama' => $validated['nama_kegiatan'],
                'tipe' => $request->file('form_permintaan')->getClientOriginalExtension(),
                'path' => $validated['form_permintaan'],

                // Relas dgn Kegiatan
                'kegiatan_id' => $new_kegiatan->id,
                'submitted_by' => Auth::user()->id,
                'is_approved' => false
            ]);
        }

        // Logic Store Surat Permintaan
        if ($request->file('surat_permintaan')) {

            $SPFileName = $request->nama_kegiatan . '.' . $request->file('surat_permintaan')->getClientOriginalExtension();
            $path = 'public/sp-file/';
            Storage::disk('local')->putFileAs($path, $request->file('surat_permintaan'), $SPFileName);
            $validated['surat_permintaan'] = 'sp-file/' . $SPFileName;


            Document::create([
                'nama' => $validated['nama_kegiatan'],
                'tipe' => $request->file('surat_permintaan')->getClientOriginalExtension(),
                'path' => $validated['surat_permintaan'],

                // Relas dgn Kegiatan
                'kegiatan_id' => $new_kegiatan->id,
                'submitted_by' => Auth::user()->id,
                'is_approved' => false
            ]);
        }

        // Store Process
        Process::create([
            'kegiatan_id' => $new_kegiatan->id,
            'stage' => 'diproses ppk',
            'start_date' => now(),
            'end_date' => null,

        ]);

        return Inertia::render('KetuaTim/StatusPengadaan', [
            'title' => 'Status Pengadaan Barang',
            'pengajuan' => $new_kegiatan,

        ]);
    }

    public function riwayat_pengajuan()
    {
        return Inertia::render('KetuaTim/RiwayatPengajuan', [
            'title' => 'Riwayat Pengajuan',
            'pengajuan' => Pengajuan::all()
        ]);
    }
}
