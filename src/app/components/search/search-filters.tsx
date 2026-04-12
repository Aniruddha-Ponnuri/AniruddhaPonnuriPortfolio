'use client';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { SearchFilters } from '@/app/types';
import { Dispatch, SetStateAction, useState, useEffect, useCallback, useMemo } from 'react';

interface SearchFiltersProps {
  filters: SearchFilters;
  onFiltersChange: Dispatch<SetStateAction<SearchFilters>>;
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
  const languageOptions = useMemo(() => {
    const options = [...availableLanguages];

    if (filters.language && !options.includes(filters.language)) {
      options.unshift(filters.language);
    }

    return options;
  }, [availableLanguages, filters.language]);

  const visibleTags = useMemo(() => {
    const selected = selectedTags.filter((tag) => availableTags.includes(tag));
    const unselected = availableTags.filter((tag) => !selectedTags.includes(tag));

    return [...selected, ...unselected].slice(0, 24);
  }, [availableTags, selectedTags]);

  const updateFilters = useCallback(
    (next: Partial<SearchFilters>) => {
      onFiltersChange((prev) => ({ ...prev, ...next }));
    },
    [onFiltersChange]
  );

  const handleTagToggle = useCallback(
    (tag: string) => {
      if (selectedTags.includes(tag)) {
        onTagRemove(tag);
        return;
      }
      onTagSelect(tag);
    },
    [onTagRemove, onTagSelect, selectedTags]
  );

  const clearSelectedTags = useCallback(() => {
    selectedTags.forEach((tag) => onTagRemove(tag));
  }, [onTagRemove, selectedTags]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="surface-card space-y-4 rounded-2xl border border-border/70 p-5 sm:p-6">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
          <div className="h-10 rounded-lg bg-muted md:col-span-2 animate-pulse" />
          <div className="h-10 rounded-lg bg-muted animate-pulse" />
          <div className="h-10 rounded-lg bg-muted animate-pulse" />
        </div>
        <div className="h-16 rounded-lg bg-muted animate-pulse" />
      </div>
    );
  }

  return (
    <div className="surface-card relative overflow-hidden rounded-2xl border border-border/70 p-5 sm:p-6">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-12 top-0 h-28 w-28 rounded-full bg-primary/12 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-32 w-32 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="section-title text-sm font-semibold tracking-tight sm:text-base">Search Projects</p>
          <p className="text-xs text-muted-foreground sm:text-sm">Search quickly by repository, language, and tags.</p>
        </div>

        {selectedTags.length > 0 && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearSelectedTags}
            className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
          >
            Clear tags
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        <Input
          placeholder="Search repositories..."
          value={filters.query}
          onChange={(e) => updateFilters({ query: e.target.value })}
          className="h-10 rounded-lg md:col-span-2"
        />
        <Select
          value={filters.language || 'all'}
          onValueChange={(value) => updateFilters({ language: value === 'all' ? '' : value })}
        >
          <SelectTrigger className="h-10 rounded-lg">
            <SelectValue placeholder="All Languages" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Languages</SelectItem>
            {languageOptions.length > 0 &&
              languageOptions.map((lang) => (
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
            updateFilters({ sortBy, sortOrder });
          }}
        >
          <SelectTrigger className="h-10 rounded-lg">
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
      </div>

      <div className="mt-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Filter by Tags</h3>
          {selectedTags.length > 0 && (
            <span className="text-xs text-muted-foreground">{selectedTags.length} selected</span>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {visibleTags.map((tag) => {
            const isSelected = selectedTags.includes(tag);

            return (
              <Badge
                key={tag}
                asChild
                variant={isSelected ? 'default' : 'outline'}
                className="rounded-full px-3 py-1 text-xs sm:text-sm"
              >
                <button
                  type="button"
                  onClick={() => handleTagToggle(tag)}
                  aria-label={`${isSelected ? 'Remove' : 'Add'} ${tag} tag filter`}
                  className="cursor-pointer transition-[transform,background-color,color] duration-150 ease-[var(--ease-out)] active:scale-[0.97]"
                >
                  {tag}
                </button>
              </Badge>
            );
          })}
        </div>

        {selectedTags && selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {selectedTags.map((tag) => (
              <Badge key={`selected-${tag}`} asChild className="rounded-full px-2.5 py-1">
                <button
                  type="button"
                  onClick={() => onTagRemove(tag)}
                  aria-label={`Remove ${tag} tag filter`}
                  className="group inline-flex items-center gap-1"
                >
                  <span>{tag}</span>
                  <span className="rounded-full bg-foreground/12 p-0.5 transition-colors duration-150 ease-[var(--ease-out)] group-hover:bg-foreground/20">
                    <X className="h-3 w-3" />
                  </span>
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
