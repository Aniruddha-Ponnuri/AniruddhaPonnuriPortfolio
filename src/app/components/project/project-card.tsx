'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ExternalLink, Star, GitFork, Eye, Calendar, FileText } from 'lucide-react';
import { ProjectCard } from '@/app/types';
import { formatDate, formatNumber } from '@/app/lib/utils';
import { useReducedMotion, useContainerQuery } from '@/app/lib/responsive';
import { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

interface ProjectCardProps {
  project: ProjectCard;
  onGenerateReadme: (project: ProjectCard) => Promise<string>;
}

function unwrapMarkdownFence(markdown: string): string {
  const trimmed = markdown.trim();
  const fencedMarkdown = trimmed.match(/^```(?:markdown|md)?\s*([\s\S]*?)\s*```$/i);
  return fencedMarkdown ? fencedMarkdown[1].trim() : trimmed;
}

function isAbsoluteUrl(value: string): boolean {
  return /^(?:[a-z]+:)?\/\//i.test(value) || value.startsWith('mailto:') || value.startsWith('tel:') || value.startsWith('#') || value.startsWith('data:');
}

export function ProjectCardComponent({ project, onGenerateReadme }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const containerSize = useContainerQuery(cardRef);
  const prefersReducedMotion = useReducedMotion();
  
  const [generatedReadme, setGeneratedReadme] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReadme = async () => {
    setIsGenerating(true);
    try {
      const readme = await onGenerateReadme(project);
      setGeneratedReadme(readme);
    } catch (error) {
      console.error('Failed to generate README:', error);
    }
    setIsGenerating(false);
  };

  // Adaptive layout based on container size
  const getCardLayout = () => {
    return {
      statsLayout: containerSize.size === 'xs' ? 'flex-col space-y-2' : 'flex-row space-x-4',
      buttonLayout: containerSize.size === 'xs' ? 'flex-col space-y-2' : 'flex-row space-x-2',
      titleSize: containerSize.size === 'xs' ? 'text-lg' : 'text-xl',
    };
  };

  const layout = getCardLayout();
  const resolvedReadme = project.readme || generatedReadme;
  const normalizedReadme = resolvedReadme ? unwrapMarkdownFence(resolvedReadme) : '';

  const resolveRepoLink = (href = ''): string => {
    if (!href || isAbsoluteUrl(href)) return href;

    const baseUrl = `https://github.com/${project.full_name}/blob/HEAD/`;
    const normalizedHref = href.startsWith('/') ? href.slice(1) : href;

    try {
      return new URL(normalizedHref, baseUrl).toString();
    } catch {
      return href;
    }
  };

  const resolveRepoImage = (src = ''): string => {
    if (!src || isAbsoluteUrl(src)) return src;

    const baseUrl = `https://raw.githubusercontent.com/${project.full_name}/HEAD/`;
    const normalizedSrc = src.startsWith('/') ? src.slice(1) : src;

    try {
      return new URL(normalizedSrc, baseUrl).toString();
    } catch {
      return src;
    }
  };

  return (
    <Card 
      ref={cardRef}
      className={`h-full @container ${
        prefersReducedMotion ? 'hover:shadow-lg' : 'hover:-translate-y-1 hover:shadow-xl'
      }`}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className={`${layout.titleSize} section-title`}>
              <a
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 transition-[color] duration-150 ease-[var(--ease-out)] hover:text-primary"
              >
                {project.name}
                <ExternalLink className="h-4 w-4 transition-transform duration-150 ease-[var(--ease-out)] group-hover:translate-x-0.5" />
              </a>
            </CardTitle>
            <CardDescription className="line-clamp-2 @sm:line-clamp-3">
              {project.description || 'No description available'}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-1 @sm:gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs @sm:text-sm px-2.5 py-1">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Stats */}
        <div className={`flex items-center text-sm text-muted-foreground ${layout.statsLayout}`}>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4" />
            <span>{formatNumber(project.stargazers_count)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <GitFork className="h-4 w-4" />
            <span>{formatNumber(project.forks_count)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Eye className="h-4 w-4" />
            <span>{formatNumber(project.watchers_count)}</span>
          </div>
        </div>

        {/* Updated Date */}
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span className="@sm:inline hidden">Updated </span>
          <span>{formatDate(project.updated_at)}</span>
        </div>

        {/* Action Buttons */}
        <div className={`flex flex-wrap gap-2 ${layout.buttonLayout}`}>
          <Button variant="outline" size="sm" asChild className="flex-1 min-w-[120px]">
            <a href={project.html_url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Code
            </a>
          </Button>
          
          {project.homepage && (
            <Button variant="outline" size="sm" asChild className="flex-1 min-w-[120px]">
              <a href={project.homepage} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Live Demo
              </a>
            </Button>
          )}

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" size="sm" className="flex-1 min-w-[120px]">
                <FileText className="h-4 w-4 mr-2" />
                README
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] sm:max-w-4xl max-h-[85vh] sm:max-h-[80vh] overflow-hidden flex flex-col p-4 sm:p-6">
              <DialogHeader>
                <DialogTitle className="text-base sm:text-lg pr-8">{project.name} - README</DialogTitle>
                <DialogDescription className="text-xs sm:text-sm">
                  Interactive README for this repository
                </DialogDescription>
              </DialogHeader>
              
              <div className="flex-1 overflow-y-auto space-y-4 mt-4 pr-2">
                {normalizedReadme ? (
                  <div className="prose prose-xs sm:prose-sm max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-p:leading-relaxed prose-pre:max-w-full prose-pre:overflow-x-auto prose-img:rounded-lg prose-img:shadow-md prose-table:block prose-table:overflow-x-auto prose-table:whitespace-nowrap sm:prose-table:whitespace-normal">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw, rehypeSanitize]}
                      components={{
                        a: ({ href = '', ...props }) => {
                          const resolvedHref = resolveRepoLink(href);
                          const isExternal = /^https?:\/\//i.test(resolvedHref) || resolvedHref.startsWith('mailto:') || resolvedHref.startsWith('tel:');

                          return (
                            <a
                              {...props}
                              href={resolvedHref}
                              target={isExternal ? '_blank' : undefined}
                              rel={isExternal ? 'noopener noreferrer' : undefined}
                            />
                          );
                        },
                        img: ({ src = '', alt = '', ...props }) => (
                          // Resolve relative README image paths to raw GitHub URLs.
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            {...props}
                            src={typeof src === 'string' ? resolveRepoImage(src) : undefined}
                            alt={typeof alt === 'string' ? alt : ''}
                            loading="lazy"
                            className="rounded-md border border-border/60"
                          />
                        ),
                        table: ({ ...props }) => (
                          <div className="overflow-x-auto">
                            <table {...props} className="w-full border-collapse" />
                          </div>
                        ),
                        // Prevent script tags regardless of markdown source.
                        script: () => null,
                      }}
                    >
                      {normalizedReadme}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <div className="text-center space-y-4 py-8">
                    <p className="text-muted-foreground text-sm sm:text-base">
                      No README found. Generate one using AI?
                    </p>
                    <Button 
                      onClick={handleGenerateReadme}
                      disabled={isGenerating}
                      size="sm"
                      className="w-full sm:w-auto"
                    >
                      {isGenerating ? 'Generating...' : 'Generate README with AI'}
                    </Button>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
