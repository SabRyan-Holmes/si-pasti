<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::create([
            'name' => 'Ketua Tim',
            'email' => 'ketua.tim.bps@gmail.com',
            'divisi' => 'Ketua Tim',
            'password' => 'password'
        ]);
        User::create([
            'name' => 'PPK',
            'email' => 'ppk.bps@gmail.com',
            'divisi' => 'PPK',
            'password' => 'password'
        ]);
        User::create([
            'name' => 'PBJ',
            'email' => 'pbj.bps@gmail.com',
            'divisi' => 'PBJ',
            'password' => 'password'
        ]);
        User::create([
            'name' => 'Keuangan',
            'email' => 'keuangan.bps@gmail.com',
            'divisi' => 'Keuangan',
            'password' => 'password'
        ]);
    }
}
