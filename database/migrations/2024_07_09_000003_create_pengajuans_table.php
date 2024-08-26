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
        Schema::create('processes', function (Blueprint $table) {
            $table->id();
            $table->string('nama_tim');
            $table->string('nama_kegiatan');
            $table->unsignedBigInteger('created_by');
            $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');
            $table->enum('status', ['diproses',  'ditolak', 'selesai']);
            $table->enum('stage', ['diajukan ketua tim', 'diproses ppk', 'dipesan pbj', 'pesanan selesai', 'pembayaran', 'selesai']);
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('processes');
    }
};





