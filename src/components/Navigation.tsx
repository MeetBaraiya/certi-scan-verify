import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Home, Upload, Search, Settings } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="border-b bg-card shadow-card">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Shield className="h-6 w-6 text-primary" />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Authenticity Validator
            </span>
          </Link>
          
          <div className="flex items-center gap-2">
            <Button
              asChild
              variant={isActive("/") ? "default" : "ghost"}
              size="sm"
            >
              <Link to="/">
                <Home className="h-4 w-4" />
                Home
              </Link>
            </Button>
            
            <Button
              asChild
              variant={isActive("/upload") ? "default" : "ghost"}
              size="sm"
            >
              <Link to="/upload">
                <Upload className="h-4 w-4" />
                Upload
              </Link>
            </Button>
            
            <Button
              asChild
              variant={isActive("/verify") ? "default" : "ghost"}
              size="sm"
            >
              <Link to="/verify">
                <Search className="h-4 w-4" />
                Verify ID
              </Link>
            </Button>
            
            <Button
              asChild
              variant={isActive("/admin") ? "default" : "ghost"}
              size="sm"
            >
              <Link to="/admin">
                <Settings className="h-4 w-4" />
                Admin
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;