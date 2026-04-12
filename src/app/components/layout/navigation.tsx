'use client';

import Link from 'next/link';
import Image from 'next/image';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { scrollToSection } from '@/app/lib/scroll';
import { Menu, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import profileImage from '@/app/images/iamge.webp';

export function Navigation() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Resume', href: '#resume' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    setMounted(true);
    
    // Scroll progress tracker
    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    // Intersection Observer for active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-20% 0px -20% 0px',
      }
    );

    const sections = ['home', 'about', 'resume', 'skills', 'projects', 'contact'];
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    // Add scroll event listener
    window.addEventListener('scroll', updateScrollProgress);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, []);

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    const targetId = href.substring(1);
    scrollToSection(targetId);
    setActiveSection(targetId);
    setIsMobileMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const isDarkTheme = resolvedTheme === 'dark';

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/55">
      {/* Progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-primary via-primary/80 to-secondary transition-[width] duration-150 ease-[var(--ease-out)]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
      />
      
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0"
          >
            <Link 
              href="#home" 
              onClick={(e) => handleNavClick('#home', e)}
              className="flex items-center space-x-2"
            >
              <div className="relative h-9 w-9 overflow-hidden rounded-full border border-primary/35 shadow-[0_10px_24px_color-mix(in_oklch,var(--primary)_30%,transparent)] transition-[transform,border-color] duration-180 ease-[var(--ease-out)] hover:scale-[1.04] hover:border-primary/60">
                <Image
                  src={profileImage}
                  alt="Ponnuri Aniruddha"
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              </div>
              <span className="hidden font-semibold tracking-tight text-foreground sm:block">Aniruddha</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="space-x-1">
              {navItems.map((item, index) => (
                <NavigationMenuItem key={item.name}>
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <NavigationMenuLink asChild>
                      <Link 
                        href={item.href} 
                        onClick={(e) => handleNavClick(item.href, e)}
                        className={cn(
                          "relative rounded-md px-3 py-2 text-sm font-medium transition-[color] duration-150 ease-[var(--ease-out)]",
                          activeSection === item.href.substring(1) 
                            ? "text-foreground" 
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {item.name}
                        {activeSection === item.href.substring(1) && (
                          <motion.div
                            layoutId="activeSection"
                            className="absolute -bottom-[7px] left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-primary via-primary to-secondary"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                      </Link>
                    </NavigationMenuLink>
                  </motion.div>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="h-9 w-9 rounded-full border border-border/70 p-0"
                aria-label="Toggle theme"
              >
                {isDarkTheme ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
            )}

            {/* Mobile Menu Toggle */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 rounded-full border border-border/70 p-0 md:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64 p-0">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between border-b border-border/70 p-4">
                    <div className="flex items-center space-x-2">
                      <div className="relative w-6 h-6 rounded-full overflow-hidden border border-primary/20">
                        <Image
                          src={profileImage}
                          alt="Ponnuri Aniruddha"
                          fill
                          className="object-cover"
                          sizes="24px"
                        />
                      </div>
                      <span className="text-lg font-semibold">Menu</span>
                    </div>
                  </div>
                  <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                      {navItems.map((item, index) => (
                        <motion.li
                          key={item.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Link
                            href={item.href}
                            onClick={(e) => handleNavClick(item.href, e)}
                            className={cn(
                              "block rounded-md px-3 py-2 text-base font-medium transition-[background-color,color,transform] duration-150 ease-[var(--ease-out)] active:scale-[0.98]",
                              activeSection === item.href.substring(1)
                                ? "bg-primary/12 text-primary"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                            )}
                          >
                            {item.name}
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
