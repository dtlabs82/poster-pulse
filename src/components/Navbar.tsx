
import React from "react";
import { Link } from "react-router-dom";
import { MoonIcon, SunIcon, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isDarkMode,
  toggleDarkMode,
  searchQuery,
  setSearchQuery,
}) => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-bold text-foreground"
        >
          <span className="text-primary">Poster</span>
          <span className="text-accent">Pulse</span>
        </Link>

        {/* Mobile menu button */}
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="md:hidden"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        )}

        {/* Desktop navigation */}
        <nav className={`hidden md:flex items-center gap-6`}>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search events..."
              className="w-64 pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="text-foreground"
          >
            {isDarkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
          </Button>
          <Button asChild variant="default">
            <Link to="/admin">Admin Dashboard</Link>
          </Button>
        </nav>

        {/* Mobile navigation */}
        {isMobile && isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-background border-b border-border animate-fade-in">
            <div className="container flex flex-col gap-4 p-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search events..."
                  className="w-full pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleDarkMode}
                  className="text-foreground"
                >
                  {isDarkMode ? (
                    <span className="flex items-center gap-2">
                      <SunIcon size={16} /> Light Mode
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <MoonIcon size={16} /> Dark Mode
                    </span>
                  )}
                </Button>
                <Button asChild variant="default" size="sm">
                  <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                    Admin Dashboard
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
