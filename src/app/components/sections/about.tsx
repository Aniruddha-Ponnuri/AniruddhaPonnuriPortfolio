'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Mail, MapPin, User } from 'lucide-react';
import { useReducedMotion } from '@/app/lib/responsive';
import Image from 'next/image';
import profileImage from '@/app/images/bg_2.png';

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'aniruddha.ponnuri@gmail.com';
const locationLabel = process.env.NEXT_PUBLIC_LOCATION || 'Chennai, India';
const profileName = process.env.NEXT_PUBLIC_PROFILE_NAME || 'Ponnuri Aniruddha';

const personalInfo = [
  { label: 'Name', value: profileName, icon: User },
  { label: 'Date of Birth', value: 'June 13, 2003', icon: Calendar },
  { label: 'Email', value: contactEmail, icon: Mail },
  { label: 'Location', value: locationLabel, icon: MapPin },
];

const interests = [
  'Artificial Intelligence',
  'Machine Learning',
  'Data Engineering',
  'Deep Learning',
  'Cloud Computing',
  'Open Source',
];

export default function AboutSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="about" className="section-shell relative overflow-hidden bg-muted/35">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-1/4 top-1/4 h-44 w-44 rounded-full bg-primary/12 blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 h-44 w-44 rounded-full bg-secondary/14 blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.45 }}
          className="mb-16 text-center"
        >
          <h2 className="section-title mb-4 text-3xl font-semibold sm:text-4xl lg:text-5xl">About Me</h2>
          <p className="section-lead mx-auto text-base sm:text-lg lg:text-xl">
            Get to know more about who I am, what I do, and what motivates me.
          </p>
        </motion.div>

        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <motion.div
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.5 }}
              className="space-y-6 lg:space-y-8"
            >
              <div className="relative">
                <motion.div
                  whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                  transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                  className="surface-card mx-auto aspect-square max-w-xs overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-1 sm:max-w-sm md:max-w-md"
                >
                  <div className="relative h-full w-full overflow-hidden rounded-2xl bg-background">
                    <Image
                      src={profileImage}
                      alt={profileName}
                      fill
                      sizes="(max-width: 640px) 20rem, (max-width: 768px) 24rem, (max-width: 1024px) 28rem, 32rem"
                      className="object-cover"
                      priority
                    />
                  </div>
                </motion.div>
              </div>

              <Card className="mx-auto max-w-md">
                <CardContent className="space-y-3 p-4 sm:space-y-4 sm:p-6">
                  {personalInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <motion.div
                        key={info.label}
                        initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: prefersReducedMotion ? 0.01 : 0.3, delay: prefersReducedMotion ? 0 : index * 0.06 }}
                        className="flex items-center space-x-3"
                      >
                        <Icon className="h-4 w-4 flex-shrink-0 text-primary sm:h-5 sm:w-5" />
                        <div className="min-w-0 flex-1">
                          <span className="text-xs text-muted-foreground sm:text-sm">{info.label}:</span>
                          <span className="ml-2 break-words text-sm font-medium sm:text-base">{info.value}</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.5 }}
              className="space-y-6 lg:space-y-8"
            >
              <div className="space-y-4 lg:space-y-6">
                <h3 className="section-title text-xl font-semibold sm:text-2xl lg:text-3xl">Who I Am</h3>
                <div className="space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base lg:text-lg">
                  <p>
                    Dynamic and detail-oriented Computer Science Engineering student specializing in{' '}
                    <strong className="text-foreground">Artificial Intelligence and Data Analysis</strong>. I am
                    passionate about leveraging modern technologies to solve complex real-world problems.
                  </p>
                  <p>
                    I am currently pursuing my integrated M.Tech at SRM Institute of Science and Technology, Chennai,
                    with a strong focus on AI/ML, data engineering, and full-stack development.
                  </p>
                  <p>
                    My journey in technology is driven by curiosity and the desire to build systems that create real,
                    measurable impact.
                  </p>
                </div>
              </div>

              <div className="space-y-4 lg:space-y-6">
                <h3 className="section-title text-xl font-semibold sm:text-2xl lg:text-3xl">My Interests</h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {interests.map((interest, index) => (
                    <motion.div
                      key={interest}
                      initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: prefersReducedMotion ? 0.01 : 0.24, delay: prefersReducedMotion ? 0 : index * 0.04 }}
                    >
                      <Badge variant="secondary" className="px-2 py-1 text-xs sm:px-3 sm:text-sm">
                        {interest}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: prefersReducedMotion ? 0.01 : 0.4, delay: prefersReducedMotion ? 0 : 0.1 }}
                className="surface-card rounded-xl border border-primary/25 p-4 sm:p-6"
              >
                <h4 className="mb-2 text-sm font-semibold text-primary sm:text-base lg:text-lg">Current Focus</h4>
                <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm lg:text-base">
                  Working on AI-driven personalized intervention strategies for tackling child obesity and developing
                  robust data analysis solutions with machine learning algorithms.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
