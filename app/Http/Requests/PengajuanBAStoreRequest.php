<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PengajuanBAStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'pengajuan_id' => ['required', 'integer'],
            'nama_kegiatan' => ['required', 'string'],

            // // Pengajuan Berita Acara
            'bast' => ['nullable', 'file', 'mimes:pdf', 'max:15192'],
            'bap' => ['nullable', 'file', 'mimes:pdf', 'max:15192'],

            // Menggunakan required_without_all
            'bast' => ['required_without_all:bap', 'file', 'mimes:pdf', 'max:15192'],
            'bap' => ['required_without_all:bast', 'file', 'mimes:pdf', 'max:15192'],

        ];
    }

    public function messages(): array
    {
        return [
            // Pesan error untuk rule kustom
            'required' => 'Kolom :attribute harus diisi.',
            'string' => 'Kolom :attribute harus berupa teks.',
            'max' => 'Kolom :attribute tidak boleh lebih dari :max karakter.',
            'file' => 'Kolom :attribute harus berupa file.',
            'mimes' => 'Kolom :attribute harus berupa dokumen PDF.',
            'required_without_all' => 'Salah satu dari berkas harus diupload.',
        ];
    }
}
