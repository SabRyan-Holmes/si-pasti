<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
        // Periksa apakah pengguna terautentikasi dan memiliki salah satu dari peran yang diizinkan
        if (!Auth::check() || !in_array(Auth::user()->divisi, $roles)) {
            // Jika tidak memiliki peran yang sesuai, redirect atau tampilkan error
            return redirect('/')->with('message', 'Anda tidak memiliki izin untuk mengakses halaman ini.');
        }

        return $next($request);
    }
}
