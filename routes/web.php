<?php

use App\Trainer;
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

  Route::get('pokedex/data', 'PokedexController@getPokedexData')->name('getPokedexData');
  Route::post('pokedex/setCaughtStatus', 'PokedexController@setCaughtStatus')->name('setCaughtStatus');
  Route::post('pokedex/setSeenStatus', 'PokedexController@setSeenStatus')->name('setSeenStatus');

  Route::get('trainers/trainerList', 'TrainerController@getTrainerList')->name('getTrainerList');
  Route::get('trainers/publicTrainers', 'TrainerController@getPublicTrainers')->name('getPublicTrainers');
  Route::get('trainers/getTrainerData/{id}', 'TrainerController@getTrainerData')->name('getTrainerData');
  Route::post('trainers/addTrainer', 'TrainerController@addTrainer')->name('addTrainer');

  Auth::routes();
});

Route::fallback(function () {
  return view('app');
});