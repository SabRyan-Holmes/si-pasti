<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     */
    protected static ?string $password;

    public function run(): void
    {

        // <==============================Ketua Tim START==============================>
        // For a user with one team
        User::create([
            'name' => 'Sisilia Nurteta / S.ST.,M.Si',
            'nip' => '197905242000122001',
            'divisi' => 'Ketua Tim',
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ])->nama_tim()->createMany([
            ['nama_tim' => 'Tim Statistik Kependudukan'],
            ['nama_tim' => 'Ketenagakerjaan dan Kesejahteraan Rakyat'],
        ]);

        User::create([
            'name' => 'Ani Dwi Nugraeni / S.ST',
            'nip' => '197502231999032003',
            'divisi' => 'Ketua Tim',
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ])->nama_tim()->create([
            'nama_tim' => 'Tim Statistik Ketahanan Sosial',
        ]);

        User::create([
            'name' => 'Eny Tristanti / S.ST.,ME',
            'nip' => '197702061999122001',
            'divisi' => 'Ketua Tim',
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ])->nama_tim()->create([
            'nama_tim' => 'Tim Statistik Pertanian',
        ]);

        User::create([
            'name' => 'Andi Setiawan / S.ST.,M.Si',
            'nip' => '198310312007011004',
            'divisi' => 'Ketua Tim',
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ])->nama_tim()->createMany([
            ['nama_tim' => 'Tim Statistik Industri dan Pertambangan, Energi dan Konstruksi'],
            ['nama_tim' => 'Tim Penyusunan Manajemen Risiko dan Quality Gates']
        ]);

        User::create([
            'name' => 'Susiawati Kristiarini / S.ST',
            'nip' => '197612031999012001',
            'divisi' => 'Ketua Tim',
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ])->nama_tim()->createMany([
            ['nama_tim' => 'Tim Statistik Distribusi dan Jasa'],
            ['nama_tim' => 'Tim Perencanaan Sensus Ekonomi/Sensus Ekonomi Pilot'],
        ]);

        User::create([
            'name' => 'Dwi Jayanti / S.ST',
            'nip' => '198501022008012004',
            'divisi' => 'Ketua Tim',
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ])->nama_tim()->create([
            'nama_tim' => 'Tim Statistik Harga',
        ]);

        User::create([
            'name' => 'Sumarmi / S.ST, M.Si.',
            'nip' => '197802112000122001',
            'divisi' => 'Ketua Tim',
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ])->nama_tim()->createMany([
            ['nama_tim' => 'Tim Neraca Wilayah'],
            ['nama_tim' => 'Tim Penyelenggaraan Konsultasi Regional (Konreg) Wilayah Sumatera']
        ]);

        User::create([
            'name' => 'Oeliestina / S.ST.',
            'nip' => '198102042003122003',
            'divisi' => 'Ketua Tim',
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ])->nama_tim()->createMany([
            ['nama_tim' => 'Tim Penyusunan DDA (Daerah Dalam Angka)'],
            ['nama_tim' => 'Tim Pengumpulan Metadata Statistik'],
            ['nama_tim' => 'Tim Pojok Statistik']
        ]);

        User::create([
            'name' => 'Nicky Rizkiansyah / S.ST., M.E.',
            'nip' => '198811062010121001',
            'divisi' => 'Ketua Tim',
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ])->nama_tim()->create([
            'nama_tim' => 'Tim Analisis dan Pengembangan Statistik'
        ]);

        User::create([
            'name' => 'Iman Karyadi / S.ST.',
            'nip' => '196910081991121001',
            'divisi' => 'Ketua Tim',
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ])->nama_tim()->create([
            'nama_tim' => 'Tim Pengolahan Data dan Pengembangan Sistem',
        ]);

        User::create([
            'name' => 'Agus Widodo / S.ST., M.Si.',
            'nip' => '198008302002121003',
            'divisi' => 'Ketua Tim',
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ])->nama_tim()->create([
            'nama_tim' => 'Tim Jaringan Komunikasi Data',
        ]);

        User::create([
            'name' => 'Nopriansyah / S.ST., M.Si.',
            'nip' => '198011172003121001',
            'divisi' => 'Ketua Tim',
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ])->nama_tim()->createMany([
            ['nama_tim' => 'Tim Diseminasi Statistik'],
            ['nama_tim' => 'Tim Desa Cantik'],
        ]);

        User::create([
            'name' => 'Sutino / S.E.',
            'nip' => '196902101994031006',
            'divisi' => 'Ketua Tim',
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ])->nama_tim()->create([
            'nama_tim' => 'Tim Rumah Tangga, Kearsipan dan Pengelolaan BMN',
        ]);

        User::create([
            'name' => 'Fuad Hasyim / S.M.',
            'nip' => '197502042002121003',
            'divisi' => 'Ketua Tim',
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ])->nama_tim()->create([
            'nama_tim' => 'Tim Humas dan Protokoler',
        ]);

        User::create([
            'name' => 'Eka Putri Maya Sari / S.ST.',

            'nip' => '199308112018022001',
            'divisi' => 'Ketua Tim',
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ])->nama_tim()->create([
            'nama_tim' => 'Tim Kerja Penyusunan SAKIP (Sistem Akuntabilitas Kinerja Instansi Pemerintah)',
        ]);

        User::create([
            'name' => 'Chumanidya Utami / S.Si., M.Si.',
            'nip' => '198609232012122001',
            'divisi' => 'Ketua Tim',
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ])->nama_tim()->create([
            'nama_tim' => 'Tim Pelaporan Keuangan dan Permintaan Dokumen',
        ]);

        User::create([
            'name' => 'Betty Woro Pratiwi / S.Si.',
            'nip' => '199403252019032001',
            'divisi' => 'Ketua Tim',
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ])->nama_tim()->create([
            'nama_tim' => 'Tim Perencanaan',

        ]);

        User::create([
            'name' => 'Sunandar / SE., M.Si.',
            'nip' => '197405041993121001',
            'divisi' => 'Ketua Tim',
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ])->nama_tim()->create([
            'nama_tim' => 'Tim Pengadaan Barang dan Jasa',
        ]);

        User::create([
            'name' => 'Dwi Utaminingsih / S.Psi, MM.',
            'nip' => '198807032011012019',
            'divisi' => 'Ketua Tim',
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ])->nama_tim()->create([
            'nama_tim' => 'Tim Kerja SDM dan Hukum',
        ]);

        // FIXME: NIP tidak unique
        // User::create([
        //     'name' => 'Gafur / S.ST., M.Si.',
        //     'nip' => '197907272002121010',
        //     'divisi' => 'Ketua Tim',
        //     'password' => static::$password ??= Hash::make('password'),
        //     'remember_token' => Str::random(10),
        // ])->nama_tim()->create([
        //     'nama_tim' => 'Tim Keuangan',
        // ]);

        User::create([
            'name' => 'Eva Riani / S.ST.,M.E.',
            'nip' => '197909012000122001',
            'divisi' => 'Ketua Tim',
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ])->nama_tim()->create([
            'nama_tim' => 'Tim Rekomendasi Statistik',

        ]);

        User::create([
            'name' => 'Vitalia Susanti / M.Si.',
            'nip' => '198102222003122002',
            'divisi' => 'Ketua Tim',
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ])->nama_tim()->create([
            'nama_tim' => 'Tim Konsultasi Statistik',

        ]);

        User::create([
            'name' => 'Eviyana Atmanegara / S.ST., M.Stat.',
            'nip' => '198602222008012003',
            'divisi' => 'Ketua Tim',
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ])->nama_tim()->create([
            'nama_tim' => 'Tim Pelayanan Publik ',
        ]);

        User::create([
            'name' => 'Nova Moestafa / S.ST., M.Si.',
            'nip' => '198104302003121003',
            'divisi' => 'Ketua Tim',
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ])->nama_tim()->create([
            'nama_tim' => 'Tim Pembinaan Statistik Sektoral dan EPSS (Evaluasi Penyelenggaraan Statistik Sektoral)',

        ]);

        User::create([
            'name' => 'Ni Kadek Suardani / S.ST., M.S.E.',
            'nip' => '198301142006022001',
            'divisi' => 'Ketua Tim',
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ])->nama_tim()->create([
            'nama_tim' => 'Tim Redaksi Jurnal Ilmiah MEDIAN',
        ]);


        // <==============================Ketua Tim END==============================>




        // <==============================PBJ, PPK & Keuangan START==============================>
        // FIXME: NIP tidak unik

        // User::create([
        //     'name' => 'Sunandar / SE., M.Si.',
        //     'nip' => '197405041993121001',
        //     'divisi' => 'PBJ',
        //     'password' => static::$password ??= Hash::make('password'),
        //     'remember_token' => Str::random(10),
        // ])->nama_tim()->create([
        //     'nama_tim' => 'Pengadaan Barang dan Jasa',
        // ]);

        User::create([
            'name' => 'Diyas Marliyanda / S.E.',
            'nip' => '198903232012121001',
            'divisi' => 'PBJ',
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ])->nama_tim()->create([
            'nama_tim' => 'Pengadaan Barang dan Jasa',
        ]);

        User::create([
            'name' => 'Della Ayu Syafila / S.E.',
            'nip' => '199504092022032012',
            'divisi' => 'PBJ',
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ])->nama_tim()->create([
            'nama_tim' => 'Pengadaan Barang dan Jasa',
        ]);

        User::create([
            'name' => 'Gafur / S.ST., M.Si.',
            'nip' => '197907272002121010',
            'email' => 'ppk.bps@gmail.com',
            'divisi' => 'PPK',
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ])->nama_tim()->create([
            'nama_tim' => 'Tim Keuangan',
        ]);

        User::create([
            'name' => 'Marniala Larasati Situmorang /A.Md.Kb.N.',
            'nip' => '200105102022012001',
            'email' => 'keuangan.bps@gmail.com',
            'divisi' => 'Keuangan',
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ])->nama_tim()->create([
            'nama_tim' => 'Keuangan',
        ]);

        // <==============================PBJ, PPK & Keuangan END==============================>

    }
}
