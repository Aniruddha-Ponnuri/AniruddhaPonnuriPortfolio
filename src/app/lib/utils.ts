import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { GitHubRepo} from '../types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}

export function generateTags(repo: GitHubRepo, languages: Record<string, number>): string[] {
  const tags: string[] = [];
  
  // Add primary language
  if (repo.language) {
    tags.push(repo.language);
  }
  
  // Add additional languages (top 3)
  const sortedLanguages = Object.entries(languages)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([lang]) => lang);
    
  sortedLanguages.forEach(lang => {
    if (!tags.includes(lang)) {
      tags.push(lang);
    }
  });
  
  // Add topics from GitHub
  repo.topics.forEach(topic => {
    if (!tags.includes(topic)) {
      tags.push(topic);
    }
  });
  
  // Add framework/library detection
  if (repo.name.toLowerCase().includes('react')) tags.push('React');
  if (repo.name.toLowerCase().includes('next')) tags.push('Next.js');
  if (repo.name.toLowerCase().includes('vue')) tags.push('Vue.js');
  if (repo.name.toLowerCase().includes('api')) tags.push('API');
  
  return tags.slice(0, 6); // Limit to 6 tags
}
