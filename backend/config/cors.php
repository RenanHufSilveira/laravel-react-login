<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS)
    |--------------------------------------------------------------------------
    | Configuração necessária para que o frontend React (porta 5173) possa
    | enviar e receber cookies HttpOnly do backend Laravel (porta 8000).
    |
    | 'supports_credentials' => true  é obrigatório para cookies funcionarem
    | cross-origin. O frontend deve usar axios com withCredentials: true.
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie', 'login', 'logout', 'register'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [env('FRONTEND_URL', 'http://localhost:5173')],

    // Não usar '*' quando supports_credentials for true
    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    // OBRIGATÓRIO para cookies HttpOnly funcionarem cross-origin
    'supports_credentials' => true,

];
