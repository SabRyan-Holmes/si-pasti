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
Route::middleware(['auth', 'ketua_tim'])->prefix('ketua-tim')->name('ketua-tim.')->group(function () {

    // Buat Pengajuan
    Route::get('/pengajuan', [KetuaTimController::class, 'create_pengajuan'])->name('pengajuan');
    Route::post('/pengajuan', [KetuaTimController::class, 'ajukan_pengajuan'])->name('ajukan-pengajuan');

    // Riwayat Pengajuan
    Route::get('/riwayat-pengajuan/pengajuan', [KetuaTimController::class, 'riwayat_pengajuan'])->name('riwayat-pengajuan');
    Route::get('/riwayat-pengajuan/show/{pengajuan:nama_kegiatan}', [KetuaTimController::class, 'show_pengajuan'])->name('show-pengajuan');
});


// PPK
Route::middleware(['auth', 'ppk'])->prefix('ppk')->name('ppk.')->group(function () {
    // Daftar Berkas
    Route::get('/daftar-berkas/pengajuan', [PPKController::class, 'daftar_berkas'])->name('daftar-berkas');
    Route::get('/show-berkas/{pengajuan:id}', [PPKController::class, 'show_berkas'])->name('show-berkas');

    // Unggah Berkas
    Route::get('/unggah-berkas/{pengajuan:nama_kegiatan}', [PPKController::class, 'unggah_berkas'])->name('unggah-berkas');
    Route::post('/unggah-berkas', [PPKController::class, 'ajukan_berkas'])->name('ajukan-berkas');

    // Riwayat Pengajuan
    Route::get('/riwayat-pengajuan/pengajuan', [PPKController::class, 'riwayat_pengajuan'])->name('riwayat-pengajuan');
    Route::get('/riwayat-pengajuan/show/{pengajuan:nama_kegiatan}', [PPKController::class, 'show_pengajuan'])->name('show-pengajuan');
    Route::post('/unggah-berkas-ulang', [PPKController::class, 'ajukan_berkas_ulang'])->name('ajukan-berkas-ulang');

    // Validasi Berkas
    Route::post('/validasi/:id', [PPKController::class, 'validasi'])->name('validasi');
});

// PBJ
Route::middleware(['auth', 'pbj'])->prefix('pbj')->name('pbj.')->group(function () {

    // Show Berkas
    Route::get('/daftar-berkas/pengajuan', [PBJController::class, 'daftar_berkas'])->name('daftar-berkas');
    Route::get('/show-berkas/{pengajuan:id}', [PBJController::class, 'show_berkas'])->name('show-berkas');

    // Unggah Berkas
    Route::get('/unggah-berkas/{pengajuan:id}', [PBJController::class, 'unggah_berkas'])->name('unggah-berkas');
    Route::post('/unggah-berkas', [PBJController::class, 'ajukan_berkas'])->name('ajukan-berkas');

    // Riwayat Pengajuan
    Route::get('/riwayat-pengajuan/pengajuan', [PBJController::class, 'riwayat_pengajuan'])->name('riwayat-pengajuan');
    Route::get('/riwayat-pengajuan/show/{pengajuan:id}', [PBJController::class, 'show_pengajuan'])->name('show-pengajuan');

    // Validasi Berkas
    Route::post('/validasi/:id', [PBJController::class, 'validasi'])->name('validasi');
});

// Keuangan
Route::middleware(['auth', 'keuangan'])->prefix('keuangan')->name('keuangan.')->group(function () {
    // Show Berkas
    Route::get('/daftar-berkas/pengajuan', [KeuanganController::class, 'daftar_berkas'])->name('daftar-berkas');
    Route::get('/show-berkas/{pengajuan:id}', [KeuanganController::class, 'show_berkas'])->name('show-berkas');

    // Unggah Berkas
    Route::get('/unggah-berkas/{pengajuan:id}', [KeuanganController::class, 'unggah_berkas'])->name('unggah-berkas');

    // Riwayat Pengajuan
    Route::get('/riwayat-pengajuan/pengajuan', [KeuanganController::class, 'riwayat_pengajuan'])->name('riwayat-pengajuan');
    Route::get('/riwayat-pengajuan/show/{pengajuan:id}', [KeuanganController::class, 'show_pengajuan'])->name('show-pengajuan');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
