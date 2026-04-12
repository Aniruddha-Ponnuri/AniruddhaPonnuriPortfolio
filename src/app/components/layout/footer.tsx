'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail } from 'lucide-react';

const socialLinks = [
  {
    name: 'GitHub',
    href: process.env.NEXT_PUBLIC_GITHUB_PROFILE_URL || 'https://github.com/Aniruddha-Ponnuri',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    href: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/in/ponnuri-aniruddha-129991249/',
    icon: Linkedin,
  },
  {
    name: 'Instagram',
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/aniruddhaponnuri/',
    icon: Instagram,
  },
  {
    name: 'Email',
    href: `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'aniruddha.ponnuri@gmail.com'}`,
    icon: Mail,
  },
];

export default function Footer() {
  const profileName = process.env.NEXT_PUBLIC_PROFILE_NAME || 'Ponnuri Aniruddha';

  return (
    <footer className="relative overflow-hidden border-t border-border/70 bg-background/80">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,color-mix(in_oklch,var(--secondary)_24%,transparent),transparent_45%),radial-gradient(circle_at_85%_0%,color-mix(in_oklch,var(--accent)_18%,transparent),transparent_40%)]" />
      <div className="container mx-auto px-4 py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.42, ease: [0.23, 1, 0.32, 1] }}
          className="text-center space-y-8"
        >
          {/* Logo */}
          <div className="section-title text-2xl font-semibold tracking-tight text-foreground">
            {profileName}
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
                  className="surface-card rounded-full p-3 transition-[transform,color] duration-160 ease-[var(--ease-out)] hover:text-primary"
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{link.name}</span>
                </motion.a>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()} {profileName}. Built with care and curiosity.</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
