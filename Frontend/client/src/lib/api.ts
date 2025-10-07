import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:8000', // PHP backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Types
export interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  commentsCount: number;
  createdAt: string;
}

export interface PaginatedPostsResponse {
  posts: Post[];
  total: number;
  limit: number;
  skip: number;
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Mock data
const mockPosts: Post[] = [
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
  {
    id: '2',
    title: 'Getting Started with TypeScript',
    content: 'TypeScript adds static typing to JavaScript, making your code more robust and maintainable...',
    category: 'Programming',
    tags: ['TypeScript', 'JavaScript'],
    author: 'Jane Smith',
    commentsCount: 5,
    createdAt: '2025-10-06T10:00:00Z',
  },
];

const mockUser: User = {
  id: '1',
  username: 'testuser',
  email: 'test@example.com',
};

// API functions with mock data
export const postsApi = {
  getAll: async (params?: { limit?: number; skip?: number }): Promise<{ data: PaginatedPostsResponse }> => {
    const limit = params?.limit || 10;
    const skip = params?.skip || 0;
    const posts = mockPosts.slice(skip, skip + limit);
    return { data: { posts, total: mockPosts.length, limit, skip } };
  },
  getById: async (id: string): Promise<{ data: Post }> => {
    const post = mockPosts.find(p => p.id === id);
    if (!post) throw new Error('Post not found');
    return { data: post };
  },
  create: async (data: Omit<Post, 'id' | 'commentsCount' | 'createdAt'>): Promise<{ data: { id: string } }> => {
    const newPost: Post = {
      ...data,
      id: Date.now().toString(),
      commentsCount: 0,
      createdAt: new Date().toISOString(),
    };
    mockPosts.push(newPost);
    return { data: { id: newPost.id } };
  },
  update: async (id: string, data: Partial<Post>): Promise<{ data: any }> => {
    const index = mockPosts.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Post not found');
    mockPosts[index] = { ...mockPosts[index], ...data };
    return { data: { message: 'Post updated' } };
  },
  delete: async (id: string): Promise<{ data: any }> => {
    const index = mockPosts.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Post not found');
    mockPosts.splice(index, 1);
    return { data: { message: 'Post deleted' } };
  },
};

export const commentsApi = {
  getByPostId: async (postId: string): Promise<{ data: Comment[] }> => {
    // Mock comments
    return { data: [] };
  },
  create: async (data: { postId: string; author: string; content: string }): Promise<{ data: { id: string } }> => {
    return { data: { id: Date.now().toString() } };
  },
  delete: async (id: string): Promise<{ data: any }> => {
    return { data: { message: 'Comment deleted' } };
  },
};

export const authApi = {
  register: async (data: { username: string; email: string; password: string }): Promise<{ data: AuthResponse }> => {
    // Mock successful registration
    return { data: { token: 'mock-token', user: { ...mockUser, username: data.username, email: data.email } } };
  },
  login: async (data: { email: string; password: string }): Promise<{ data: AuthResponse }> => {
    // Mock successful login
    return { data: { token: 'mock-token', user: mockUser } };
  },
};

export default api;