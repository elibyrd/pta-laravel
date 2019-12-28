<?php

namespace App\Http\Controllers;

use App\Trainer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TrainerController extends Controller
{
  public function getPublicTrainers() {
    $trainers = Trainer::where('public', true)->get();

    $trainersJson = $trainers->mapWithKeys(function ($trainer) {
      return [$trainer->id => [
      'id' => $trainer->id,
      'name' => $trainer->name,
      ]];
    });

    return response()->json([
      'success' => true,
      'payload' => $trainersJson,
    ]);
  }

  public function getTrainerList() {
    $user = Auth::user();
    $accountTrainers = $user->trainers;
    $otherTrainers = Trainer::where([
      ['public', true],
      ['user_id', '<>', $user->id],
    ])->get();

    $trainersJson = array();

    $trainersJson['myTrainers'] = $accountTrainers->map(function ($trainer) {
      return [
        'id' => $trainer->id,
        'name' => $trainer->name,
        'private' => !$trainer->public,
      ];
    });

    $trainersJson['otherTrainers'] = $otherTrainers->map(function ($trainer) {
      return [
        'id' => $trainer->id,
        'name' => $trainer->name,
        'private' => !$trainer->public,
      ];
    });

    return response()->json([
      'success' => true,
      'payload' => $trainersJson,
    ]);
  }

  public function getTrainerData($trainer_id){
    $trainer = Trainer::find($trainer_id);
    if(!$trainer){
      return response()->json([
        'success' => false,
        'message' => "Error: no trainer exists with id ".$trainer_id,
      ]);
    }

    $user = Auth::user();
    if(!$trainer->public && $trainer->user_id != $user->id){
      return response()->json([
        'success' => false,
        'message' => "User {$user_id} does not have access to trainer ".$trainer_id,
      ]);
    }

    return response()->json([
      'success' => true,
      'payload' => [
        'id' => $trainer->id,
        'name' => $trainer->name,
        'public' => $trainer->public,
        'user' => $user->name,
        'total_caught' => $trainer->pokedex_entries->count(),
      ],
    ]);
  }

  public function addTrainer(){
    $user = Auth::user();
    if(!$user){
      return response()->json([
        'success' => false,
        'message' => "Error: can't add trainer if not logged in.",
      ]);
    }

    Trainer::createTrainer($user->id);
    return TrainerController::getTrainerList();
  }

  public function deleteTrainer(Request $request){
    $data = $request->all();
    $trainer_id = $data['tid'];
    $trainer = Trainer::find($trainer_id);
    if(!$trainer){
      return response()->json([
        'success' => false,
        'message' => "Error: no trainer exists with id ".$trainer_id,
      ]);
    }

    $user = Auth::user();
    if(!$user){
      return response()->json([
        'success' => false,
        'message' => "Error: can't delete trainer if not logged in.",
      ]);
    }
    if($trainer->user_id != $user->id){
      return response()->json([
        'success' => false,
        'message' => "User {$user_id} does not have access to delete trainer ".$trainer_id,
      ]);
    }

    $trainer->delete();
    return response()->json([
      'success' => true,
      'message' => "Trainer successfully deleted",
    ]);
  }
}
