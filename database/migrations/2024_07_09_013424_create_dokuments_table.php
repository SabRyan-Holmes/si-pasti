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
            $table->string('kategori')->nullable();
            $table->string('tipe_file');
            $table->string('jenis_dokumen');
            $table->string('path');
            // $table->string('konten')->nullable();
            $table->unsignedBigInteger('kegiatan_id');
            $table->foreign('kegiatan_id')->references('id')->on('kegiatans')->onDelete('cascade');
            $table->unsignedBigInteger('submitted_by');
            $table->foreign('submitted_by')->references('id')->on('users')->onDelete('cascade');
            $table->boolean('is_valid')->nullable(); //If Null = Menunggu Validasi



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
