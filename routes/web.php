<?php

use App\Http\Controllers\KetuaTimController;
use App\Http\Controllers\KeuanganController;
use App\Http\Controllers\PBJController;
use App\Http\Controllers\PPKController;

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


// s
Route::get('/', function () {
    return Inertia::render('Auth/Login');
});

Route::get('/dashboard', [ProfileController::class, 'dashboard'])->middleware(['auth', 'verified'])->name('dashboard');


// Ketua Tim Pengajuan
Route::middleware(['auth', 'ketua_tim'])->prefix('dashboard/ketua-tim')->name('ketua_tim.')->group(function () {

    // Pengajuan
    Route::get('/pengajuan', [KetuaTimController::class, 'pengajuan'])->name('pengajuan');
    Route::post('/pengajuan', [KetuaTimController::class, 'ajukan_pengajuan'])->name('ajukan_pengajuan');

    // Detail
    Route::get('/pengajuan/show/{pengajuan:id}', [KetuaTimController::class, 'show_pengajuan'])->name('show_pengajuan');
    Route::post('/document/{path}', [KetuaTimController::class, 'open_document'])->name('open_document');

    // Riwayat Pengajuan
    Route::get('/riwayat-pengajuan', [KetuaTimController::class, 'riwayat_pengajuan'])->name('riwayat_pengajuan');
});


// PPK
Route::middleware(['auth', 'ppk'])->prefix('dashboard/ppk')->name('ppk.')->group(function () {
    // Daftar Berkas
    Route::get('/daftar-berkas', [PPKController::class, 'daftar_berkas'])->name('daftar-berkas');
    // Route::get('/cek-berkas-ketua-tim', [PPKController::class, 'berkas_kt'])->name('berkas-kt');
    Route::get('/cek-berkas-ketua-tim/{pengajuan:id}', [PPKController::class, 'show_berkas'])->name('show-berkas-kt');

    // Route::get('/cek-berkas-pbj', [PPKController::class, 'show_pbj'])->name('berkas-pbj');
    Route::get('/cek-berkas-pbj/{pengajuan:id}', [PPKController::class, 'show_pbj'])->name('show-berkas-pbj');

    // Unggah Berkas
    Route::get('/unggah-berkas', [PPKController::class, 'unggah_berkas'])->name('unggah-berkas');

    Route::get('/unggah-berkas-pengajuan-pbj', [PPKController::class, 'pengajuan_pbj'])->name('unggah-pengajuan-pbj');
    Route::get('/unggah-berkas-pemesanan', [PPKController::class, 'unggah_pemesanan'])->name('unggah-pemesanan');
    Route::get('/unggah-berkas-kuitansi', [PPKController::class, 'unggah_kuitansi'])->name('unggah-kuitansi');

    // Riwayat Pengajuan
    Route::get('/riwayat-pengajuan', [KetuaTimController::class, 'riwayat_pengajuan'])->name('riwayat_pengajuan');
});

// PBJ
Route::middleware(['auth', 'pbj'])->prefix('dashboard/pbj')->name('pbj.')->group(function () {

    // Cek Berkas
    Route::get('/cek-berkas', [PBJController::class, 'cek_berkas'])->name('cek_berkas');

    // Unggah Berkas
    Route::get('/unggah-berkas', [PBJController::class, 'unggah_berkas'])->name('unggah_berkas');

    //Pengadaan
    Route::get('/pengadaan', [PBJController::class, 'pengadaan'])->name('pengadaan');

    // Riwayat Pengajuan
    Route::get('/riwayat-pengajuan', [PBJController::class, 'riwayat_pengajuan'])->name('riwayat_pengajuan');
});

// Keuangan
Route::middleware(['auth', 'keuangan'])->prefix('dashboard/keuangan')->name('keuangan.')->group(function () {
    // Cek Berkas
    Route::get('/cek-berkas', [KeuanganController::class, 'cek_berkas'])->name('cek_berkas');

    // Unggah Berkas
    Route::get('/unggah-berkas', [KeuanganController::class, 'unggah_berkas'])->name('unggah_berkas');

    // Riwayat Pengajuan
    Route::get('/riwayat-pengajuan', [KeuanganController::class, 'riwayat_pengajuan'])->name('riwayat_pengajuan');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
