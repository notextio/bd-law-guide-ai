import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FileText, Home, LogIn, LogOut, MessageSquare, UserPlus, LayoutDashboard, Languages } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

export const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  
  useEffect(() => {
    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("লগআউট সফল (Logged out successfully)");
      navigate("/");
    } catch (error) {
      toast.error("লগআউট ব্যর্থ (Logout failed)");
    }
  };
  
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
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-primary-foreground hover:text-primary-foreground"
              title={language === 'en' ? 'Switch to Bangla' : 'Switch to English'}
            >
              <Languages className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">{language === 'en' ? 'বাংলা' : 'English'}</span>
            </Button>
            <Link to="/">
              <Button 
                variant={isActive("/") ? "secondary" : "ghost"} 
                size="sm"
                className="text-primary-foreground hover:text-primary-foreground"
              >
                <Home className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">{t('nav.home')}</span>
              </Button>
            </Link>
            {isAuthenticated && (
              <Link to="/dashboard">
                <Button 
                  variant={isActive("/dashboard") ? "secondary" : "ghost"} 
                  size="sm"
                  className="text-primary-foreground hover:text-primary-foreground"
                >
                  <LayoutDashboard className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">{t('nav.dashboard')}</span>
                </Button>
              </Link>
            )}
            <Link to="/consultation">
              <Button 
                variant={isActive("/consultation") ? "secondary" : "ghost"} 
                size="sm"
                className="text-primary-foreground hover:text-primary-foreground"
              >
                <MessageSquare className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">{t('nav.consultation')}</span>
              </Button>
            </Link>
            {!isAuthenticated ? (
              <>
                <Link to="/login">
                  <Button 
                    variant={isActive("/login") ? "secondary" : "ghost"} 
                    size="sm"
                    className="text-primary-foreground hover:text-primary-foreground"
                  >
                    <LogIn className="w-4 h-4 sm:mr-2" />
                    <span className="hidden sm:inline">{t('nav.login')}</span>
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button 
                    variant="official" 
                    size="sm"
                  >
                    <UserPlus className="w-4 h-4 sm:mr-2" />
                    <span className="hidden sm:inline">{t('nav.signup')}</span>
                  </Button>
                </Link>
              </>
            ) : (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleLogout}
                className="text-primary-foreground hover:text-primary-foreground"
              >
                <LogOut className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">{t('nav.logout')}</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
