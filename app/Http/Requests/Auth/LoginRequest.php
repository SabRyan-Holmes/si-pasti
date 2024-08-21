<?php

namespace App\Http\Requests\Auth;

use App\Models\User;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\prepareForValidation;


class LoginRequest extends FormRequest
{
    protected $inputType;
    protected $loginField;
    protected $loginValue;
    /**
     * Determine if the user is authorized to make this request.
     */
    protected function prepareForValidation()
    {

        $this->loginField = filter_var(
            $this->input('login'),
            FILTER_VALIDATE_EMAIL
        ) ? 'email' : 'nip';
        $this->loginValue = $this->input('login');
        $this->merge([$this->loginField => $this->loginValue]);
    }

    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'email' => 'sometimes|required_without:nip|string|nullable|email|exists:users,email',
            'nip' => 'required_if:email,null|string|exists:users,nip',
            'password' => [
                'required',
                'string',
                function ($attribute, $value, $fail) {
                    // Mengambil user berdasarkan email atau NIP
                    $user = User::where('email', $this->input('email'))
                        ->orWhere('nip', $this->input('nip'))
                        ->first();

                    // Jika user ditemukan, periksa passwordnya
                    if ($user && !Hash::check($value, $user->password)) {
                        $fail('Password yang dimasukkan tidak sesuai.');
                    }
                },
            ],
        ];
    }
    public function messages(): array
    {
        return [
            'email.required_without' => 'Alamat email harus diisi jika NIP tidak diisi.',
            'email.email' => 'Alamat email yang dimasukkan tidak valid.',
            'email.exists' => 'Alamat email tidak terdaftar.',
            'nip.required_if' => 'NIP harus diisi jika alamat email tidak diisi.',
            'nip.exists' => 'NIP tidak terdaftar.',
            'password.required' => 'Password harus diisi.',
            'password.string' => 'Password harus berupa teks.',
        ];
    }

    /**
     * Attempt to authenticate the request's credentials.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function authenticate(): void
    {
        $this->ensureIsNotRateLimited();

        if (!Auth::attempt(
            $this->only($this->loginField, 'password'),
            $this->boolean('remember')
        )) {
            RateLimiter::hit($this->throttleKey());

            throw ValidationException::withMessages([
                'login' => __('auth.failed'),
            ]);
        }
        RateLimiter::clear($this->throttleKey());
    }

    /**
     * Ensure the login request is not rate limited.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function ensureIsNotRateLimited(): void
    {
        if (!RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'email' => trans('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    /**
     * Get the rate limiting throttle key for the request.
     */
    public function throttleKey(): string
    {
        return Str::transliterate(Str::lower($this->input('email')) . '|' . $this->ip());
    }
}
