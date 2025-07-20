import { useState } from 'react';
import { Menu, X, Book, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Book className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">Passion Academia</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-foreground hover:text-primary transition-colors">Home</a>
            <a href="#classes" className="text-foreground hover:text-primary transition-colors">Classes</a>
            <a href="#topics" className="text-foreground hover:text-primary transition-colors">Topics</a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
          </nav>

          {/* Login Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <a href="#home" className="text-foreground hover:text-primary transition-colors">Home</a>
              <a href="#classes" className="text-foreground hover:text-primary transition-colors">Classes</a>
              <a href="#topics" className="text-foreground hover:text-primary transition-colors">Topics</a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
              <Button variant="outline" size="sm" className="self-start">
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;