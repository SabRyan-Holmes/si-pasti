<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,

        ])->alias([
            'auth' => \App\Http\Middleware\Authenticate::class,
            'ketua_tim' => \App\Http\Middleware\KetuaTim::class,
            'ppk' => \App\Http\Middleware\PPK::class,
            'pbj' => \App\Http\Middleware\PBJ::class,
            'keuangan' => \App\Http\Middleware\Keuangan::class,
        ]);

        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
