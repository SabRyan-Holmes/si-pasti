<?php

namespace App\Traits;

use App\Models\Pengajuan;



trait CheckPayments
{
    // Menyimpan state berdasarkan ID
    protected $states = [];

    //params1 = sudah unggah BA & kuitansi?
    // params2 = sudah unggah spm oleh keuangan
    public function checkPaymentStatus($id, $params1 = null, $params2 = null)
    {
        // Inisialisasi state untuk ID jika belum ada
        if (!isset($this->states[$id])) {
            $this->states[$id] = [
                'params1' => false,
                'params2' => false,
            ];
        }

        // Update state berdasarkan parameter
        if ($params1 === true) {
            $this->states[$id]['params1'] = true;
        }
        if ($params2 === true) {
            $this->states[$id]['params2'] = true;
        }

        // Gunakan state yang tersimpan jika parameter null
        $params1 =  $this->states[$id]['params1'] ?? $params1 ;
        $params2 = $this->states[$id]['params2'] ?? $params2 ;

        // Contoh logika yang memeriksa kedua parameter kemudian mengubah stage
        if ($params1 === true && $params2 === true) {
            Pengajuan::where('id', $id)->update([
                'stage' => "pembayaran"
            ]);
        }
    }
}
