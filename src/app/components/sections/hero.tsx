'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown, Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import { scrollToSection } from '@/app/lib/scroll';
import { useReducedMotion, getAnimationVariants } from '@/app/lib/responsive';

const roles = [
  "AI/ML Developer",
  "Data Engineer", 
  "Full Stack Developer",
  "Problem Solver"
];

export default function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const animationVariants = getAnimationVariants(prefersReducedMotion);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, prefersReducedMotion ? 5000 : 3000); // Slower transitions for reduced motion
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 xl:w-72 xl:h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 xl:w-72 xl:h-72 bg-secondary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 xl:w-72 xl:h-72 bg-accent/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">            {/* Text Content */}
            <motion.div
              {...animationVariants}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.8, delay: prefersReducedMotion ? 0 : 0.2 }}
              className="space-y-4 sm:space-y-6 text-center lg:text-left order-2 lg:order-1"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-primary font-medium text-base sm:text-lg"
              >
                Hello! 👋
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
              >
                I&apos;m{' '}
                <span className="text-primary block sm:inline">
                  Ponnuri Aniruddha
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground h-8 sm:h-10 md:h-12 flex items-center justify-center lg:justify-start"
              >
                <span>An Aspiring </span>
                <motion.span
                  key={currentRole}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-primary ml-2 font-semibold"
                >
                  {roles[currentRole]}
                </motion.span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              >
                Passionate about creating innovative solutions using AI/ML technologies 
                and building scalable data engineering systems that make a difference.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start max-w-md mx-auto lg:mx-0 pt-4"
              >
                <Button
                  size="lg"
                  onClick={() => scrollToSection('projects')}
                  className="group w-full sm:w-auto text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4"
                >
                  View My Work
                  <ArrowDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.open('https://drive.google.com/file/d/1XKNU2ye7CswK6TDkh4Pyz9eh6Q4IPfwN/view?usp=sharing', '_blank')}
                  className="group w-full sm:w-auto text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4"
                >
                  <Download className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
                  Download Resume
                </Button>
              </motion.div>
            </motion.div>

            {/* Image/Visual Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative order-1 lg:order-2"
            >
              <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto">
                <motion.div
                  animate={{ 
                    rotate: 360,
                  }}
                  transition={{ 
                    duration: 20, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30"
                />
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  className="relative z-10 aspect-square rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 p-4 sm:p-6 md:p-8 backdrop-blur-sm border border-border/50"
                >
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-background to-muted flex items-center justify-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-primary">
                    A
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="cursor-pointer"
          onClick={() => scrollToSection('about')}
        >
          <ArrowDown className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground hover:text-primary transition-colors" />
        </motion.div>
      </motion.div>
    </section>
  );
}
