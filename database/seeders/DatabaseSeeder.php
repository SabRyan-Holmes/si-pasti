<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(30)->create([
            'divisi' => 'Ketua Tim'
        ]);

        User::create([
            'name' => 'Sabrian Maulana',
            'email' => 'sabrian_maulana@gmail.com',
            // 'username' => 'ketua_tim.bps',
            'divisi' => 'Ketua Tim',
            'password' => 'password',
            'remember_token' => Str::random(10),

        ]);

        User::create([
            'name' => 'Budi Pratomo',
            'email' => 'budi_pratomo@gmail.com',
            // 'username' => 'ketua_tim.bps',
            'divisi' => 'Ketua Tim',
            'password' => 'password',
            'remember_token' => Str::random(10),
        ]);

        User::create([
            'name' => 'Pranaja Sangkara',
            'email' => 'pranaja_sangkara@gmail.com',
            // 'username' => 'ketua_tim.bps',
            'divisi' => 'Ketua Tim',
            'password' => 'password',
            'remember_token' => Str::random(10),
        ]);

        User::create([
            'name' => 'Adelia Rahmawati ',
            'email' => 'adelia_rahmawati@gmail.com',
            // 'username' => 'ketua_tim.bps',
            'divisi' => 'Ketua Tim',
            'password' => 'password',
            'remember_token' => Str::random(10),
        ]);




        User::create([
            'name' => 'PPK',
            'email' => 'ppk.bps@gmail.com',
            'username' => 'ppk.bps',
            'divisi' => 'PPK',
            'password' => 'password',
            'remember_token' => Str::random(10),
        ]);

        User::create([
            'name' => 'PBJ',
            'email' => 'pbj.bps@gmail.com',
            'username' => 'pbj.bps',
            'divisi' => 'PBJ',
            'password' => 'password'
        ]);

        User::create([
            'name' => 'Keuangan',
            'email' => 'keuangan.bps@gmail.com',
            'username' => 'keuangan.bps',
            'divisi' => 'Keuangan',
            'password' => 'password',
            'remember_token' => Str::random(10),
        ]);
    }
}
