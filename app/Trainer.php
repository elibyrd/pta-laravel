<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Trainer extends Model
{
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
}