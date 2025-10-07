import {
      BrowserRouter as Router,
      Routes,
      Route,
    } from 'react-router-dom';
    import { ThemeProvider } from '@/components/theme-provider';
    import HomePage from '@/pages/HomePage';
    import PostPage from '@/pages/PostPage';
    import LoginPage from '@/pages/LoginPage';
    import RegisterPage from '@/pages/RegisterPage';
    import DashboardPage from '@/pages/DashboardPage';
    import AdminPage from '@/pages/AdminPage';
    import CreatePostPage from '@/pages/CreatePostPage';
    import EditPostPage from '@/pages/EditPostPage';
    import Layout from '@/components/Layout';

    function App() {
      return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/post/:id" element={<PostPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/dashboard/create" element={<CreatePostPage />} />
                <Route path="/dashboard/edit/:id" element={<EditPostPage />} />
                <Route path="/admin" element={<AdminPage />} />
              </Routes>
            </Layout>
          </Router>
        </ThemeProvider>
      );
    }

    export default App;
