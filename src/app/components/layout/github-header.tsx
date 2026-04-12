'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, MapPin, Building, Link as LinkIcon, Users, GitFork } from 'lucide-react';
import { GitHubUser } from '@/app/types';
import { formatNumber } from '@/app/lib/utils';

interface GitHubHeaderProps {
  user: GitHubUser | null;
}

export function GitHubHeader({ user }: GitHubHeaderProps) {
  if (!user) return null;

  return (
    <section className="surface-card overflow-hidden rounded-2xl border border-border/70">
      <div className="container mx-auto px-5 py-8 sm:px-7">
        <div className="flex flex-col items-start space-y-5 md:flex-row md:items-center md:space-y-0 md:space-x-6">
          <Image
            src={user.avatar_url}
            alt={user.name || user.login}
            width={96}
            height={96}
            className="h-24 w-24 rounded-full border-2 border-primary/35"
          />
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center space-x-2">
              <h1 className="section-title text-3xl font-semibold">{user.name || user.login}</h1>
              <Badge variant="secondary" className="px-2.5 py-1">{user.login}</Badge>
            </div>
            
            {user.bio && (
              <p className="text-lg text-muted-foreground">{user.bio}</p>
            )}
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {user.company && (
                <div className="flex items-center space-x-1">
                  <Building className="h-4 w-4" />
                  <span>{user.company}</span>
                </div>
              )}
              
              {user.location && (
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{user.location}</span>
                </div>
              )}
              
              {user.blog && (
                <div className="flex items-center space-x-1">
                  <LinkIcon className="h-4 w-4" />
                  <a 
                    href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {user.blog}
                  </a>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span className="font-medium">{formatNumber(user.followers)}</span>
                <span className="text-muted-foreground">followers</span>
              </div>
              
              <div className="flex items-center space-x-1">
                <GitFork className="h-4 w-4" />
                <span className="font-medium">{formatNumber(user.public_repos)}</span>
                <span className="text-muted-foreground">repositories</span>
              </div>
            </div>
            
            <Button variant="outline" asChild className="mt-2">
              <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                View GitHub Profile
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
