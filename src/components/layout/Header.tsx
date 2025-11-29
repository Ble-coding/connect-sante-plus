
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, User, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logoPath = "/Tech Company Logo Emphasizing Health (5).png";

  return (
    <header className="sticky top-0 w-full bg-white/90 backdrop-blur-sm border-b z-50">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center">
            <img 
              src={logoPath} 
              alt="Pharma Africa Connect" 
              className="h-12 w-auto"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/about" className="text-sm font-medium hover:text-pharma-primary transition-colors">
            À propos
          </Link>
          <Link to="/how-it-works" className="text-sm font-medium hover:text-pharma-primary transition-colors">
            Comment ça marche
          </Link>
          <Link to="/pharmacy-search" className="text-sm font-medium hover:text-pharma-primary transition-colors">
            Trouver une pharmacie
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1 hover:text-pharma-primary">
                <span>Solutions</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link to="/for-patients" className="w-full">Pour les patients</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/for-doctors" className="w-full">Pour les médecins</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/for-pharmacies" className="w-full">Pour les pharmacies</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost">Connexion</Button>
          </Link>
          <Link to="/register">
            <Button className="bg-pharma-primary hover:bg-pharma-primary/90">Inscription</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 bg-white z-40 md:hidden">
          <nav className="container py-8 flex flex-col gap-4">
            <Link 
              to="/about" 
              className="p-2 text-lg hover:bg-pharma-light rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              À propos
            </Link>
            <Link 
              to="/how-it-works" 
              className="p-2 text-lg hover:bg-pharma-light rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Comment ça marche
            </Link>
            <Link 
              to="/pharmacy-search" 
              className="p-2 text-lg hover:bg-pharma-light rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Trouver une pharmacie
            </Link>
            <div className="bg-muted h-px my-2"></div>
            <p className="text-sm text-muted-foreground font-medium px-2">Solutions</p>
            <Link 
              to="/for-patients" 
              className="p-2 text-lg hover:bg-pharma-light rounded-md ml-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Pour les patients
            </Link>
            <Link 
              to="/for-doctors" 
              className="p-2 text-lg hover:bg-pharma-light rounded-md ml-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Pour les médecins
            </Link>
            <Link 
              to="/for-pharmacies" 
              className="p-2 text-lg hover:bg-pharma-light rounded-md ml-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Pour les pharmacies
            </Link>
            <div className="bg-muted h-px my-2"></div>
            <div className="flex flex-col gap-2">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full justify-start">
                  Connexion
                </Button>
              </Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full justify-start bg-pharma-primary hover:bg-pharma-primary/90">
                  Inscription
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
