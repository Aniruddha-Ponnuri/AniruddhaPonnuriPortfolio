'use client';

import { Navigation } from '@/app/components/layout/navigation';
import SkillsSection from '@/app/components/sections/skills';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/app/lib/responsive';

export default function SkillsPage() {
  const prefersReducedMotion = useReducedMotion();

  const pageVariants = {
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: 'easeOut'
      }
    },
    exit: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : -20,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.4
      }
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20"
    >
      <Navigation />
      
      <main className="pt-20">
        <SkillsSection />
      </main>
    </motion.div>
  );
}
