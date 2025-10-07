import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
    import { Badge } from "@/components/ui/badge";
    import { Button } from "@/components/ui/button";
    import { Link } from "react-router-dom";
    import { ArrowRight, MessageCircle, User } from "lucide-react";

    const mockPosts = [
      {
        id: '1',
        title: 'Building a Decoupled Blog with React and a PHP API',
        body: 'Explore the architecture of modern web applications. This post dives deep into creating a headless setup with React on the frontend and a powerful PHP backend...',
        category: 'Technology',
        tags: ['PHP', 'React', 'MongoDB'],
        author: 'John Doe',
        commentsCount: 12,
        createdAt: '2025-10-07T12:00:00Z',
      },
      {
        id: '2',
        title: 'Advanced State Management in React',
        body: 'Tired of prop drilling? Learn about advanced state management solutions like Redux Toolkit, Zustand, and how React Context can be leveraged for global state...',
        category: 'Web Development',
        tags: ['React', 'State Management', 'Zustand'],
        author: 'Jane Smith',
        commentsCount: 8,
        createdAt: '2025-10-06T10:30:00Z',
      },
      {
        id: '3',
        title: 'A Guide to REST API Design with PHP',
        body: 'Learn the best practices for designing clean, scalable, and secure RESTful APIs using PHP. We cover routing, authentication with JWT, and data validation...',
        category: 'Backend',
        tags: ['PHP', 'API', 'Security'],
        author: 'Admin',
        commentsCount: 23,
        createdAt: '2025-10-05T18:45:00Z',
      },
    ];

    const HomePage = () => {
      return (
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">Welcome to IdeaStream</h1>
            <p className="mt-4 text-lg text-muted-foreground">Your daily dose of insights and ideas from the world of tech and beyond.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {mockPosts.map((post) => (
              <Card key={post.id} className="flex flex-col">
                <CardHeader>
                  <Badge variant="secondary" className="w-fit mb-2">{post.category}</Badge>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground line-clamp-3">{post.body}</p>
                </CardContent>
                <CardFooter className="flex flex-col items-start space-y-4">
                   <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <User className="mr-1 h-4 w-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="mr-1 h-4 w-4" />
                        {post.commentsCount} Comments
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => <Badge key={tag} variant="outline">{tag}</Badge>)}
                    </div>
                  <Button asChild className="w-full mt-4">
                    <Link to={`/post/${post.id}`}>
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      );
    };

    export default HomePage;
