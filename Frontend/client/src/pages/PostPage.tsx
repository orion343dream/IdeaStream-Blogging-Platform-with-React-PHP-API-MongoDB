import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
    import { Badge } from "@/components/ui/badge";
    import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
    import { Separator } from "@/components/ui/separator";
    import { Textarea } from "@/components/ui/textarea";
    import { Button } from "@/components/ui/button";
    import { User, Calendar } from "lucide-react";
    import { useParams } from "react-router-dom";

    const mockPost = {
      id: '1',
      title: 'Building a Decoupled Blog with React and a PHP API',
      body: 'Explore the architecture of modern web applications. This post dives deep into creating a headless setup with React on the frontend and a powerful PHP backend. We will cover everything from setting up your development environment to deploying a production-ready application. Key topics include API design, JWT authentication, state management in React, and creating a seamless user experience. Join us on this journey to master the decoupled architecture that powers many of today\'s most successful web platforms.',
      category: 'Technology',
      tags: ['PHP', 'React', 'MongoDB', 'JWT', 'API'],
      author: 'John Doe',
      createdAt: '2025-10-07T12:00:00Z',
    };

    const mockComments = [
      { id: 'c1', user: 'Alice', body: 'Great article! Very insightful.', createdAt: '2025-10-07T13:00:00Z' },
      { id: 'c2', user: 'Bob', body: 'I had a question about the JWT implementation. Can you elaborate on token refreshing?', createdAt: '2025-10-07T14:30:00Z' },
      { id: 'c3', user: 'Charlie', body: 'This is exactly what I was looking for to start my project. Thanks!', createdAt: '2025-10-08T09:00:00Z' },
    ];

    const PostPage = () => {
      const { id } = useParams();

      return (
        <div className="max-w-4xl mx-auto">
          <article className="space-y-6">
            <Badge variant="secondary" className="w-fit">{mockPost.category}</Badge>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{mockPost.title}</h1>
            <div className="flex items-center space-x-4 text-muted-foreground">
              <div className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                <span>{mockPost.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                <time dateTime={mockPost.createdAt}>
                  {new Date(mockPost.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {mockPost.tags.map(tag => <Badge key={tag} variant="outline">{tag}</Badge>)}
            </div>
            <Separator />
            <div className="prose dark:prose-invert max-w-none text-lg">
              <p>{mockPost.body}</p>
            </div>
          </article>

          <Separator className="my-12" />

          <section className="space-y-8">
            <h2 className="text-3xl font-bold">Comments ({mockComments.length})</h2>
            <Card>
              <CardHeader>
                <CardTitle>Leave a Comment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea placeholder="Write your comment here..." rows={4} />
                <Button>Post Comment</Button>
              </CardContent>
            </Card>
            <div className="space-y-6">
              {mockComments.map(comment => (
                <Card key={comment.id}>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={`https://api.dicebear.com/8.x/lorelei/svg?seed=${comment.user}`} />
                        <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{comment.user}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(comment.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{comment.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      );
    };

    export default PostPage;
