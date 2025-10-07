import React from 'react';
    import Navbar from './Navbar';
    import { Toaster } from '@/components/ui/toaster';

    const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
      return (
        <div className="min-h-screen bg-background font-sans antialiased">
          <Navbar />
          <main className="container mx-auto px-4 py-8">{children}</main>
          <Toaster />
        </div>
      );
    };

    export default Layout;
