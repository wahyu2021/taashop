<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SecurityHeaders
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Security Headers
        $response->headers->set('X-Frame-Options', 'SAMEORIGIN');
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('X-XSS-Protection', '1; mode=block');
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
        
        $csp = "default-src 'self'; " .
               "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:5173 http://[::1]:5173; " .
               "style-src 'self' 'unsafe-inline' https://fonts.bunny.net http://localhost:5173 http://[::1]:5173; " .
               "img-src 'self' data: https: http://localhost:5173 http://[::1]:5173; " .
               "font-src 'self' data: https://fonts.bunny.net; " .
               "connect-src 'self' https: ws://localhost:5173 ws://[::1]:5173 http://localhost:5173 http://[::1]:5173; " .
               "frame-ancestors 'self';";
               
        $response->headers->set('Content-Security-Policy', $csp);
        $response->headers->set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');

        return $response;
    }
}
