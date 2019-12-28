<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Trainer extends Model
{

  protected $guarded = [''];

  /**
  * Get the user that owns the trainer.
  */
  public function user()
  {
    return $this->belongsTo('App\Trainer');
  }

  /**
   * This trainer's pokedex entries.
   */
  public function pokedex_entries()
  {
    return $this->belongsToMany('App\PokedexEntry', 'trainers_pokedex_entries', 'trainer_id', 'pokedex_entry_id');
  }

  public static function createTrainer($user_id){
    return Trainer::create([
      'name' => 'New trainer',
      'user_id' => $user_id,
      'public' => false,
    ]);
  }
}