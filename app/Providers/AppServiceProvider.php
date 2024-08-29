<?php

namespace App\Providers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind('path.public', function() {
            return base_path('../public_html');
         });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([ 'errors' => function () { return Session::get('errors') ? Session::get('errors')->getBag('default')->getMessages() : (object) []; }]);
    }
}
