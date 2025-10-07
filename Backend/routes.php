<?php

use IdeaStream\\Backend\\PostController;
use IdeaStream\\Backend\\UserController;
use IdeaStream\\Backend\\CommentController;

$postController = new PostController();
$userController = new UserController();
$commentController = new CommentController();

header("Content-Type: application/json");

$requestUri = $_SERVER['REQUEST_URI'];
$requestMethod = $_SERVER['REQUEST_METHOD'];

if ($requestMethod === 'GET' && $requestUri === '/posts') {
    $limit = isset($_GET['limit']) ? (int) $_GET['limit'] : 10;
    $skip = isset($_GET['skip']) ? (int) $_GET['skip'] : 0;
    $posts = $postController->getAllPosts($limit, $skip);
    $total = $postController->getPostsCount();
    echo json_encode([
        'posts' => $posts,
        'total' => $total,
        'limit' => $limit,
        'skip' => $skip
    ]);
} elseif ($requestMethod === 'POST' && $requestUri === '/posts') {
    $data = json_decode(file_get_contents('php://input'), true);
    $postId = $postController->createPost($data);
    echo json_encode(['id' => (string) $postId]);
} elseif (preg_match('/^\/posts\/([a-f\d]{24})$/', $requestUri, $matches)) {
    $postId = $matches[1];
    if ($requestMethod === 'GET') {
        $post = $postController->getPostById($postId);
        if ($post) {
            echo json_encode($post);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Post not found']);
        }
    } elseif ($requestMethod === 'PUT') {
        $data = json_decode(file_get_contents('php://input'), true);
        $updated = $postController->updatePost($postId, $data);
        if ($updated) {
            echo json_encode(['message' => 'Post updated successfully']);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Post not found']);
        }
    } elseif ($requestMethod === 'DELETE') {
        $deleted = $postController->deletePost($postId);
        if ($deleted) {
            echo json_encode(['message' => 'Post deleted successfully']);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Post not found']);
        }
    }
} elseif ($requestMethod === 'POST' && $requestUri === '/auth/register') {
    $data = json_decode(file_get_contents('php://input'), true);
    $result = $userController->register($data);
    if (isset($result['error'])) {
        http_response_code(400);
    }
    echo json_encode($result);
} elseif ($requestMethod === 'POST' && $requestUri === '/auth/login') {
    $data = json_decode(file_get_contents('php://input'), true);
    $result = $userController->login($data);
    if (isset($result['error'])) {
        http_response_code(401);
    }
    echo json_encode($result);
} elseif (preg_match('/^\/posts\/([a-f\d]{24})\/comments$/', $requestUri, $matches)) {
    $postId = $matches[1];
    if ($requestMethod === 'GET') {
        echo json_encode($commentController->getCommentsByPostId($postId));
    } elseif ($requestMethod === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        $data['postId'] = $postId;
        $commentId = $commentController->createComment($data);
        echo json_encode(['id' => (string) $commentId]);
    }
} elseif (preg_match('/^\/comments\/([a-f\d]{24})$/', $requestUri, $matches) && $requestMethod === 'DELETE') {
    $commentId = $matches[1];
    $deleted = $commentController->deleteComment($commentId);
    if ($deleted) {
        echo json_encode(['message' => 'Comment deleted successfully']);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Comment not found']);
    }
}
