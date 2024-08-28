<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\KetuaTimController;
use App\Http\Controllers\KeuanganController;
use App\Http\Controllers\PBJController;
use App\Http\Controllers\PPKController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Auth/Login');
})->middleware('guest');


Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [AuthController::class, 'dashboard'])->name('dashboard');

    // Rute untuk Daftar Berkas hanya bisa diakses oleh pbj, ppk, dan keuangan
    Route::middleware(['role:PBJ,PPK,Keuangan'])->group(function () {
        Route::get('/daftar-berkas', [AuthController::class, 'daftar_berkas'])->name('daftar-berkas');
        Route::get('daftar-berkas/show-all-berkas/{pengajuan:nama_kegiatan}', [AuthController::class, 'show_all_berkas'])->name('show-all-berkas');
    });
    // Riwayat Pengajuan
    Route::get('/riwayat-pengajuan', [AuthController::class, 'riwayat_pengajuan'])->name('riwayat-pengajuan');
});



// Ketua Tim Pengajuan
Route::middleware(['auth', 'ketua_tim'])->prefix('ketua-tim')->name('ketua-tim.')->group(function () {

    // Buat Pengajuan
    Route::get('/pengajuan', [KetuaTimController::class, 'create_pengajuan'])->name('pengajuan');
    Route::post('/pengajuan', [KetuaTimController::class, 'ajukan_pengajuan'])->name('ajukan-pengajuan');

    // Riwayat Pengajuan
    // Route::get('/riwayat-pengajuan/pengajuan', [KetuaTimController::class, 'riwayat_pengajuan'])->name('riwayat-pengajuan');
    Route::get('/riwayat-pengajuan/show/{pengajuan:nama_kegiatan}', [KetuaTimController::class, 'show_pengajuan'])->name('show-pengajuan');
    Route::post('/unggah-berkas-ulang', [KetuaTimController::class, 'ajukan_berkas_ulang'])->name('ajukan-berkas-ulang');
});


// PPK
Route::middleware(['auth', 'ppk'])->prefix('ppk')->name('ppk.')->group(function () {
    // Validasi
    Route::get('/show-berkas/{pengajuan:nama_kegiatan}', [PPKController::class, 'show_berkas'])->name('show-berkas');

    // Unggah Berkas
    Route::get('/unggah-berkas/{pengajuan:nama_kegiatan}', [PPKController::class, 'unggah_berkas'])->name('unggah-berkas');
    Route::post('/ajukan-berkas-pbj', [PPKController::class, 'ajukan_berkas_pbj'])->name('ajukan-berkas-pbj');
    Route::post('/ajukan-berkas-kontrak-', [PPKController::class, 'ajukan_berkas_kontrak'])->name('ajukan-berkas-kontrak');
    Route::post('/ajukan-berkas-ba-', [PPKController::class, 'ajukan_berkas_ba'])->name('ajukan-berkas-ba');
    Route::post('/ajukan-berkas-kuitansi-', [PPKController::class, 'ajukan_berkas_kuitansi'])->name('ajukan-berkas-kuitansi');

    // Riwayat Pengajuan
    // Route::get('/riwayat-pengajuan/pengajuan', [PPKController::class, 'riwayat_pengajuan'])->name('riwayat-pengajuan');
    Route::get('/riwayat-pengajuan/show/{pengajuan:nama_kegiatan}', [PPKController::class, 'show_pengajuan'])->name('show-pengajuan');
    Route::post('/unggah-berkas-ulang', [PPKController::class, 'ajukan_berkas_ulang'])->name('ajukan-berkas-ulang');

    // Validasi Berkas
    Route::post('/validasi/:id', [PPKController::class, 'validasi'])->name('validasi');
});

// PBJ
Route::middleware(['auth', 'pbj'])->prefix('pbj')->name('pbj.')->group(function () {

    // Show Berkas/Validasi
    Route::get('/show-berkas/{pengajuan:nama_kegiatan}', [PBJController::class, 'show_berkas'])->name('show-berkas');

    // Unggah Berkas
    Route::get('/unggah-berkas/{pengajuan:nama_kegiatan}', [PBJController::class, 'unggah_berkas'])->name('unggah-berkas');
    Route::post('/unggah-berkas', [PBJController::class, 'ajukan_berkas'])->name('ajukan-berkas');

    // Riwayat Pengajuan
    Route::get('/riwayat-pengajuan/show/{pengajuan:nama_kegiatan}', [PBJController::class, 'show_pengajuan'])->name('show-pengajuan');
    Route::post('/unggah-berkas-ulang', [PBJController::class, 'ajukan_berkas_ulang'])->name('ajukan-berkas-ulang');

    // Validasi Berkas
    Route::post('/validasi/:id', [PBJController::class, 'validasi'])->name('validasi');
    Route::post('/order-done/:id', [PBJController::class, 'order_done'])->name('order-done');
});

// Keuangan
Route::middleware(['auth', 'keuangan'])->prefix('keuangan')->name('keuangan.')->group(function () {

    // Unggah Berkas
    Route::get('/unggah-berkas/{pengajuan:nama_kegiatan}', [KeuanganController::class, 'unggah_berkas'])->name('unggah-berkas');
    Route::post('/unggah-berkas', [KeuanganController::class, 'ajukan_berkas'])->name('ajukan-berkas');

    // Riwayat Pengajuan
    Route::get('/riwayat-pengajuan/show/{pengajuan:nama_kegiatan}', [KeuanganController::class, 'show_pengajuan'])->name('show-pengajuan');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// For Hosting(Storage Link. Delete THIS Later after called!)
Route::get('/generate', function(){
    \Illuminate\Support\Facades\Artisan::call('storage:link');
    echo 'ok';
 });

require __DIR__ . '/auth.php';


