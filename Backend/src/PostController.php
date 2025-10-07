<?php

namespace IdeaStream\\Backend;

use IdeaStream\\Backend\\Database;

class PostController
{
    private $collection;

    public function __construct()
    {
        $db = Database::getInstance();
        $connection = $db->getConnection();
        $this->collection = $connection->selectCollection('ideastream', 'posts');
    }

    public function getAllPosts()
    {
        $cursor = $this->collection->find([]);
        $posts = [];
        foreach ($cursor as $document) {
            $post = new Post();
            $post->id = (string) $document['_id'];
            $post->title = $document['title'];
            $post->content = $document['content'];
            $post->author = $document['author'];
            $post->createdAt = $document['createdAt'];
            $posts[] = $post;
        }
        return $posts;
    }

    public function createPost($data)
    {
        $result = $this->collection->insertOne([
            'title' => $data['title'],
            'content' => $data['content'],
            'author' => $data['author'],
            'createdAt' => new \MongoDB\BSON\UTCDateTime()
        ]);
        return $result->getInsertedId();
    }
}
