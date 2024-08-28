<!DOCTYPE html>
<html data-theme="bps_theme" lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
    <link rel="shortcut icon" href="{{ asset('logo.png') }}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>

    <!-- Scripts -->

    @routes
    @viteReactRefresh
    {{-- COMMENT THIS @vite WHEN PRODCUTION!!! --}}
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead

    <!----------------------------------------------- NOTE:  FOR HOSTING!! --------------------------------------------------->
    <!-- Import manifest.json -->
    {{-- @php
        $manifest = json_decode(file_get_contents(public_path('build/manifest.json')), true);
    @endphp --}}

    <!-- Vite imports -->
    {{-- <script type="module" src="{{ asset('build/' . $manifest['resources/js/app.jsx']['file']) }}"></script>
    <script type="module"
        src="{{ asset('build/' . $manifest['resources/js/Pages/' . $page['component'] . '.jsx']['file']) }}"></script> --}}

    <!-- Import CSS -->
    {{-- CHANGE THIS LATER!! --}}
    {{-- <link rel="stylesheet" href="{{ asset('build/assets/app-DLREyfNz.css') }}"> --}}
    <!----------------------------------------------- NOTE:  FOR HOSTING!! --------------------------------------------------->
</head>

<body className="antialiased">
    @inertia
</body>

</html>
