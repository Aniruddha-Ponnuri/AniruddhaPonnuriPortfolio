'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu';
import { ExternalLink, MapPin, Building, Link as LinkIcon, Users, GitFork } from 'lucide-react';
import { motion } from 'framer-motion';
import { GitHubUser } from '@/app/types';
import { formatNumber, cn } from '@/app/lib/utils';

interface HeaderProps {
  user: GitHubUser | null;
}

export function Header({ user }: HeaderProps) {
  if (!user) return null;

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <img
            src={user.avatar_url}
            alt={user.name || user.login}
            className="w-24 h-24 rounded-full border-4 border-border"
          />
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl font-bold">{user.name || user.login}</h1>
              <Badge variant="secondary">{user.login}</Badge>
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
            
            <div className="flex items-center space-x-6">
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
            
            <Button variant="outline" asChild>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                View GitHub Profile
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
