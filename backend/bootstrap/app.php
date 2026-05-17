<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // Modo SPA stateful: Sanctum gerencia sessão via cookie HttpOnly
        $middleware->statefulApi();

        // Permite credenciais (cookies) nas requisições vindas do frontend
        $middleware->trustHosts(at: ['localhost']);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
