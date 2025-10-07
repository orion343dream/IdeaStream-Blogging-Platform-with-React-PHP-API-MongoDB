<?php

namespace IdeaStream\\Backend;

use MongoDB\\Client;

class UserController
{
    private $collection;

    public function __construct()
    {
        $db = Database::getInstance();
        $connection = $db->getConnection();
        $this->collection = $connection->selectCollection('ideastream', 'users');
    }

    public function register($data)
    {
        // Check if user already exists
        $existingUser = $this->collection->findOne(['email' => $data['email']]);
        if ($existingUser) {
            return ['error' => 'User already exists'];
        }

        $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);

        $result = $this->collection->insertOne([
            'username' => $data['username'],
            'email' => $data['email'],
            'password' => $hashedPassword,
            'createdAt' => new \MongoDB\BSON\UTCDateTime()
        ]);

        return ['id' => (string) $result->getInsertedId()];
    }

    public function login($data)
    {
        $user = $this->collection->findOne(['email' => $data['email']]);
        if ($user && password_verify($data['password'], $user['password'])) {
            // Simple token generation (in production, use JWT)
            $token = base64_encode($user['_id'] . ':' . time());
            return [
                'token' => $token,
                'user' => [
                    'id' => (string) $user['_id'],
                    'username' => $user['username'],
                    'email' => $user['email']
                ]
            ];
        }
        return ['error' => 'Invalid credentials'];
    }

    public function getUserById($id)
    {
        $user = $this->collection->findOne(['_id' => new \MongoDB\BSON\ObjectId($id)]);
        if ($user) {
            return [
                'id' => (string) $user['_id'],
                'username' => $user['username'],
                'email' => $user['email']
            ];
        }
        return null;
    }
}