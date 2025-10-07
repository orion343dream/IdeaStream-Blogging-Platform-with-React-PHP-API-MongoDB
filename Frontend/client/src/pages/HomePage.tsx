import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, User, TrendingUp, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { postsApi, Post } from "@/lib/api";
import { Input } from "@/components/ui/input";

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const postsPerPage = 9;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const skip = (currentPage - 1) * postsPerPage;
        const response = await postsApi.getAll({ limit: postsPerPage, skip });
        setPosts(response.data.posts);
        setTotalPosts(response.data.total);
      } catch (error) {
        console.error('Error fetching posts:', error);
        // Fallback to mock data if API fails
        setPosts([
          {
            id: '1',
            title: 'Building a Decoupled Blog with React and a PHP API',
            content: 'Explore the architecture of modern web applications. This post dives deep into creating a headless setup with React on the frontend and a powerful PHP backend...',
            category: 'Technology',
            tags: ['PHP', 'React', 'MongoDB'],
            author: 'John Doe',
            commentsCount: 12,
            createdAt: '2025-10-07T12:00:00Z',
          },
        ]);
        setTotalPosts(1);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <Skeleton className="h-12 w-96 mx-auto mb-4" />
          <Skeleton className="h-6 w-128 mx-auto" />
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="flex flex-col">
              <CardHeader>
                <Skeleton className="h-6 w-24 mb-2" />
                <Skeleton className="h-8 w-full" />
              </CardHeader>
              <CardContent className="flex-grow">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-2xl p-12">
        <TrendingUp className="mx-auto h-16 w-16 text-blue-600 mb-6" />
        <h1 className="text-5xl font-bold tracking-tight lg:text-6xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome to IdeaStream
        </h1>
        <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
          Your daily dose of insights and ideas from the world of tech and beyond.
          Discover, learn, and share knowledge with our community.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search posts, categories, or tags..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Posts Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="flex flex-col hover:shadow-lg transition-shadow duration-300 border-2 hover:border-blue-200 dark:hover:border-blue-800">
            <CardHeader>
              <Badge variant="secondary" className="w-fit mb-3 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {post.category}
              </Badge>
              <CardTitle className="text-xl line-clamp-2 hover:text-blue-600 transition-colors">
                {post.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                {post.content}
              </p>
            </CardContent>
            <CardFooter className="flex flex-col items-start space-y-4">
              <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex items-center">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {post.commentsCount}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Button asChild className="w-full">
                <Link to={`/post/${post.id}`}>
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No posts found matching your search.</p>
        </div>
      )}

      {/* Pagination */}
      {!searchTerm && totalPosts > postsPerPage && (
        <div className="flex justify-center items-center space-x-2 mt-12">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          <div className="flex space-x-1">
            {Array.from({ length: Math.ceil(totalPosts / postsPerPage) }, (_, i) => i + 1)
              .filter(page => {
                const totalPages = Math.ceil(totalPosts / postsPerPage);
                return page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1;
              })
              .map((page, index, array) => (
                <div key={page} className="flex items-center">
                  {index > 0 && array[index - 1] !== page - 1 && (
                    <span className="px-2 text-muted-foreground">...</span>
                  )}
                  <Button
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-10 h-10"
                  >
                    {page}
                  </Button>
                </div>
              ))}
          </div>

          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.min(Math.ceil(totalPosts / postsPerPage), prev + 1))}
            disabled={currentPage === Math.ceil(totalPosts / postsPerPage)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

    export default HomePage;
