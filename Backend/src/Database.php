<?php

namespace IdeaStream\\Backend;

use MongoDB\\Client;
use MongoDB\\Driver\\ServerApi;

class Database
{
    private static $instance = null;
    private $client;

    private function __construct()
    {
        try {
            $uri = 'mongodb+srv://sandaruorion_db_adminIdeaStream:IdeaStreamorion@cluster0.auyh3l4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

            // Set the version of the Stable API on the client
            $apiVersion = new ServerApi(ServerApi::V1);

            // Create a new client and connect to the server
            $this->client = new Client($uri, [], ['serverApi' => $apiVersion]);

            // Send a ping to confirm a successful connection
            $this->client->selectDatabase('admin')->command(['ping' => 1]);
        } catch (Exception $e) {
            error_log("MongoDB connection failed: " . $e->getMessage());
            throw new Exception("Database connection failed: " . $e->getMessage());
        }
    }

    public static function getInstance()
    {
        if (self::$instance == null) {
            self::$instance = new Database();
        }

        return self::$instance;
    }

    public function getConnection()
    {
        return $this->client;
    }
}
