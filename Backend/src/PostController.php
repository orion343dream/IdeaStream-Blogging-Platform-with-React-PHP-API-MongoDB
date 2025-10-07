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

    public function getAllPosts($limit = 10, $skip = 0)
    {
        $options = [
            'limit' => (int) $limit,
            'skip' => (int) $skip,
            'sort' => ['createdAt' => -1] // Most recent first
        ];

        $cursor = $this->collection->find([], $options);
        $posts = [];
        foreach ($cursor as $document) {
            $post = new Post();
            $post->id = (string) $document['_id'];
            $post->title = $document['title'];
            $post->content = $document['content'];
            $post->category = $document['category'] ?? '';
            $post->tags = $document['tags'] ?? [];
            $post->author = $document['author'];
            $post->commentsCount = $document['commentsCount'] ?? 0;
            $post->createdAt = $document['createdAt'];
            $posts[] = $post;
        }
        return $posts;
    }

    public function getPostsCount()
    {
        return $this->collection->countDocuments([]);
    }

    public function createPost($data)
    {
        $result = $this->collection->insertOne([
            'title' => $data['title'],
            'content' => $data['content'],
            'category' => $data['category'] ?? '',
            'tags' => $data['tags'] ?? [],
            'author' => $data['author'],
            'commentsCount' => 0,
            'createdAt' => new \MongoDB\BSON\UTCDateTime()
        ]);
        return $result->getInsertedId();
    }

    public function getPostById($id)
    {
        $document = $this->collection->findOne(['_id' => new \MongoDB\BSON\ObjectId($id)]);
        if ($document) {
            $post = new Post();
            $post->id = (string) $document['_id'];
            $post->title = $document['title'];
            $post->content = $document['content'];
            $post->category = $document['category'] ?? '';
            $post->tags = $document['tags'] ?? [];
            $post->author = $document['author'];
            $post->commentsCount = $document['commentsCount'] ?? 0;
            $post->createdAt = $document['createdAt'];
            return $post;
        }
        return null;
    }

    public function updatePost($id, $data)
    {
        $updateData = [];
        if (isset($data['title'])) $updateData['title'] = $data['title'];
        if (isset($data['content'])) $updateData['content'] = $data['content'];
        if (isset($data['category'])) $updateData['category'] = $data['category'];
        if (isset($data['tags'])) $updateData['tags'] = $data['tags'];

        $result = $this->collection->updateOne(
            ['_id' => new \MongoDB\BSON\ObjectId($id)],
            ['$set' => $updateData]
        );
        return $result->getModifiedCount() > 0;
    }

    public function deletePost($id)
    {
        $result = $this->collection->deleteOne(['_id' => new \MongoDB\BSON\ObjectId($id)]);
        return $result->getDeletedCount() > 0;
    }
}
