import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { FileText, Home, LogIn, MessageSquare, UserPlus } from "lucide-react";

export const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-accent shadow-elevated">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <span className="font-bold text-primary-foreground hidden sm:block">Tax BD</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button 
                variant={isActive("/") ? "secondary" : "ghost"} 
                size="sm"
                className="text-primary-foreground hover:text-primary-foreground"
              >
                <Home className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">হোম</span>
              </Button>
            </Link>
            <Link to="/consultation">
              <Button 
                variant={isActive("/consultation") ? "secondary" : "ghost"} 
                size="sm"
                className="text-primary-foreground hover:text-primary-foreground"
              >
                <MessageSquare className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">পরামর্শ</span>
              </Button>
            </Link>
            <Link to="/login">
              <Button 
                variant={isActive("/login") ? "secondary" : "ghost"} 
                size="sm"
                className="text-primary-foreground hover:text-primary-foreground"
              >
                <LogIn className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">লগইন</span>
              </Button>
            </Link>
            <Link to="/signup">
              <Button 
                variant="official" 
                size="sm"
              >
                <UserPlus className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">নিবন্ধন</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
