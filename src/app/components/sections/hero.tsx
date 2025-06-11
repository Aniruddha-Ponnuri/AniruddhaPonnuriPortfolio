'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="hero relative h-screen flex items-center">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="text-primary text-lg mb-4 block">Hello!</span>
          <h1 className="text-5xl font-bold mb-4">
            I&apos;m <span className="text-primary">Ponnuri Aniruddha</span>
          </h1>
          <h2 className="text-3xl mb-8">
            AI/ML Developer & Data Engineer
          </h2>
          <div className="flex gap-4 justify-center">
            <Button asChild>
              <a href="#resume">
                View Resume
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="#projects">
                See Projects
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
