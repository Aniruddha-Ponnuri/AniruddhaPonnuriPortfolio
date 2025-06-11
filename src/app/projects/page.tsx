'use client';

import { useState, useMemo, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Navigation } from '@/app/components/layout/navigation';
import { GitHubHeader } from '@/app/components/layout/github-header';
import { SearchFiltersComponent } from '@/app/components/search/search-filters';
import { ProjectCardComponent } from '@/app/components/project/project-card';
import { ProjectSkeleton } from '@/app/components/ui/loading-skeleton';
import { ClientOnly } from '@/app/components/ui/client-only';
import { useReducedMotion, useContainerQuery } from '@/app/lib/responsive';
import { ProjectCard, SearchFilters } from '@/app/types';

const fetchGitHubData = async () => {
  const response = await fetch('/api/github');
  if (!response.ok) {
    throw new Error('Failed to fetch GitHub data');
  }
  return response.json();
};

export default function ProjectsPage() {
  const projectsRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const containerSize = useContainerQuery(projectsRef);
  
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    language: '',
    sortBy: 'updated',
    sortOrder: 'desc',
  });
  
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Handle README generation
  const handleGenerateReadme = async (project: ProjectCard): Promise<string> => {
    try {
      const response = await fetch('/api/readme', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          repoName: project.name,
          description: project.description,
          language: project.language,
          topics: project.topics || [],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate README');
      }

      const data = await response.json();
      return data.readme;
    } catch (error) {
      console.error('Error generating README:', error);
      return 'Failed to generate README. Please try again.';
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['github-data'],
    queryFn: fetchGitHubData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (replaces cacheTime in newer versions)
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Adaptive grid columns based on container size and content count
  const getGridColumns = () => {
    if (!containerSize.width) return 'grid-cols-1';
    
    const width = containerSize.width;
    const projectCount = filteredProjects?.length || 0;
    
    // Responsive breakpoints with content-aware adjustments
    if (width >= 1536) { // 2xl
      return projectCount >= 4 ? 'grid-cols-4' : `grid-cols-${Math.min(projectCount, 3)}`;
    } else if (width >= 1280) { // xl
      return projectCount >= 3 ? 'grid-cols-3' : `grid-cols-${Math.min(projectCount, 2)}`;
    } else if (width >= 1024) { // lg
      return projectCount >= 2 ? 'grid-cols-2' : 'grid-cols-1';
    } else if (width >= 768) { // md
      return 'grid-cols-2';
    } else {
      return 'grid-cols-1';
    }
  };  // Get all unique languages from projects for filter options
  const allLanguages = useMemo(() => {
    if (!data?.repositories) return [];
    const languages = new Set<string>();
    data.repositories.forEach((project: ProjectCard) => {
      if (project.languages) {
        Object.keys(project.languages).forEach(lang => languages.add(lang));
      }
    });
    return Array.from(languages).sort();
  }, [data?.repositories]);

  // Get all unique tags from projects for filter options
  const allTags = useMemo(() => {
    if (!data?.repositories) return [];
    const tags = new Set<string>();
    data.repositories.forEach((project: ProjectCard) => {
      project.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [data?.repositories]);

  // Filter and sort projects based on current filters
  const filteredProjects = useMemo(() => {
    if (!data?.repositories) return [];

    const filtered = data.repositories.filter((project: ProjectCard) => {
      const matchesQuery = filters.query === '' || 
        project.name.toLowerCase().includes(filters.query.toLowerCase()) ||
        project.description?.toLowerCase().includes(filters.query.toLowerCase());
      
      const matchesLanguage = filters.language === '' || 
        (project.languages && Object.keys(project.languages).includes(filters.language));
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => project.tags?.includes(tag));

      return matchesQuery && matchesLanguage && matchesTags;
    });

    // Sort projects
    filtered.sort((a: ProjectCard, b: ProjectCard) => {
      const factor = filters.sortOrder === 'asc' ? 1 : -1;
      
      switch (filters.sortBy) {
        case 'name':
          return factor * a.name.localeCompare(b.name);
        case 'stars':
          return factor * (a.stargazers_count - b.stargazers_count);
        case 'created':
          return factor * (new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        case 'updated':
        default:
          return factor * (new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
      }
    });

    return filtered;
  }, [data?.repositories, filters, selectedTags]);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };
  if (error) {
    return (
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20"
      >
        <GitHubHeader user={data?.user || null} />
        <Navigation />
        
        <main className="pt-20">
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-destructive mb-4">Error Loading Projects</h1>
                <p className="text-muted-foreground">
                  {error instanceof Error ? error.message : 'Failed to load GitHub data'}
                </p>
              </div>
            </div>
          </section>
        </main>
      </motion.div>
    );
  }
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20"
    >
      <GitHubHeader user={data?.user || null} />
      <Navigation />
      
      <main className="pt-20">
        <section ref={projectsRef} className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <motion.h1 
                className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.2, duration: prefersReducedMotion ? 0 : 0.6 }
                }}
              >
                My Projects
              </motion.h1>
              <motion.p 
                className="text-lg text-muted-foreground max-w-2xl mx-auto"
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.4, duration: prefersReducedMotion ? 0 : 0.6 }
                }}
              >
                Explore my portfolio of open-source projects and contributions
              </motion.p>
            </div>

            <ClientOnly>
              <motion.div
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: 0.6, duration: prefersReducedMotion ? 0 : 0.6 }
                }}
              >                <SearchFiltersComponent
                  filters={filters}
                  onFiltersChange={setFilters}
                  selectedTags={selectedTags}
                  onTagSelect={(tag: string) => {
                    if (!selectedTags.includes(tag)) {
                      setSelectedTags([...selectedTags, tag]);
                    }
                  }}
                  onTagRemove={(tag: string) => {
                    setSelectedTags(selectedTags.filter(t => t !== tag));
                  }}
                  availableTags={allTags}
                  availableLanguages={allLanguages}
                />
              </motion.div>
            </ClientOnly>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={`grid gap-6 mt-8 transition-all duration-300 ${getGridColumns()}`}
            >
              {isLoading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <ProjectSkeleton key={index} />
                ))
              ) : (                filteredProjects?.map((project: ProjectCard) => (
                  <ProjectCardComponent 
                    key={project.id} 
                    project={project}
                    onGenerateReadme={handleGenerateReadme}
                  />
                ))
              )}
            </motion.div>

            {!isLoading && filteredProjects?.length === 0 && (
              <motion.div 
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <p className="text-muted-foreground">No projects found matching your criteria.</p>
              </motion.div>
            )}
          </div>
        </section>
      </main>
    </motion.div>
  );
}
