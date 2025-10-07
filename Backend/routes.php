<?php

use IdeaStream\\Backend\\PostController;

$postController = new PostController();

header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_SERVER['REQUEST_URI'] === '/posts') {
    echo json_encode($postController->getAllPosts());
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_SERVER['REQUEST_URI'] === '/posts') {
    $data = json_decode(file_get_contents('php://input'), true);
    $postId = $postController->createPost($data);
    echo json_encode(['id' => (string) $postId]);
}
