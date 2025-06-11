'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const skillCategories = [
  {
    title: 'Languages',
    skills: [
      { name: 'C', icon: 'https://img.shields.io/badge/c-%2300599C.svg?style=flat&logo=c&logoColor=white' },
      { name: 'C++', icon: 'https://img.shields.io/badge/c++-%2300599C.svg?style=flat&logo=c%2B%2B&logoColor=white' },
      { name: 'Python', icon: 'https://img.shields.io/badge/python-3670A0?style=flat&logo=python&logoColor=ffdd54' },
      { name: 'JavaScript', icon: 'https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E' },
      { name: 'Java', icon: 'https://img.shields.io/badge/java-%23ED8B00.svg?style=flat&logo=openjdk&logoColor=white' },
      { name: 'Dart', icon: 'https://img.shields.io/badge/dart-%230175C2.svg?style=flat&logo=dart&logoColor=white' },
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
    ],
  },
  {
    title: 'Cloud & Platforms',
    skills: [
      { name: 'AWS', icon: 'https://img.shields.io/badge/AWS-%23FF9900.svg?style=flat&logo=amazon-aws&logoColor=white' },
      { name: 'Azure', icon: 'https://img.shields.io/badge/azure-%230072C6.svg?style=flat&logo=microsoftazure&logoColor=white' },
      { name: 'Firebase', icon: 'https://img.shields.io/badge/firebase-%23039BE5.svg?style=flat&logo=firebase' },
      { name: 'GitHub Pages', icon: 'https://img.shields.io/badge/github%20pages-121013?style=flat&logo=github&logoColor=white' },
      { name: 'Vercel', icon: 'https://img.shields.io/badge/vercel-%23000000.svg?style=flat&logo=vercel&logoColor=white' },
      { name: 'Netlify', icon: 'https://img.shields.io/badge/netlify-%23000000.svg?style=flat&logo=netlify&logoColor=#00C7B7' },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { name: 'MySQL', icon: 'https://img.shields.io/badge/mysql-4479A1.svg?style=flat&logo=mysql&logoColor=white' },
      { name: 'MongoDB', icon: 'https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=flat&logo=mongodb&logoColor=white' },
      { name: 'SQLite', icon: 'https://img.shields.io/badge/sqlite-%2307405e.svg?style=flat&logo=sqlite&logoColor=white' },
      { name: 'SQL Server', icon: 'https://img.shields.io/badge/Microsoft%20SQL%20Server-CC2927?style=flat&logo=microsoft%20sql%20server&logoColor=white' },
      { name: 'PostgreSQL', icon: 'https://img.shields.io/badge/postgresql-%23316192.svg?style=flat&logo=postgresql&logoColor=white' },
      { name: 'Redis', icon: 'https://img.shields.io/badge/redis-%23DD0031.svg?style=flat&logo=redis&logoColor=white' },
    ],
  },
  {
    title: 'Tools & Technologies',
    skills: [
      { name: 'Git', icon: 'https://img.shields.io/badge/git-%23F05033.svg?style=flat&logo=git&logoColor=white' },
      { name: 'GitHub', icon: 'https://img.shields.io/badge/github-%23121011.svg?style=flat&logo=github&logoColor=white' },
      { name: 'Tableau', icon: 'https://img.shields.io/badge/tableau-%2302569B.svg?style=flat&logo=tableau&logoColor=white' },
      { name: 'Docker', icon: 'https://img.shields.io/badge/docker-%230db7ed.svg?style=flat&logo=docker&logoColor=white' },
      { name: 'Hadoop', icon: 'https://img.shields.io/badge/Apache%20Hadoop-66CCFF?style=flat&logo=apachehadoop&logoColor=black' },
      { name: 'Pandas', icon: 'https://img.shields.io/badge/pandas-%23150458.svg?style=flat&logo=pandas&logoColor=white' },
    ],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">My Skills</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore my proficiency in various programming languages, frameworks, and tools used in the tech industry
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <div className="w-3 h-3 bg-primary rounded-full mr-3" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 0.3, 
                          delay: categoryIndex * 0.1 + skillIndex * 0.05 
                        }}
                        whileHover={{ scale: 1.05 }}
                        className="group cursor-pointer"
                      >
                        <div className="flex flex-col items-center p-3 rounded-lg bg-background border border-border hover:border-primary/50 transition-all duration-200">
                          <img
                            src={skill.icon}
                            alt={skill.name}
                            className="h-8 w-auto mb-2 transition-transform duration-200 group-hover:scale-110"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                          <span className="text-xs font-medium text-center leading-tight">
                            {skill.name}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Card className="max-w-4xl mx-auto bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-4 text-primary">
                Continuous Learning
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                I&apos;m constantly expanding my skill set and staying up-to-date with the latest 
                technologies in AI/ML, data science, and software development. Currently exploring 
                advanced topics in generative AI, MLOps, and cloud-native architectures.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
