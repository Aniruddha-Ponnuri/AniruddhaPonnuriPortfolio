'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Mail, MapPin, User } from 'lucide-react';

const personalInfo = [
  { label: 'Name', value: 'Ponnuri Aniruddha', icon: User },
  { label: 'Date of Birth', value: 'June 13, 1997', icon: Calendar },
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
  return (
    <section id="about" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get to know more about who I am, what I do, and what motivates me
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image and Quick Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                className="aspect-square max-w-md mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-1"
              >
                <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center text-9xl font-bold text-primary">
                  AP
                </div>
              </motion.div>
            </div>

            <Card>
              <CardContent className="p-6 space-y-4">
                {personalInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.div
                      key={info.label}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <Icon className="h-5 w-5 text-primary" />
                      <div className="flex-1">
                        <span className="text-sm text-muted-foreground">{info.label}:</span>
                        <span className="ml-2 font-medium">{info.value}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Description and Interests */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Who I Am</h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
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

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">My Interests</h3>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest, index) => (
                  <motion.div
                    key={interest}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Badge variant="secondary" className="px-3 py-1">
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
              className="p-6 bg-primary/5 rounded-lg border border-primary/20"
            >
              <h4 className="font-semibold text-primary mb-2">Current Focus</h4>
              <p className="text-sm text-muted-foreground">
                Working on AI-driven personalized intervention strategies for tackling 
                child obesity and developing innovative data analysis solutions using 
                machine learning algorithms.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
