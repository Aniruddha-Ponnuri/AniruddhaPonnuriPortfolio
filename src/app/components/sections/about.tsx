'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Mail, MapPin, User } from 'lucide-react';
import { useReducedMotion } from '@/app/lib/responsive';
import Image from 'next/image';
import profileImage from '@/app/images/bg_2.png';


const personalInfo = [
  { label: 'Name', value: 'Ponnuri Aniruddha', icon: User },
  { label: 'Date of Birth', value: 'June 13, 2003', icon: Calendar },
  { label: 'Email', value: 'aniruddha.ponnuri@gmail.com', icon: Mail },
  { label: 'Location', value: 'Chennai, India', icon: MapPin },
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
    <section id="about" className="py-20 bg-muted/50 relative overflow-hidden">
      {/* Additional background effects */}
      <div className="absolute inset-0 -z-5">
        <div className="absolute top-1/4 right-1/4 w-32 h-32 md:w-48 md:h-48 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
        <div className="absolute bottom-1/3 left-1/4 w-32 h-32 md:w-48 md:h-48 bg-secondary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">About Me</h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            Get to know more about who I am, what I do, and what motivates me
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            {/* Left Column - Image and Quick Info */}            <motion.div
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.6 }}
              className="space-y-6 lg:space-y-8"
            ><div className="relative">                <motion.div
                  whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  className="aspect-square max-w-xs sm:max-w-sm md:max-w-md mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-1 overflow-hidden"
                >
                  <div className="w-full h-full rounded-2xl bg-background overflow-hidden relative">
                    <Image
                      src={profileImage}
                      alt="Ponnuri Aniruddha"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </motion.div>
              </div>

              <Card className="mx-auto max-w-md">
                <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  {personalInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (                      <motion.div
                        key={info.label}
                        initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: prefersReducedMotion ? 0.01 : 0.5, 
                          delay: prefersReducedMotion ? 0 : index * 0.1 
                        }}
                        className="flex items-center space-x-3"
                      >
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <span className="text-xs sm:text-sm text-muted-foreground">{info.label}:</span>
                          <span className="ml-2 font-medium text-sm sm:text-base break-words">{info.value}</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </CardContent>
              </Card>
            </motion.div>

            {/* Right Column - Description and Interests */}            <motion.div
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.6 }}
              className="space-y-6 lg:space-y-8"
            >
              <div className="space-y-4 lg:space-y-6">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold">Who I Am</h3>
                <div className="space-y-4 text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Dynamic and detail-oriented Computer Science Engineering student 
                    specializing in <strong className="text-foreground">Artificial Intelligence and Data Analysis</strong>. 
                    I&apos;m passionate about leveraging cutting-edge technologies to solve 
                    complex real-world problems.
                  </p>
                  <p>
                    Currently pursuing my Bachelor&apos;s degree at SRM Institute of Science 
                    and Technology, Chennai, with a strong focus on AI/ML, data engineering, 
                    and full-stack development. I&apos;ve gained practical experience through 
                    internships and research projects.
                  </p>
                  <p>
                    My journey in technology is driven by curiosity and a desire to create 
                    innovative solutions that make a positive impact. I enjoy working on 
                    projects that challenge me to think creatively and push the boundaries 
                    of what&apos;s possible.
                  </p>
                </div>
              </div>

              <div className="space-y-4 lg:space-y-6">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold">My Interests</h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {interests.map((interest, index) => (                    <motion.div
                      key={interest}
                      initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: prefersReducedMotion ? 0.01 : 0.3, 
                        delay: prefersReducedMotion ? 0 : index * 0.1 
                      }}
                    >
                      <Badge variant="secondary" className="px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm">
                        {interest}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="p-4 sm:p-6 bg-primary/5 rounded-lg border border-primary/20"
              >
                <h4 className="font-semibold text-primary mb-2 text-sm sm:text-base lg:text-lg">Current Focus</h4>
                <p className="text-xs sm:text-sm lg:text-base text-muted-foreground leading-relaxed">
                  Working on AI-driven personalized intervention strategies for tackling 
                  child obesity and developing innovative data analysis solutions using 
                  machine learning algorithms.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
