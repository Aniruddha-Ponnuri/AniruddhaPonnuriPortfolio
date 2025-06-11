'use client';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { SearchFilters } from '@/app/types';
import { useState, useEffect } from 'react';

interface SearchFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  availableLanguages: string[];
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
  onTagRemove: (tag: string) => void;
  availableTags: string[];
}

export function SearchFiltersComponent({
  filters,
  onFiltersChange,
  availableLanguages,
  selectedTags,
  onTagSelect,
  onTagRemove,
  availableTags,
}: SearchFiltersProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="space-y-4 p-4 border rounded-lg bg-card">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 h-10 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="h-20 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }
  return (
    <div className="space-y-4 p-4 border rounded-lg bg-card">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input
          placeholder="Search repositories..."
          value={filters.query}
          onChange={(e) =>
            onFiltersChange({ ...filters, query: e.target.value })
          }
          className="md:col-span-2"
        />        <Select
          value={filters.language || "all"}
          onValueChange={(value) =>
            onFiltersChange({ ...filters, language: value === "all" ? "" : value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="All Languages" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Languages</SelectItem>
            {availableLanguages && availableLanguages.length > 0 && availableLanguages.map((lang) => (
              <SelectItem key={lang} value={lang}>
                {lang}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={`${filters.sortBy}-${filters.sortOrder}`}
          onValueChange={(value) => {
            const [sortBy, sortOrder] = value.split('-') as [typeof filters.sortBy, typeof filters.sortOrder];
            onFiltersChange({ ...filters, sortBy, sortOrder });
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="updated-desc">Recently Updated</SelectItem>
            <SelectItem value="created-desc">Recently Created</SelectItem>
            <SelectItem value="stars-desc">Most Stars</SelectItem>
            <SelectItem value="name-asc">Name A-Z</SelectItem>
            <SelectItem value="name-desc">Name Z-A</SelectItem>
          </SelectContent>
        </Select>
      </div>      {/* Tag Selection */}
      <div>
        <h3 className="text-sm font-medium mb-2">Filter by Tags:</h3>
        <div className="flex flex-wrap gap-2 mb-2">
          {availableTags && availableTags.length > 0 && availableTags.slice(0, 20).map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => onTagSelect(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
        
        {/* Selected Tags */}
        {selectedTags && selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <Badge key={tag} className="flex items-center gap-1">
                {tag}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => onTagRemove(tag)}
                />
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
