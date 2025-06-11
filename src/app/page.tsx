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
import HeroSection from '@/app/components/sections/hero';
import AboutSection from '@/app/components/sections/about';
import ResumeSection from '@/app/components/sections/resume';
import SkillsSection from '@/app/components/sections/skills';
import ContactSection from '@/app/components/sections/contact';
import { useReducedMotion, useContainerQuery } from '@/app/lib/responsive';
import { GitHubUser, ProjectCard, SearchFilters } from '@/app/types';

const fetchGitHubData = async () => {
  const response = await fetch('/api/github');
  if (!response.ok) {
    throw new Error('Failed to fetch GitHub data');
  }
  return response.json();
};

export default function HomePage() {
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

  const { data, isLoading, error } = useQuery({
    queryKey: ['github-data'],
    queryFn: fetchGitHubData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (replaces cacheTime in newer versions)
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Adaptive grid columns based on container size and content count
  const getProjectGridColumns = () => {
    const count = filteredRepositories.length;
    if (containerSize.size === 'xs') return 'grid-cols-1';
    if (containerSize.size === 'sm') return count >= 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1';
    if (containerSize.size === 'md') return count >= 3 ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-2';
    if (containerSize.size === 'lg') return count >= 4 ? 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-3';
    return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
  };

  const user: GitHubUser | null = data?.user || null;
  
  // Memoize repositories to prevent unnecessary re-renders
  const repositories: ProjectCard[] = useMemo(() => {
    return data?.repositories || [];
  }, [data?.repositories]);

  // Extract available languages and tags
  const availableLanguages = useMemo(() => {
    if (!repositories || repositories.length === 0) return [];
    const languages = new Set<string>();
    repositories.forEach(repo => {
      if (repo.language) languages.add(repo.language);
      if (repo.languages && typeof repo.languages === 'object') {
        Object.keys(repo.languages).forEach(lang => languages.add(lang));
      }
    });
    return Array.from(languages).sort();
  }, [repositories]);

  const availableTags = useMemo(() => {
    if (!repositories || repositories.length === 0) return [];
    const tags = new Set<string>();
    repositories.forEach(repo => {
      if (repo.tags && Array.isArray(repo.tags)) {
        repo.tags.forEach(tag => tags.add(tag));
      }
    });
    return Array.from(tags).sort();
  }, [repositories]);

  // Filter and sort repositories
  const filteredRepositories = useMemo(() => {
    if (!repositories || repositories.length === 0) return [];
    
    const filtered = repositories.filter(repo => {
      // Text search
      if (filters.query) {
        const query = filters.query.toLowerCase();
        if (!repo.name.toLowerCase().includes(query) && 
            !repo.description?.toLowerCase().includes(query)) {
          return false;
        }
      }

      // Language filter
      if (filters.language) {
        if (repo.language !== filters.language && 
            !Object.keys(repo.languages || {}).includes(filters.language)) {
          return false;
        }
      }

      // Tag filter
      if (selectedTags.length > 0) {
        if (!selectedTags.some(tag => (repo.tags || []).includes(tag))) {
          return false;
        }
      }

      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      let aValue: string | number | Date, bValue: string | number | Date;
      
      switch (filters.sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'stars':
          aValue = a.stargazers_count;
          bValue = b.stargazers_count;
          break;
        case 'updated':
          aValue = new Date(a.updated_at);
          bValue = new Date(b.updated_at);
          break;
        case 'created':
          aValue = new Date(a.created_at);
          bValue = new Date(b.created_at);
          break;
        default:
          return 0;
      }

      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [repositories, filters, selectedTags]);

  const handleTagSelect = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleTagRemove = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  const handleGenerateReadme = async (project: ProjectCard): Promise<string> => {
    try {
      const response = await fetch('/api/readme', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          repoData: {
            name: project.name,
            description: project.description,
            language: project.language,
            languages: project.languages,
            topics: project.topics,
            homepage: project.homepage,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate README');
      }

      const { readme } = await response.json();
      return readme;
    } catch (error) {
      console.error('Error generating README:', error);
      throw error;
    }
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-2">Error</h1>
          <p className="text-muted-foreground">Failed to load GitHub data. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section id="home" className="min-h-screen pt-16 flex items-center">
        <HeroSection />
      </section>
      
      {/* About Section */}
      <section id="about" className="min-h-screen py-20">
        <AboutSection />
      </section>
      
      {/* Resume Section */}
      <section id="resume" className="min-h-screen py-20">
        <ResumeSection />
      </section>
      
      {/* Skills Section */}
      <section id="skills" className="min-h-screen py-20">
        <SkillsSection />
      </section>
      
      {/* Projects Section */}
      <section id="projects" className="min-h-screen py-20" ref={projectsRef}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-8 lg:space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">My Projects</h2>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
                Explore my latest work and open-source contributions
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.5, delay: prefersReducedMotion ? 0 : 0.1 }}
            >
              <GitHubHeader user={user} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.5, delay: prefersReducedMotion ? 0 : 0.2 }}
            >
              <ClientOnly fallback={
                <div className="space-y-4 p-4 border rounded-lg bg-card">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="lg:col-span-2 h-10 bg-gray-200 rounded animate-pulse" />
                    <div className="h-10 bg-gray-200 rounded animate-pulse" />
                    <div className="h-10 bg-gray-200 rounded animate-pulse" />
                  </div>
                  <div className="h-20 bg-gray-200 rounded animate-pulse" />
                </div>
              }>
                <SearchFiltersComponent
                  filters={filters}
                  onFiltersChange={setFilters}
                  availableLanguages={availableLanguages}
                  selectedTags={selectedTags}
                  onTagSelect={handleTagSelect}
                  onTagRemove={handleTagRemove}
                  availableTags={availableTags}
                />
              </ClientOnly>
            </motion.div>

            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: prefersReducedMotion ? 0.01 : 0.5, delay: prefersReducedMotion ? 0 : 0.3 }}
                className="flex items-center justify-between"
              >
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                  Projects ({filteredRepositories.length})
                </h3>
              </motion.div>

              {isLoading ? (
                <ProjectSkeleton />
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: prefersReducedMotion ? 0.01 : 0.5, delay: prefersReducedMotion ? 0 : 0.4 }}
                  className={`grid ${getProjectGridColumns()} gap-4 sm:gap-6 lg:gap-8 @container`}
                >
                  {filteredRepositories.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: prefersReducedMotion ? 0.01 : 0.3, 
                        delay: prefersReducedMotion ? 0 : index * 0.05 
                      }}
                    >
                      <ProjectCardComponent
                        project={project}
                        onGenerateReadme={handleGenerateReadme}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {!isLoading && filteredRepositories.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-lg sm:text-xl font-medium mb-2">No repositories found</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Try adjusting your search filters or check back later.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-20">
        <ContactSection />
      </section>
    </div>
  );
}
