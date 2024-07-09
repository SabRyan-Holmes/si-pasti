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
        Schema::create('pengajuans', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            // Ketua Tim
            $table->string('nama_kegiatan');
            $table->string('kak');
            $table->string('form_permintaan');

            // PPK
            $table->foreignId('ketua_tim');




            // PBJ

            //Keuangan

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengajuans');
    }
};
