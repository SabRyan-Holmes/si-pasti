<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class Keuangan
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // if (Auth::user()->name != "Keuangan") {
        //     return response()->json('Opps! You do not have permission to access.');
        // }
        // return $next($request);
        if (Auth::user()->divisi == "Keuangan") {
            return $next($request);
        }
        abort(401);

    }
}
