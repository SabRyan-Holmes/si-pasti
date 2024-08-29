<?php

namespace App\Http\Controllers;

use App\Http\Requests\PengajuanBAStoreRequest;
use App\Http\Requests\PengajuanKontrakStoreRequest;
use App\Http\Requests\PengajuanKuitansiStoreRequest;
use App\Http\Requests\PengajuanPBJStoreRequest;
use Inertia\Inertia;
use App\Models\Pengajuan;
use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\PPK\UnggahBerkasStoreRequest;
use App\Http\Requests\PPK\UnggahBerkasUlangRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class PPKController extends Controller
{
    // PPK
    /**
     * Display the specified resource.
     */

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

        return Inertia::render('PPK/DaftarBerkas', [
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


    public function show_berkas(Pengajuan $pengajuan)
    {
        $berkas_ketua_tim = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Pengajuan Permintaan Pengadaan')->get();
        $berkas_ppk = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Pengajuan Berkas ke divisi PPK')->get();
        $stagesDoneOrder = ['pesanan selesai', 'pembayaran', 'selesai'];
        $isDoneOrder = in_array($pengajuan->stage, $stagesDoneOrder);
        return Inertia::render('PPK/ShowBerkas', [
            'title' => 'Status Pengadaan Barang',
            'pengajuan' => $pengajuan,
            'berkasPPK' => $berkas_ppk,
            'berkasKT' => $berkas_ketua_tim,
            'isDoneOrder' => $isDoneOrder
        ]);
    }

    public function unggah_berkas(Pengajuan $pengajuan)
    {
        $berkasPBJ = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Pengajuan PBJ')->get();
        $berkasPK = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Pengajuan Kontrak')->get();
        $berkasBA = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Pengajuan Berita Acara')->get();
        $berkasKuitansi = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Pengajuan Kuitansi')->get();

        // Pengecekan apakah sudah divalidasi PBJ (is_valid yang tidak null || true)
        $isCheckedBerkasPBJ = $berkasPBJ->contains(function ($berkas) {
            // return $berkas->is_valid !== null && $berkas->is_valid == true;
            return $berkas->is_valid == true;
        });

        $isCheckedBerkasPK = $berkasPK->contains(function ($berkas) {
            return $berkas->is_valid == true;
        });

        $isCheckedBerkasBA = $berkasBA->contains(function ($berkas) {
            return $berkas->is_valid == true;
        });
        return Inertia::render('PPK/UnggahBerkas', [
            'title' => 'Pengajuan berkas ke divisi PBJ',
            'pengajuan' => $pengajuan,
            'berkasPBJ' => $berkasPBJ,
            'berkasPK' => $berkasPK,
            'berkasBA' => $berkasBA,
            'berkasKuitansi' => $berkasKuitansi,
            'isCheckedBerkasPBJ' => $isCheckedBerkasPBJ,
            'isCheckedBerkasPK' => $isCheckedBerkasPK,
            'isCheckedBerkasBA' => $isCheckedBerkasBA,
        ]);
    }

    public function ajukan_berkas_pbj(PengajuanPBJStoreRequest $request)
    {
        // dd($request);
        $request->validated();

        $this->storeDocument($request, 'rancangan_kontrak', 'RC', 'Rancangan Kontrak', 'Pengajuan PBJ');
        $this->storeDocument($request, 'spekteknis', 'SPEKTEKNIS', 'Spekteknis', 'Pengajuan PBJ');
        $this->storeDocument($request, 'rab', 'RAB', 'RAB/HPS', 'Pengajuan PBJ');
        $this->storeDocument($request, 'sppp', 'SPPP', 'Surat Penunjukan Penjabat Pengadaan(SPPP)', 'Pengajuan PBJ');
        return redirect()->back()->with('message', 'Berkas berhasil diunggah!');
    }
    public function ajukan_berkas_kontrak(PengajuanKontrakStoreRequest $request)
    {
        $request->validated();
        //Pengajuan Kontrak
        $this->storeDocument($request, 'sppbj', 'SPPBJ', 'Surat Penetapan Pemenang Barang dan Jasa(SPPBJ)', 'Pengajuan Kontrak');
        $this->storeDocument($request, 'surat_kontrak', 'SK', 'Surat Kontrak/Surat Pesanan', 'Pengajuan Kontrak');
        return redirect()->back()->with('message', 'Berkas berhasil diunggah!');
    }

    public function ajukan_berkas_ba(PengajuanBAStoreRequest $request)
    {
        $request->validated();
        $this->storeDocument($request, 'bast', 'BAST', 'Berita Acara Serah Terima(BAST)', 'Pengajuan Berita Acara');
        $this->storeDocument($request, 'bap', 'BAP', 'Berita Acara Pembayaran(BAP)', 'Pengajuan Berita Acara');
        return redirect()->back()->with('message', 'Berkas berhasil diunggah!');
    }

    public function ajukan_berkas_kuitansi(PengajuanKuitansiStoreRequest $request)
    {
        $request->validated();
        $this->storeDocument($request, 'kuitansi', 'KUITANSI', 'Kuitansi', 'Pengajuan Kuitansi');
        $this->storeDocument($request, 'surat_pesanan', 'SP', 'Surat Pesanan', 'Pengajuan Kuitansi');
        return redirect()->back()->with('message', 'Berkas berhasil diunggah!');
    }

    public function ajukan_berkas(Request $request)
    {
        Log::info('Request received', $request->all());
        dd($request);
        if ($request->kategori === "Pengajuan PBJ") {
            $pbjRequest->validated();
            $this->storeDocument($request, 'rancangan_kontrak', 'RC', 'Rancangan Kontrak', 'Pengajuan PBJ');
            $this->storeDocument($request, 'spekteknis', 'SPEKTEKNIS', 'Spekteknis', 'Pengajuan PBJ');
            $this->storeDocument($request, 'rab', 'RAB', 'RAB/HPS', 'Pengajuan PBJ');
            $this->storeDocument($request, 'sppp', 'SPPP', 'Surat Penunjukan Penjabat Pengadaan(SPPP)', 'Pengajuan PBJ');
        } else if ($request->kategori === "Pengajuan Kontrak") {
            dd($kontrakRequest);
            $kontrakRequest->validated();
            //Pengajuan Kontrak
            $this->storeDocument($request, 'sppbj', 'SPPBJ', 'Surat Penetapan Pemenang Barang dan Jasa(SPPBJ)', 'Pengajuan Kontrak');
            $this->storeDocument($request, 'surat_kontrak', 'SK', 'Surat Kontrak/Surat Pesanan', 'Pengajuan Kontrak');
        } else if ($request->kategori == "Pengajuan Berita Acara") {
            //Pengajuan Berita Acara
            $baRequest->validated();
            $this->storeDocument($request, 'bast', 'BAST', 'Berita Acara Serah Terima(BAST)', 'Pengajuan Berita Acara');
            $this->storeDocument($request, 'bap', 'BAP', 'Berita Acara Pembayaran(BAP)', 'Pengajuan Berita Acara');
        } else if ($request->kategori == "Pengajuan Kuitansi") {
            $kuitansiRequest->validated();
            //Pengajuan kuintansi
            $this->storeDocument($request, 'kuitansi', 'KUITANSI', 'Kuitansi', 'Pengajuan Kuitansi');
            $this->storeDocument($request, 'surat_pesanan', 'SP', 'Surat Pesanan', 'Pengajuan Kuitansi');
        }

        // $ids = array_unique($request->edited_id);
        // // Update beberapa row sekaligus
        // Document::whereIn('id', $ids)->update([
        //     'is_valid' => null
        // ]);


        // return redirect()->back()->with('message', 'Pengajuan berhasil diajukan');
        return redirect()->back()->with('message', 'Berkas berhasil diunggah!');
    }

    public function ajukan_berkas_ulang(UnggahBerkasUlangRequest $request)
    {
        // dd($request);
        $request->validated();
        //Pengajuan Ketua Tim /Pengadaan Barang
        $this->storeDocument($request, 'kak', 'KAK', 'Kerangka Ajuan Kerja', 'Pengajuan Permintaan Pengadaan');
        $this->storeDocument($request, 'form_permintaan', 'FP', 'Form Permintaan', 'Pengajuan Permintaan Pengadaan');
        $this->storeDocument($request, 'surat_permintaan', 'SP', 'Surat Permintaan', 'Pengajuan Permintaan Pengadaan');

        // Pengajuan PBJ
        $this->storeDocument($request, 'rancangan_kontrak', 'RC', 'Rancangan Kontrak', 'Pengajuan PBJ');
        $this->storeDocument($request, 'spekteknis', 'SPEKTEKNIS', 'Spekteknis', 'Pengajuan PBJ');
        $this->storeDocument($request, 'rab', 'RAB', 'RAB/HPS', 'Pengajuan PBJ');
        $this->storeDocument($request, 'sppp', 'SPPP', 'Surat Penunjukan Penjabat Pengadaan(SPPP)', 'Pengajuan PBJ');

        //Pengajuan Kontrak
        $this->storeDocument($request, 'sppbj', 'SPPBJ', 'Surat Penetapan Pemenang Barang dan Jasa(SPPBJ)', 'Pengajuan Kontrak');
        $this->storeDocument($request, 'surat_kontrak', 'SK', 'Surat Kontrak/Surat Pesanan', 'Pengajuan Kontrak');

        //pengajuan Berita Acara
        $this->storeDocument($request, 'bast', 'BAST', 'Berita Acara Serah Terima(BAST)', 'Pengajuan Berita Acara');
        $this->storeDocument($request, 'bap', 'BAP', 'Berita Acara Pembayaran(BAP)', 'Pengajuan Berita Acara');

        //Pengajuan kuintansi
        $this->storeDocument($request, 'kuitansi', 'KUITANSI', 'Kuitansi', 'Pengajuan Kuitansi');
        $this->storeDocument($request, 'surat_pesanan', 'SP', 'Surat Pesanan', 'Pengajuan Kuitansi');

        // Bikin jadi diproses lagi dr tidak valid

        // return redirect()->back()->with('message', 'Pengajuan berhasil diajukan');
        return redirect()->back()->with('message', 'Berkas berhasil diunggah!');
    }

    private function storeDocument($request, $fileKey, $prefix, $jenisDokumen, $kategori)
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
            $existingDocument = Document::where('pengajuan_id', $request->pengajuan_id)
                ->where('nama', $prefix . ' - ' . $request->nama_kegiatan)
                ->where('kategori', $kategori)
                ->where('submitted_by', Auth::user()->id)
                ->first();

            if ($existingDocument) {
                // Menghapus file sebelumnya
                Storage::delete('/public/storage/' . $existingDocument->path);

                // Mengupdate dokumen yang sudah ada dan membuat ny is_valid menjadi null
                $existingDocument->update([
                    'tipe_file' => $request->file($fileKey)->getClientOriginalExtension(),
                    'path' => $filePath,
                    'is_valid' => null,
                    'jenis_dokumen' => $jenisDokumen,
                    'submitted_by' => Auth::user()->id,
                ]);
            } else {
                // Membuat dokumen baru
                Document::create([
                    'nama' => $prefix . ' - ' . $request->nama_kegiatan,
                    'kategori' => $kategori,
                    'tipe_file' => $request->file($fileKey)->getClientOriginalExtension(),
                    'path' => $filePath,
                    'jenis_dokumen' => $jenisDokumen,
                    'pengajuan_id' => $request->pengajuan_id,
                    'submitted_by' => Auth::user()->id,
                ]);
            }

            if ($kategori == 'Pengajuan Berita Acara' || $kategori == 'Pengajuan Kuitansi') {
                // Check dan update stage ke pembayaran nantinya jika syarat terpenuhi
                Pengajuan::where('id', $request->pengajuan_id)->update([
                    'stage' => "pembayaran"
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

        return Inertia::render('PPK/RiwayatPengajuan', [
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

    public function show_pengajuan(Pengajuan $pengajuan)
    {
        $berkas_pbj = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Pengajuan PBJ')->get();

        $pengajuan_kontrak = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Pengajuan Kontrak')->get();

        $berita_acara = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Pengajuan Berita Acara')->get();

        $kuitansi = Document::where('pengajuan_id', $pengajuan->id)->where('kategori', 'Pengajuan Kuitansi')->get();

        // dd($berkas_pbj);
        return Inertia::render('PPK/ShowPengajuan', [
            'title' => 'Detail Pengajuan',
            'pengajuan' => $pengajuan,
            'ketuaTim' => $pengajuan->created_by,
            'berkasPBJ' => $berkas_pbj,
            'berkasPK' => $pengajuan_kontrak,
            'berkasBA' => $berita_acara,
            'berkasKuitansi' => $kuitansi,
        ]);
    }

    public function validasi(Request $request)
    {
        Document::where('id', $request->id)->update([
            'is_valid' => $request->is_valid
        ]);

        Pengajuan::where('id', $request->pengajuan_id)->update([
            'stage' => 'diproses ppk',
            'status' => 'diproses'
        ]);


        // Statis jadi ditolak sementara jika ada dokumen yg tidak valid
        if ($request->is_valid == false) {
            Pengajuan::where('id', $request->pengajuan_id)->update([
                'status' => 'ditolak'
            ]);
        }

        redirect()->back()->with('message', 'Berhasil Diperbarui');
    }
}
