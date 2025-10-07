<?php

// Allow requests from any origin (for development).
// In production, you should replace '*' with your frontend's specific domain, e.g., 'http://localhost:5173'
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/src/Database.php';
require_once __DIR__ . '/src/Post.php';
require_once __DIR__ . '/src/PostController.php';
require_once __DIR__ . '/routes.php';
