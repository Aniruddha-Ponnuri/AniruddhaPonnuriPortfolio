'use client';

import { useState, useMemo, useRef, useCallback } from 'react';
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

const GITHUB_USERNAME =
  process.env.GITHUB_USERNAME ||
  'Aniruddha-Ponnuri';

const fetchGitHubData = async () => {
  const params = new URLSearchParams({ username: GITHUB_USERNAME });
  const response = await fetch(`/api/github?${params.toString()}`);
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
    queryKey: ['github-data', GITHUB_USERNAME],
    queryFn: fetchGitHubData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (replaces cacheTime in newer versions)
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const user: GitHubUser | null = data?.user || null;
  
  // Memoize repositories to prevent unnecessary re-renders
  const repositories: ProjectCard[] = useMemo(() => {
    return data?.repositories || [];
  }, [data?.repositories]);

  // Adaptive grid columns based on container size and content count
  const getProjectGridColumns = () => {
    const count = filteredRepositories.length;
    if (containerSize.size === 'xs') return 'grid-cols-1';
    if (containerSize.size === 'sm') return count >= 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1';
    if (containerSize.size === 'md') return count >= 3 ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-2';
    if (containerSize.size === 'lg') return count >= 4 ? 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-3';
    return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
  };

  // Get unique languages
  const availableLanguages = useMemo(() => {
    const languages = repositories.flatMap(repo => 
      repo.languages ? Object.keys(repo.languages) : []
    );
    return [...new Set(languages)].sort();
  }, [repositories]);

  // Get unique tags
  const availableTags = useMemo(() => {
    const tags = repositories.flatMap(repo => repo.tags || []);
    return [...new Set(tags)].sort();
  }, [repositories]);

  // Filter repositories based on search criteria
  const filteredRepositories = useMemo(() => {
    return repositories.filter(repo => {
      const matchesQuery = !filters.query || 
        repo.name.toLowerCase().includes(filters.query.toLowerCase()) ||
        repo.description?.toLowerCase().includes(filters.query.toLowerCase());
      
      const matchesLanguage = !filters.language || 
        (repo.languages && Object.keys(repo.languages).includes(filters.language));
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => repo.tags?.includes(tag));
      
      return matchesQuery && matchesLanguage && matchesTags;
    }).sort((a, b) => {
      const { sortBy, sortOrder } = filters;
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'stars':
          comparison = (a.stargazers_count || 0) - (b.stargazers_count || 0);
          break;
        case 'updated':
        default:
          comparison = new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime();
          break;
      }
      
      return sortOrder === 'desc' ? -comparison : comparison;
    });
  }, [repositories, filters, selectedTags]);

  const handleTagSelect = useCallback((tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev : [...prev, tag]));
  }, []);

  const handleTagRemove = useCallback((tag: string) => {
    setSelectedTags((prev) => prev.filter((item) => item !== tag));
  }, []);

  const handleGenerateReadme = useCallback(async (project: ProjectCard): Promise<string> => {
    try {
      const response = await fetch('/api/readme', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          repoData: {
            name: project.name,
            fullName: project.full_name,
            repoUrl: project.html_url,
            description: project.description,
            language: project.language,
            languages: project.languages,
            topics: project.topics,
            homepage: project.homepage,
            license: project.license?.spdx_id || project.license?.name || null,
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
  }, []);

  const handleLoadReadme = useCallback(async (project: ProjectCard): Promise<string | null> => {
    try {
      const [owner, repo] = project.full_name.split('/');
      if (!owner || !repo) {
        return null;
      }

      const params = new URLSearchParams({ owner, repo });
      const response = await fetch(`/api/github/readme?${params.toString()}`);

      if (!response.ok) {
        return null;
      }

      const { readme } = await response.json();
      return typeof readme === 'string' && readme.trim() ? readme : null;
    } catch (error) {
      console.error('Error loading repository README:', error);
      return null;
    }
  }, []);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-destructive/10 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-destructive"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">Unable to Load Projects</h1>
          <p className="text-muted-foreground mb-6">
            We couldn&apos;t load the GitHub data. This might be due to rate limiting or network issues.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section - Full viewport height */}
      <section id="home">
        <HeroSection />
      </section>
      
      {/* About Section */}
      <section id="about">
        <AboutSection />
      </section>
      
      {/* Resume Section */}
      <section id="resume">
        <ResumeSection />
      </section>
      
      {/* Skills Section */}
      <section id="skills">
        <SkillsSection />
      </section>
      
      {/* Projects Section */}
      <section id="projects" className="section-shell" ref={projectsRef}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-8 lg:space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="section-title mb-4 text-3xl font-semibold sm:text-4xl lg:text-5xl">My Projects</h2>
              <p className="section-lead mx-auto text-base sm:text-lg lg:text-xl">
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
                <div className="surface-card space-y-4 rounded-xl p-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="h-10 rounded-md bg-muted lg:col-span-2 animate-pulse" />
                    <div className="h-10 rounded-md bg-muted animate-pulse" />
                    <div className="h-10 rounded-md bg-muted animate-pulse" />
                  </div>
                  <div className="h-20 rounded-md bg-muted animate-pulse" />
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
                <h3 className="section-title text-xl font-semibold sm:text-2xl lg:text-3xl">
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
                        onLoadReadme={handleLoadReadme}
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
      <section id="contact">
        <ContactSection />
      </section>
    </div>
  );
}
