'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown, Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import { scrollToSection } from '@/app/lib/scroll';
import { useReducedMotion, getAnimationVariants } from '@/app/lib/responsive';
import Image from 'next/image';
import profileImage from '@/app/images/bg_2.png';

const roles = ['AI/ML Developer', 'Data Engineer', 'Problem Solver'];

// Resume URL - configure via environment variable for easy updates
const RESUME_URL =
  process.env.RESUME_URL ;

export default function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const animationVariants = getAnimationVariants(prefersReducedMotion);
  const profileName = process.env.PROFILE_NAME || 'Ponnuri Aniruddha';

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, prefersReducedMotion ? 5000 : 2800);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <section id="home" className="section-shell relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,color-mix(in_oklch,var(--primary)_24%,transparent),transparent_45%),radial-gradient(circle_at_85%_15%,color-mix(in_oklch,var(--accent)_28%,transparent),transparent_42%),radial-gradient(circle_at_48%_88%,color-mix(in_oklch,var(--secondary)_24%,transparent),transparent_46%)]" />
        <div className="absolute left-[8%] top-[18%] h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-[10%] top-[10%] h-64 w-64 rounded-full bg-accent/15 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 xl:gap-20">
          <motion.div
            {...animationVariants}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 0.72,
              delay: prefersReducedMotion ? 0 : 0.15,
              ease: [0.23, 1, 0.32, 1],
            }}
            className="space-y-6 text-center lg:text-left"
          >


            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="section-title text-4xl font-semibold leading-[1.03] sm:text-5xl md:text-6xl lg:text-7xl"
            >
              I&apos;m{' '}
              <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                {profileName}
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.36, delay: 0.38, ease: [0.23, 1, 0.32, 1] }}
              className="flex h-11 items-center justify-center text-lg text-muted-foreground sm:text-xl md:h-12 md:text-2xl lg:justify-start"
            >
              <span>An Aspiring</span>
              <motion.span
                key={currentRole}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
                className="ml-2 font-semibold text-primary"
              >
                {roles[currentRole]}
              </motion.span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.46, ease: [0.23, 1, 0.32, 1] }}
              className="section-lead mx-auto max-w-2xl text-base leading-relaxed sm:text-lg lg:mx-0"
            >
              Passionate about creating innovative solutions using AI/ML technologies and building scalable
              data engineering systems that make a measurable difference.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: 0.54, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col justify-center gap-3 pt-2 sm:flex-row lg:justify-start"
            >
              <Button
                size="lg"
                onClick={() => scrollToSection('projects')}
                className="interaction-enhanced group w-full sm:w-auto"
              >
                View My Work
                <ArrowDown className="ml-2 h-4 w-4 transition-transform duration-150 group-hover:translate-y-1" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => window.open(RESUME_URL, '_blank')}
                className="interaction-enhanced group w-full sm:w-auto"
              >
                <Download className="mr-2 h-4 w-4 transition-transform duration-150 group-hover:translate-y-1" />
                Download Resume
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 0.68,
              delay: prefersReducedMotion ? 0 : 0.25,
              ease: [0.23, 1, 0.32, 1],
            }}
            className="relative mx-auto"
          >
            <div className="relative h-72 w-72 sm:h-80 sm:w-80 md:h-96 md:w-96">
              <motion.div
                animate={prefersReducedMotion ? {} : { rotate: 360 }}
                transition={prefersReducedMotion ? {} : { duration: 22, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-dashed border-primary/35"
              />

              <motion.div
                whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
                transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                className="surface-card relative z-10 aspect-square rounded-full border border-border/60 bg-gradient-to-br from-primary/18 via-secondary/15 to-accent/14 p-4 backdrop-blur-md sm:p-6 md:p-8"
              >
                <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-background via-background to-muted">
                  <Image
                    src={profileImage}
                    alt="Ponnuri Aniruddha - Profile Picture"
                    fill
                    sizes="(max-width: 640px) 18rem, (max-width: 768px) 20rem, 24rem"
                    className="rounded-full object-cover"
                    priority
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, delay: 0.95 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.9, repeat: Infinity }}
          className="cursor-pointer"
          onClick={() => scrollToSection('about')}
        >
          <ArrowDown className="h-6 w-6 text-muted-foreground transition-colors duration-150 hover:text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}
