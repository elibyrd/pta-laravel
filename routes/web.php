<?php

use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['prefix' => 'ajax'], function() {
    Route::post('/logout', function () {
        Auth::logoutCurrentDevice();
        return response()->json([
            'success' => true,
            'message' => "Successfully logged out!",
        ]);
    })->name('logout');;
    // all routes that don't need to go to react-router
    Auth::routes();
});

Route::get('/{path?}', function () {
    return view('app');
});