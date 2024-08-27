<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Pengajuan;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     */

    public function run(): void
    {

        $this->call(UserSeeder::class);


        // Comment This Later
        Pengajuan::create([
            'nama_tim' => 'Tim Humas dan Protokoler',
            'nama_kegiatan' => 'Tes kegiatan fuad',
            'created_by' => 14, // Pastikan ID ini sesuai dengan ID yang ada di tabel users
            'status' => 'diproses',
            'stage' => 'pembayaran',
            'start_date' => now(),
            'end_date' => '2024-08-30',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $this->call(DocumentSeeder::class);
    }
}
