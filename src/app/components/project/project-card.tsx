'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ExternalLink, Star, GitFork, Eye, Calendar, FileText } from 'lucide-react';
import { ProjectCard } from '@/app/types';
import { formatDate, formatNumber } from '@/app/lib/utils';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface ProjectCardProps {
  project: ProjectCard;
  onGenerateReadme: (project: ProjectCard) => Promise<string>;
}

export function ProjectCardComponent({ project, onGenerateReadme }: ProjectCardProps) {
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

  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl">
              <a
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline flex items-center gap-2"
              >
                {project.name}
                <ExternalLink className="h-4 w-4" />
              </a>
            </CardTitle>
            <CardDescription className="line-clamp-2">
              {project.description || 'No description available'}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
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
          <span>Updated {formatDate(project.updated_at)}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" asChild>
            <a href={project.html_url} target="_blank" rel="noopener noreferrer">
              View Code
            </a>
          </Button>
          
          {project.homepage && (
            <Button variant="outline" size="sm" asChild>
              <a href={project.homepage} target="_blank" rel="noopener noreferrer">
                Live Demo
              </a>
            </Button>
          )}

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-1" />
                README
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{project.name} - README</DialogTitle>
                <DialogDescription>
                  Interactive README for this repository
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                {project.readme ? (
                  <div className="prose prose-sm max-w-none">
                    <ReactMarkdown>{project.readme}</ReactMarkdown>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <p className="text-muted-foreground">
                      No README found. Generate one using AI?
                    </p>
                    <Button 
                      onClick={handleGenerateReadme}
                      disabled={isGenerating}
                    >
                      {isGenerating ? 'Generating...' : 'Generate README with AI'}
                    </Button>
                  </div>
                )}
                
                {generatedReadme && (
                  <div className="mt-6 border-t pt-4">
                    <h3 className="text-lg font-semibold mb-2">AI-Generated README</h3>
                    <div className="prose prose-sm max-w-none">
                      <ReactMarkdown>{generatedReadme}</ReactMarkdown>
                    </div>
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
