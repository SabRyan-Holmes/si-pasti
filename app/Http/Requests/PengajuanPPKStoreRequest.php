<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PengajuanPPKStoreRequest extends FormRequest
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
            'ban' => ['nullable', 'file', 'mimes:pdf', 'max:15192'],
            'bahp' => ['nullable', 'file', 'mimes:pdf', 'max:15192'],

            // Rule kustom untuk memastikan salah satu berkas harus diupload
            // Menggunakan required_without_all
            'ban' => ['required_without_all:bahp', 'file', 'mimes:pdf', 'max:15192'],
            'bahp' => ['required_without_all:ban', 'file', 'mimes:pdf', 'max:15192'],

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

            'required_without_all' => 'Salah satu dari Berkas harus diupload.',

        ];
    }
}
