'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useReducedMotion, useContainerQuery } from '@/app/lib/responsive';
import { useRef } from 'react';
import Image from 'next/image';

const skillCategories = [
  {
    title: 'Languages',
    skills: [
      { name: 'C', icon: 'https://img.shields.io/badge/c-%2300599C.svg?style=flat&logo=c&logoColor=white' },
      { name: 'C++', icon: 'https://img.shields.io/badge/c++-%2300599C.svg?style=flat&logo=c%2B%2B&logoColor=white' },
      { name: 'Python', icon: 'https://img.shields.io/badge/python-3670A0?style=flat&logo=python&logoColor=ffdd54' },
      { name: 'JavaScript', icon: 'https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E' },
      { name: 'Java', icon: 'https://img.shields.io/badge/java-%23ED8B00.svg?style=flat&logo=openjdk&logoColor=white' },
      { name: 'Bash', icon: 'https://img.shields.io/badge/bash-%23121011.svg?style=flat&logo=gnu-bash&logoColor=white' },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    skills: [
      { name: 'React', icon: 'https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB' },
      { name: 'Next.js', icon: 'https://img.shields.io/badge/Next-black?style=flat&logo=next.js&logoColor=white' },
      { name: 'Flutter', icon: 'https://img.shields.io/badge/Flutter-%2302569B.svg?style=flat&logo=Flutter&logoColor=white' },
      { name: 'Django', icon: 'https://img.shields.io/badge/django-%23092E20.svg?style=flat&logo=django&logoColor=white' },
      { name: 'Flask', icon: 'https://img.shields.io/badge/flask-%23000.svg?style=flat&logo=flask&logoColor=white' },
      { name: 'FastAPI', icon: 'https://img.shields.io/badge/FastAPI-005571?style=flat&logo=fastapi' },
    ],
  },
  {
    title: 'ML & AI Frameworks',
    skills: [
      { name: 'TensorFlow', icon: 'https://img.shields.io/badge/TensorFlow-%23FF6F00.svg?style=flat&logo=TensorFlow&logoColor=white' },
      { name: 'PyTorch', icon: 'https://img.shields.io/badge/PyTorch-%23EE4C2C.svg?style=flat&logo=PyTorch&logoColor=white' },
      { name: 'Scikit-Learn', icon: 'https://img.shields.io/badge/scikit--learn-%23F7931E.svg?style=flat&logo=scikit-learn&logoColor=white' },
      { name: 'Keras', icon: 'https://img.shields.io/badge/Keras-%23D00000.svg?style=flat&logo=Keras&logoColor=white' },
      { name: 'OpenCV', icon: 'https://img.shields.io/badge/opencv-%23white.svg?style=flat&logo=opencv&logoColor=white' },
      { name: 'NumPy', icon: 'https://img.shields.io/badge/numpy-%23013243.svg?style=flat&logo=numpy&logoColor=white' },
      { name: 'HuggingFace', icon: 'https://img.shields.io/badge/HuggingFace-%23FFD21E.svg?style=flat&logo=huggingface&logoColor=black' },
    ],
  },
  {
    title: 'GenAI & LLM Tools',
    skills: [
      { name: 'LangChain', icon: 'https://img.shields.io/badge/LangChain-%231C3C3C.svg?style=flat&logo=langchain&logoColor=white' },
      { name: 'LangGraph', icon: 'https://img.shields.io/badge/LangGraph-%231C3C3C.svg?style=flat&logo=langchain&logoColor=white' },
      { name: 'CrewAI', icon: 'https://img.shields.io/badge/CrewAI-%23FF6B6B.svg?style=flat&logo=ai&logoColor=white' },
      { name: 'Langfuse', icon: 'https://img.shields.io/badge/Langfuse-%23000000.svg?style=flat&logo=langchain&logoColor=white' },
      { name: 'OpenAI', icon: 'https://img.shields.io/badge/OpenAI-%23412991.svg?style=flat&logo=openai&logoColor=white' },
      { name: 'SpaCy', icon: 'https://img.shields.io/badge/SpaCy-%2309A3D5.svg?style=flat&logo=spacy&logoColor=white' },
    ],
  },
  {
    title: 'Vector DBs & Search',
    skills: [
      { name: 'Pinecone', icon: 'https://img.shields.io/badge/Pinecone-%23000000.svg?style=flat&logo=pinecone&logoColor=white' },
      { name: 'Chroma', icon: 'https://img.shields.io/badge/Chroma-%23FF6B6B.svg?style=flat&logo=chromadb&logoColor=white' },
      { name: 'FAISS', icon: 'https://img.shields.io/badge/FAISS-%230081CB.svg?style=flat&logo=meta&logoColor=white' },
    ],
  },
  {
    title: 'Cloud & DevOps',
    skills: [
      { name: 'AWS', icon: 'https://img.shields.io/badge/AWS-%23FF9900.svg?style=flat&logo=amazon-aws&logoColor=white' },
      { name: 'Azure', icon: 'https://img.shields.io/badge/azure-%230072C6.svg?style=flat&logo=microsoftazure&logoColor=white' },
      { name: 'Docker', icon: 'https://img.shields.io/badge/docker-%230db7ed.svg?style=flat&logo=docker&logoColor=white' },
      { name: 'Kubernetes', icon: 'https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=flat&logo=kubernetes&logoColor=white' },
      { name: 'Git', icon: 'https://img.shields.io/badge/git-%23F05033.svg?style=flat&logo=git&logoColor=white' },
      { name: 'GitHub', icon: 'https://img.shields.io/badge/github-%23121011.svg?style=flat&logo=github&logoColor=white' },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'PostgreSQL', icon: 'https://img.shields.io/badge/postgresql-%23316192.svg?style=flat&logo=postgresql&logoColor=white' },
      { name: 'MySQL', icon: 'https://img.shields.io/badge/mysql-4479A1.svg?style=flat&logo=mysql&logoColor=white' },
      { name: 'MongoDB', icon: 'https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=flat&logo=mongodb&logoColor=white' },
      { name: 'SQLite', icon: 'https://img.shields.io/badge/sqlite-%2307405e.svg?style=flat&logo=sqlite&logoColor=white' },
    ],
  },
  {
    title: 'Data & Analytics',
    skills: [
      { name: 'Pandas', icon: 'https://img.shields.io/badge/pandas-%23150458.svg?style=flat&logo=pandas&logoColor=white' },
      { name: 'Tableau', icon: 'https://img.shields.io/badge/tableau-%2302569B.svg?style=flat&logo=tableau&logoColor=white' },
      { name: 'Hadoop', icon: 'https://img.shields.io/badge/Apache%20Hadoop-66CCFF?style=flat&logo=apachehadoop&logoColor=black' },
    ],
  },
];

export default function SkillsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const containerSize = useContainerQuery(containerRef);
  const prefersReducedMotion = useReducedMotion();

  const getGridColumns = () => {
    if (containerSize.size === 'xs') return 'grid-cols-1';
    if (containerSize.size === 'sm') return 'grid-cols-1 sm:grid-cols-2';
    if (containerSize.size === 'md') return 'grid-cols-2';
    if (containerSize.size === 'lg') return 'grid-cols-2 lg:grid-cols-3';
    return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
  };

  return (
    <section id="skills" className="section-shell bg-muted/30" ref={containerRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 0.46 }}
          className="mb-16 text-center"
        >
          <h2 className="section-title mb-4 text-3xl font-semibold sm:text-4xl lg:text-5xl">My Skills</h2>
          <p className="section-lead mx-auto text-base sm:text-lg lg:text-xl">
            Selected tools and technologies I use to build products across AI, data, and full-stack systems.
          </p>
        </motion.div>

        <div className="mx-auto max-w-7xl">
          <div className={`grid ${getGridColumns()} gap-6 lg:gap-8`}>
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: prefersReducedMotion ? 0.01 : 0.42,
                  delay: prefersReducedMotion ? 0 : categoryIndex * 0.06,
                }}
                className="h-full"
              >
                <Card className="h-full hover:-translate-y-0.5 hover:shadow-xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="section-title flex items-center text-lg font-semibold sm:text-xl">
                      <div className="mr-3 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-primary" />
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.97 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: prefersReducedMotion ? 0.01 : 0.25,
                            delay: prefersReducedMotion ? 0 : categoryIndex * 0.04 + skillIndex * 0.03,
                          }}
                          whileHover={prefersReducedMotion ? {} : { y: -1 }}
                          className="group cursor-pointer"
                        >
                          <div className="flex min-h-[90px] flex-col items-center rounded-lg border border-border/70 bg-background/70 p-2.5 text-center transition-[transform,border-color,box-shadow] duration-160 ease-[var(--ease-out)] group-hover:border-primary/45 group-hover:shadow-[0_10px_22px_color-mix(in_oklch,var(--primary)_18%,transparent)]">
                            <div className="mb-2 flex flex-1 items-center justify-center">
                              <Image
                                src={skill.icon}
                                alt={`${skill.name} technology logo`}
                                width={36}
                                height={36}
                                className="h-7 w-auto transition-transform duration-150 group-hover:scale-105 sm:h-8"
                                unoptimized
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            </div>
                            <span className="text-xs font-medium leading-tight sm:text-sm">{skill.name}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
