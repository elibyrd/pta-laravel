<?php

namespace App\Http\Controllers;

use App\Trainer, App\PokedexEntry;
use Illuminate\Http\Request;
//use Illuminate\Support\Collection;

class PokedexController extends Controller
{
  public function getPokedexData(){
    $entries = PokedexEntry::orderBy('ndid')->get();

    $entriesJson = $entries->map(function ($entry) {
      return [
        'eid' => $entry->id,
        'ndid' => $entry->ndid,
        'name' => $entry->name,
        'seen' => $entry->seen,
        'trainersCaught' => $entry->trainers->pluck('id'),
      ];
    });

    return response()->json([
      'success' => true,
      'payload' => $entriesJson,
    ]);
  }

  public function setSeenStatus(Request $request)  {
    $data = $request->all();
    $entry_id = $data['eid'];
    $seen_status = $data['status'];

    $entry = PokedexEntry::find($entry_id);
    if(!$entry){
      return response()->json([
        'success' => false,
        'message' => "Could not find entry {$entry_id}.",
      ]);
    }

    $entry->seen = $seen_status;
    $entry->save();

    return PokedexController::getPokedexData();
  }

  public function setCaughtStatus(Request $request)  {
    $data = $request->all();
    $entry_id = $data['eid'];
    $trainer_id = $data['tid'];
    $caught_status = $data['status'];

    $entry = PokedexEntry::find($entry_id);
    $trainer = Trainer::find($trainer_id);
    if(!$entry || !$trainer)
      return response()->json([
        'success' => false,
        'message' => "Could not find entry {$entry_id} and/or trainer {$trainer_id}.",
      ]);

    if($caught_status)
      $entry->trainers()->attach($trainer);
    else
      $entry->trainers()->detach($trainer);


    return PokedexController::getPokedexData();
  }

  /*
  public function getSeenPokemon(){
    $entries = PokedexEntry::where('seen', true)->get();

    $entriesJson = $entries->map(function ($entry, $key) {
      return [
        'ndid' => $entry->ndid,
        'trainers' => $entry->trainers->pluck('id'),
      ];
    });

    return response()->json([
      'success' => true,
      'payload' => $entriesJson,
    ]);
  }*/
}
