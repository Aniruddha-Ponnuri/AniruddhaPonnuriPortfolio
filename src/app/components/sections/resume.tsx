'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Briefcase, GraduationCap, Download } from 'lucide-react';
import { useReducedMotion } from '@/app/lib/responsive';

const experiences = [
  {
    title: 'AI & Full Stack Research Intern',
    company: 'EDCULTS CONSULTING PRIVATE LIMITED',
    location: 'Remote',
    period: 'May 2024 — August 2024',
    description: 'Worked on Gen-AI projects, including development and fine-tuning of advanced models like GPT and LLaMA. Contributed to the design, development, and deployment of AI-driven applications for natural language processing, content generation, and automated decision-making.',
    technologies: ['LLM', 'Python', 'TensorFlow', 'Groq', 'OpenAI GPT'],
  },
  {
    title: 'Student Research',
    company: 'SRMIST',
    location: 'Chennai',
    period: '2021 — Present',
    description: 'Working on multiple research projects including AI-Driven Personalized Intervention Strategies for Tackling Child Obesity and Leaf Chart for Papaya Plant using KNN algorithm.',
    technologies: ['Flutter', 'KNN', 'Image Analysis', 'Mobile Development'],
  },
];

const education = [
  {
    degree: 'Master of Technology (M.Tech Integrated)',
    field: 'Computer Science and Engineering (Data Science)',
    institution: 'SRM Institute of Science and Technology',
    location: 'Chennai',
    period: '2021 — Present',
    grade: 'CGPA: 9.02',
    courses: ['Formal Language and Automata', 'Database Management Systems', 'Data Structures and Algorithms', 'Operating Systems', 'Big Data Tools and Techniques', 'Convolutional Neural Networks'],
  },
  {
    degree: 'Higher Secondary Education',
    field: 'Science (PCM)',
    institution: 'Modern Vidya Niketan',
    location: 'Faridabad',
    period: '2019 — 2021',
    grade: '94.6%',
    board: 'Central Board of Secondary Education (CBSE)',
  },
  {
    degree: 'Secondary Education',
    field: 'Science',
    institution: 'Modern School',
    location: 'Faridabad',
    period: 'Until 2019',
    grade: '96.4%',
    board: 'Central Board of Secondary Education (CBSE)',
  },
];

export default function ResumeSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="resume" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-fluid-4xl sm:text-fluid-5xl font-bold mb-4">Resume</h2>
          <p className="text-fluid-base sm:text-fluid-lg text-muted-foreground max-w-4xl mx-auto mb-6 leading-relaxed">
            Skilled in Python, C/C++, and advanced data analysis tools, aspiring to leverage 
            deep learning and AI competencies to solve complex challenges in technology-driven environments.
          </p>
          <Button
            onClick={() => window.open('https://drive.google.com/file/d/1XKNU2ye7CswK6TDkh4Pyz9eh6Q4IPfwN/view?usp=sharing', '_blank')}
            className="group interaction-enhanced text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4"
            size="lg"
          >
            <Download className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
            Download Full Resume
          </Button>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
            {/* Experience Section */}            <motion.div
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.6 }}
              className="@container"
            >
              <div className="flex items-center mb-6 lg:mb-8">
                <div className="p-2 sm:p-3 bg-primary rounded-lg mr-3 sm:mr-4">
                  <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold">Experience</h3>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader className="pb-3 sm:pb-4">
                        <CardTitle className="text-base sm:text-lg lg:text-xl">{exp.title}</CardTitle>
                        <div className="space-y-1">
                          <p className="text-primary font-medium text-sm sm:text-base">{exp.company}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground">{exp.location} • {exp.period}</p>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs sm:text-sm lg:text-base text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
                          {exp.description}
                        </p>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {exp.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs px-2 py-1">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>            {/* Education Section */}
            <motion.div
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.6 }}
            >
              <div className="flex items-center mb-6 lg:mb-8">
                <div className="p-2 sm:p-3 bg-secondary rounded-lg mr-3 sm:mr-4">
                  <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-secondary-foreground" />
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold">Education</h3>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader className="pb-3 sm:pb-4">
                        <CardTitle className="text-base sm:text-lg lg:text-xl">{edu.degree}</CardTitle>
                        <div className="space-y-1">
                          <p className="text-primary font-medium text-sm sm:text-base">{edu.field}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground">{edu.institution}, {edu.location}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground">{edu.period}</p>
                          <p className="text-xs sm:text-sm font-medium text-green-600">{edu.grade}</p>
                          {edu.board && (
                            <p className="text-xs text-muted-foreground">Board: {edu.board}</p>
                          )}
                        </div>
                      </CardHeader>
                      {edu.courses && (
                        <CardContent>
                          <p className="text-xs sm:text-sm lg:text-base font-medium mb-2">Key Courses:</p>
                          <div className="flex flex-wrap gap-1 sm:gap-2">
                            {edu.courses.map((course) => (
                              <Badge key={course} variant="outline" className="text-xs px-2 py-1">
                                {course}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
