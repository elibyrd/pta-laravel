<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PokedexEntry extends Model
{
    protected $table = 'pokedex_entries';

    /**
     * The trainers who registerd this pokedex entry.
     */
    public function trainers()
    {
      return $this->belongsToMany('App\Trainer', 'trainers_pokedex_entries', 'pokedex_entry_id', 'trainer_id');
    }
}
