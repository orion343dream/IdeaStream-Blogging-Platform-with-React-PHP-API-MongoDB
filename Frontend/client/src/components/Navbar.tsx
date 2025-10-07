import { Link } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
    import { Menu, PenSquare, Sun, Moon } from 'lucide-react';
    import { useTheme } from '@/components/theme-provider';

    const Navbar = () => {
      const { theme, setTheme } = useTheme();

      // A mock auth status. Replace with real auth context later.
      const isAuthenticated = false;
      const isAdmin = false;

      const navLinks = [
        { to: '/', label: 'Home' },
        isAuthenticated && { to: '/dashboard', label: 'Dashboard' },
        isAdmin && { to: '/admin', label: 'Admin' },
      ].filter(Boolean);

      return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <div className="mr-4 hidden md:flex">
              <Link to="/" className="mr-6 flex items-center space-x-2">
                <PenSquare className="h-6 w-6" />
                <span className="hidden font-bold sm:inline-block">IdeaStream</span>
              </Link>
              <nav className="flex items-center space-x-6 text-sm font-medium">
                {navLinks.map((link) => (
                  <Link
                    key={link!.to}
                    to={link!.to}
                    className="transition-colors hover:text-foreground/80 text-foreground/60"
                  >
                    {link!.label}
                  </Link>
                ))}
              </nav>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col space-y-4">
                  <Link to="/" className="mr-6 flex items-center space-x-2">
                     <PenSquare className="h-6 w-6" />
                     <span className="font-bold">IdeaStream</span>
                  </Link>
                  <nav className="flex flex-col space-y-2">
                    {navLinks.map((link) => (
                      <Link
                        key={link!.to}
                        to={link!.to}
                        className="transition-colors hover:text-foreground/80 text-foreground/60"
                      >
                        {link!.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>

            <div className="flex flex-1 items-center justify-end space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
              {isAuthenticated ? (
                <Button variant="outline">Logout</Button>
              ) : (
                <>
                  <Button asChild variant="ghost">
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/register">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </header>
      );
    };

    export default Navbar;
