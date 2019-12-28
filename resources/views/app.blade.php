<?php use Illuminate\Support\Facades\Auth; ?>
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>PokeManager v3</title>
        <script src="https://kit.fontawesome.com/020dba7043.js" crossorigin="anonymous"></script>
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
        <?php
            $user = Auth::user();
            $user_json = false;
            if($user){
                $user_json = $user->getAttribute('email');
            }
        ?>
        <script>
            var base_user = "{{ $user_json }}";
            var routes = {
                "register": "{{ route('register') }}",
                "login": "{{ route('login') }}",
                "logout": "{{ route('logout') }}",
                "pokedex": {
                    "getPokedexData": "{{ route('getPokedexData') }}",
                    "setCaughtStatus": "{{ route('setCaughtStatus') }}",
                    "setSeenStatus": "{{ route('setSeenStatus') }}",
                },
                "trainers": {
                    "getTrainerList": "{{ route('getTrainerList') }}",
                    "getPublicTrainers": "{{ route('getPublicTrainers') }}",
                    "getTrainerData": "/ajax/trainers/getTrainerData",
                    "addTrainer": "{{ route('addTrainer') }}",
                    "saveTrainer": "{{ route('saveTrainer') }}",
                    "deleteTrainer": "{{ route('deleteTrainer') }}",
                }
            };
        </script>
    </head>
    <body>
        <div id='app'></div>
        <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>
