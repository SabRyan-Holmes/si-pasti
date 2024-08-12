<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Pengajuan;
use App\Models\Document;
use App\Models\Kegiatan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function dashboard() {
        $pengajuan = Pengajuan::where('status', 'diproses')->count();
        $rejected = Pengajuan::where('status', 'ditolak')->count();
        $accepted = Pengajuan::where('status', 'selesai')->count();
        return Inertia::render('Dashboard', [
            'title' => 'Dashboard',
            'userCount' => User::all()->count(),
            'divisiCount' => User::select('divisi')->distinct()->count('divisi'),
            'ketuaTimCount' => User::where('divisi', 'Ketua Tim')->count(),
            'kegiatanCount' => Pengajuan::all()->count(),
            'documentCount' => Document::all()->count(),
            'rejectedCount' => $rejected,
            'acceptedCount' => $accepted,
            'processCount' => $pengajuan,

        ]);
    }
}
