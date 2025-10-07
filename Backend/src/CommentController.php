<?php

namespace IdeaStream\\Backend;

class CommentController
{
    private $collection;
    private $postCollection;

    public function __construct()
    {
        $db = Database::getInstance();
        $connection = $db->getConnection();
        $this->collection = $connection->selectCollection('ideastream', 'comments');
        $this->postCollection = $connection->selectCollection('ideastream', 'posts');
    }

    public function getCommentsByPostId($postId)
    {
        $cursor = $this->collection->find(['postId' => $postId]);
        $comments = [];
        foreach ($cursor as $document) {
            $comment = new Comment();
            $comment->id = (string) $document['_id'];
            $comment->postId = $document['postId'];
            $comment->author = $document['author'];
            $comment->content = $document['content'];
            $comment->createdAt = $document['createdAt'];
            $comments[] = $comment;
        }
        return $comments;
    }

    public function createComment($data)
    {
        $result = $this->collection->insertOne([
            'postId' => $data['postId'],
            'author' => $data['author'],
            'content' => $data['content'],
            'createdAt' => new \MongoDB\BSON\UTCDateTime()
        ]);

        // Update post's comment count
        $this->postCollection->updateOne(
            ['_id' => new \MongoDB\BSON\ObjectId($data['postId'])],
            ['$inc' => ['commentsCount' => 1]]
        );

        return $result->getInsertedId();
    }

    public function deleteComment($id)
    {
        $comment = $this->collection->findOne(['_id' => new \MongoDB\BSON\ObjectId($id)]);
        if ($comment) {
            $result = $this->collection->deleteOne(['_id' => new \MongoDB\BSON\ObjectId($id)]);
            if ($result->getDeletedCount() > 0) {
                // Decrease post's comment count
                $this->postCollection->updateOne(
                    ['_id' => new \MongoDB\BSON\ObjectId($comment['postId'])],
                    ['$inc' => ['commentsCount' => -1]]
                );
            }
            return $result->getDeletedCount() > 0;
        }
        return false;
    }
}