<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            // $table->string('kategori')->nullable();
            $table->enum('kategori', [
                'Pengajuan Permintaan Pengadaan',
                'Pengajuan PBJ',
                'Pengajuan Kontrak',
                'Berkas Pembayaran',
                'Pengajuan Berkas ke divisi PPK',
                'Pengajuan Berita Acara',
                'Pengajuan Kuitansi',
                'Berkas Pembayaran'
            ]);

            $table->string('tipe_file');
            // $table->string('jenis_dokumen');
            $table->enum('jenis_dokumen', [
                'Kerangka Ajuan Kerja',
                'Form Permintaan',
                'Surat Permintaan',
                'Rancangan Kontrak',
                'Spekteknis',
                'RAB/HPS',
                'Surat Penunjukan Penjabat Pengadaan(SPPP)',
                'Surat Penetapan Pemenang Barang dan Jasa(SPPBJ)',
                'Surat Kontrak/Surat Pesanan',
                'Berita Acara Serah Terima(BAST)',
                'Berita Acara Pembayaran(BAP)',
                'Surat Perintah Pembayaran(SPM)',
                'Surat Pesanan',
            ]);
            $table->string('path');
            $table->boolean('is_valid')->nullable(); //If Null = Menunggu Validasi


            $table->string('konten')->nullable();
            $table->unsignedBigInteger('pengajuan_id');
            $table->foreign('pengajuan_id')->references('id')->on('processes')->onDelete('cascade');
            $table->unsignedBigInteger('submitted_by');
            $table->foreign('submitted_by')->references('id')->on('users')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
