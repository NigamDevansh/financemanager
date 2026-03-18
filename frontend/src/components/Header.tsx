import { useState } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Home', to: '/home' },
        { name: 'About us', to: '/about' },
        { name: 'Contact us', to: '/contact' }
    ];

    return (
        <header className="border-b border-border bg-background/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <img src={assets.logo} alt="logo" className="h-10 w-10" />
                        <span className="text-lg font-bold text-foreground truncate">Finance Manager App</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link to={link.to} key={link.name} className="text-muted-foreground hover:text-primary transition-colors font-medium text-sm">
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Action Buttons & Hamburger Menu */}
                    <div className="flex items-center space-x-4">
                        <div className="hidden sm:flex items-center space-x-3">
                            <Button variant="ghost" asChild>
                                <Link to="/login">Login</Link>
                            </Button>
                            <Button asChild>
                                <Link to="/signup">Get Started</Link>
                            </Button>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="lg:hidden bg-background border-t border-border animate-in slide-in-from-top-2">
                    <div className="container mx-auto px-4 py-4">
                        <nav className="flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <Link key={link.name} to={link.to} className="text-muted-foreground hover:text-primary transition-colors font-medium">
                                    {link.name}
                                </Link>
                            ))}
                            <div className="flex flex-col space-y-3 pt-4 border-t border-border">
                                <Button variant="outline" className="w-full justify-center" asChild>
                                    <Link to="/login">Login</Link>
                                </Button>
                                <Button className="w-full justify-center" asChild>
                                    <Link to="/signup">Get Started</Link>
                                </Button>
                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
