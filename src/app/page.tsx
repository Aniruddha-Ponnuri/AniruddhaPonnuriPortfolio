'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Header } from '@/app/components/layout/header';
import { SearchFiltersComponent } from '@/app/components/search/search-filters';
import { ProjectCardComponent } from '@/app/components/project/project-card';
import { ProjectSkeleton } from '@/app/components/ui/loading-skeleton';
import { ClientOnly } from '@/app/components/ui/client-only';
import { GitHubUser, ProjectCard, SearchFilters } from '@/app/types';

export default function HomePage() {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    language: '',
    sortBy: 'updated',
    sortOrder: 'desc',
  });
  
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['github-data'],
    queryFn: async () => {
      const response = await fetch('/api/github');
      if (!response.ok) {
        throw new Error('Failed to fetch GitHub data');
      }
      return response.json();
    },
  });

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
      <Header user={user} />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <ClientOnly fallback={
          <div className="space-y-4 p-4 border rounded-lg bg-card">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2 h-10 bg-gray-200 rounded animate-pulse" />
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

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              Projects ({filteredRepositories.length})
            </h2>
          </div>

          {isLoading ? (
            <ProjectSkeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRepositories.map((project) => (
                <ProjectCardComponent
                  key={project.id}
                  project={project}
                  onGenerateReadme={handleGenerateReadme}
                />
              ))}
            </div>
          )}

          {!isLoading && filteredRepositories.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No repositories found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search filters or check back later.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
