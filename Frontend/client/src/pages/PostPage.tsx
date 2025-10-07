import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { User, Calendar, MessageCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import { postsApi, commentsApi, Post, Comment } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPostAndComments = async () => {
      if (!id) return;

      try {
        const [postResponse, commentsResponse] = await Promise.all([
          postsApi.getById(id),
          commentsApi.getByPostId(id)
        ]);

        setPost(postResponse.data);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error('Error fetching post:', error);
        toast({
          title: "Error",
          description: "Failed to load post. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndComments();
  }, [id, toast]);

  const handleSubmitComment = async () => {
    if (!commentText.trim() || !post) return;

    setSubmittingComment(true);
    try {
      // Get current user from localStorage
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      await commentsApi.create({
        postId: post.id,
        author: user.username || 'Anonymous',
        content: commentText.trim(),
      });

      // Refresh comments
      const commentsResponse = await commentsApi.getByPostId(post.id);
      setComments(commentsResponse.data);

      setCommentText("");
      toast({
        title: "Success",
        description: "Comment posted successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post comment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-6 w-64" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-2xl font-bold">Post not found</h1>
        <p className="text-muted-foreground mt-2">The post you're looking for doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <article className="space-y-6">
        <Badge variant="secondary" className="w-fit bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          {post.category}
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {post.title}
        </h1>
        <div className="flex items-center space-x-4 text-muted-foreground">
          <div className="flex items-center">
            <User className="mr-2 h-5 w-5" />
            <span className="font-medium">{post.author}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            <time dateTime={post.createdAt}>
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
          <div className="flex items-center">
            <MessageCircle className="mr-2 h-5 w-5" />
            <span>{post.commentsCount} comments</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <Badge key={tag} variant="outline" className="hover:bg-blue-50 dark:hover:bg-blue-950">
              {tag}
            </Badge>
          ))}
        </div>
        <Separator />
        <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed">
          <p className="whitespace-pre-wrap">{post.content}</p>
        </div>
      </article>

      <Separator className="my-12" />

      <section className="space-y-8">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <MessageCircle className="h-8 w-8" />
          Comments ({comments.length})
        </h2>

        <Card className="border-2">
          <CardHeader>
            <CardTitle>Leave a Comment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Share your thoughts..."
              rows={4}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="resize-none"
            />
            <Button
              onClick={handleSubmitComment}
              disabled={!commentText.trim() || submittingComment}
            >
              {submittingComment ? "Posting..." : "Post Comment"}
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {comments.map(comment => (
            <Card key={comment.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={`https://api.dicebear.com/8.x/lorelei/svg?seed=${comment.author}`} />
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {comment.author.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{comment.author}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(comment.createdAt).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed">{comment.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

    export default PostPage;
