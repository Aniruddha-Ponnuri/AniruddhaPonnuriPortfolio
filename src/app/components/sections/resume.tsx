'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Briefcase, GraduationCap, Download } from 'lucide-react';
import { useReducedMotion } from '@/app/lib/responsive';

const experiences = [
  {
    title: 'Machine Learning Intern',
    company: 'SEAGATE TECHNOLOGY',
    location: 'Pune, India',
    period: 'July 2025 - Present',
    description:
      'Developed and deployed 6+ organizational AI copilots using multi-agent orchestration with LangChain, enabling autonomous task execution and contextual reasoning across enterprise workflows. Designed a feedback microservice and closed-loop evaluation pipeline to capture and analyze user feedback. Engineered a high-throughput authentication middleware validating JWT and custom Argon2ID tokens, handling 10K+ requests per minute with in-memory caching to reduce latency and improve reliability. Constructed feature engineering and model evaluation pipelines for RMA fraud detection, benchmarking traditional ML models against GenAI-based approaches for anomaly detection.',
    technologies: ['LangChain', 'Multi-Agent Orchestration', 'JWT', 'Argon2ID', 'GenAI', 'Feature Engineering', 'Model Evaluation', 'Python'],
  },
  {
    title: 'AI and Full Stack Research Intern',
    company: 'EDCULTS CONSULTING PRIVATE LIMITED',
    location: 'Remote, India',
    period: 'June 2024 - March 2025',
    description:
      'Fine-tuned Large Language Models (GPT-3.5, LLaMA) for NLP tasks including classification, summarization, and retrieval, achieving over 96% F1-score performance. Implemented data processing pipelines and model inference APIs, enabling scalable machine learning applications.',
    technologies: ['GPT-3.5', 'LLaMA', 'NLP', 'Fine-Tuning', 'Python', 'FastAPI', 'Model Inference'],
  },
];

const education = [
  {
    degree: 'Master of Technology (M.Tech Integrated)',
    field: 'Computer Science and Engineering (Data Science)',
    institution: 'SRM Institute of Science and Technology',
    location: 'Chennai',
    period: '2021 - Present',
    grade: 'CGPA: 9.02',
    courses: [
      'Formal Language and Automata',
      'Database Management Systems',
      'Data Structures and Algorithms',
      'Operating Systems',
      'Big Data Tools and Techniques',
      'Convolutional Neural Networks',
    ],
  },
  {
    degree: 'Higher Secondary Education',
    field: 'Science (PCM)',
    institution: 'Modern Vidya Niketan',
    location: 'Faridabad',
    period: '2019 - 2021',
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

const RESUME_URL =
  process.env.NEXT_PUBLIC_RESUME_URL ||
  process.env.PUBLIC_RESUME_URL ||
  'https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=drivesdk';

export default function ResumeSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="resume" className="section-shell">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.46 }}
          className="mb-16 text-center"
        >
          <h2 className="section-title mb-4 text-fluid-4xl font-semibold sm:text-fluid-5xl">Resume</h2>
          <p className="section-lead mx-auto mb-6 text-fluid-base leading-relaxed sm:text-fluid-lg">
            Skilled in Python, C/C++, and advanced data analysis tools, aspiring to leverage deep learning and AI
            competencies to solve complex challenges in technology-driven environments.
          </p>
          <Button
            onClick={() => window.open(RESUME_URL, '_blank')}
            className="interaction-enhanced group px-7"
            size="lg"
          >
            <Download className="mr-2 h-4 w-4 transition-transform duration-150 group-hover:translate-y-0.5" />
            Download Full Resume
          </Button>
        </motion.div>

        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <motion.div
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.5 }}
              className="@container"
            >
              <div className="mb-6 flex items-center lg:mb-8">
                <div className="mr-3 rounded-lg bg-primary p-2 sm:mr-4 sm:p-3">
                  <Briefcase className="h-5 w-5 text-primary-foreground sm:h-6 sm:w-6" />
                </div>
                <h3 className="section-title text-xl font-semibold sm:text-2xl lg:text-3xl">Experience</h3>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: prefersReducedMotion ? 0.01 : 0.4, delay: prefersReducedMotion ? 0 : index * 0.08 }}
                  >
                    <Card className="hover:-translate-y-0.5 hover:shadow-xl">
                      <CardHeader className="pb-3 sm:pb-4">
                        <CardTitle className="text-base sm:text-lg lg:text-xl">{exp.title}</CardTitle>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-primary sm:text-base">{exp.company}</p>
                          <p className="text-xs text-muted-foreground sm:text-sm">
                            {exp.location} • {exp.period}
                          </p>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-3 text-xs leading-relaxed text-muted-foreground sm:mb-4 sm:text-sm lg:text-base">
                          {exp.description}
                        </p>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {exp.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary" className="px-2 py-1 text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.5 }}
            >
              <div className="mb-6 flex items-center lg:mb-8">
                <div className="mr-3 rounded-lg bg-secondary p-2 sm:mr-4 sm:p-3">
                  <GraduationCap className="h-5 w-5 text-secondary-foreground sm:h-6 sm:w-6" />
                </div>
                <h3 className="section-title text-xl font-semibold sm:text-2xl lg:text-3xl">Education</h3>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {education.map((edu, index) => (
                  <motion.div
                    key={edu.degree}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: prefersReducedMotion ? 0.01 : 0.4, delay: prefersReducedMotion ? 0 : index * 0.08 }}
                  >
                    <Card className="hover:-translate-y-0.5 hover:shadow-xl">
                      <CardHeader className="pb-3 sm:pb-4">
                        <CardTitle className="text-base sm:text-lg lg:text-xl">{edu.degree}</CardTitle>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-primary sm:text-base">{edu.field}</p>
                          <p className="text-xs text-muted-foreground sm:text-sm">
                            {edu.institution}, {edu.location}
                          </p>
                          <p className="text-xs text-muted-foreground sm:text-sm">{edu.period}</p>
                          <p className="text-xs font-medium text-primary sm:text-sm">{edu.grade}</p>
                          {edu.board && <p className="text-xs text-muted-foreground">Board: {edu.board}</p>}
                        </div>
                      </CardHeader>
                      {edu.courses && (
                        <CardContent>
                          <p className="mb-2 text-xs font-medium sm:text-sm lg:text-base">Key Courses:</p>
                          <div className="flex flex-wrap gap-1 sm:gap-2">
                            {edu.courses.map((course) => (
                              <Badge key={course} variant="outline" className="px-2 py-1 text-xs">
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
