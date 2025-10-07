<?php

namespace IdeaStream\\Backend;

use MongoDB\\Client;

class Database
{
    private static $instance = null;
    private $client;

    private function __construct()
    {
        $this->client = new Client("mongodb://localhost:27017");
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
