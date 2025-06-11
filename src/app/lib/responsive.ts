'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

/**
 * Advanced Responsive Design Utilities
 * 
 * This file contains utilities for implementing consistent responsive design
 * following modern CSS Grid/Flexbox principles with container queries and
 * enhanced motion preferences.
 */

// Responsive breakpoints (matches Tailwind defaults but can be customized)
export const breakpoints = {
  sm: '640px',   // Small devices (landscape phones, 640px and up)
  md: '768px',   // Medium devices (tablets, 768px and up)
  lg: '1024px',  // Large devices (desktops, 1024px and up)
  xl: '1280px',  // Extra large devices (large desktops, 1280px and up)
  '2xl': '1536px', // 2X Extra large devices (larger desktops, 1536px and up)
  '4k': '2560px'   // 4K displays
} as const;

// Numeric breakpoints for JavaScript calculations
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '4k': 2560,
} as const;

export type BreakpointKey = keyof typeof BREAKPOINTS;

// Container max widths for different screen sizes
export const containerSizes = {
  sm: 'max-w-screen-sm',     // 640px
  md: 'max-w-screen-md',     // 768px
  lg: 'max-w-screen-lg',     // 1024px
  xl: 'max-w-screen-xl',     // 1280px
  '2xl': 'max-w-screen-2xl', // 1536px
  full: 'max-w-full'
} as const;

// Responsive spacing utilities
export const spacing = {
  section: {
    padding: {
      mobile: 'px-4 py-12',
      tablet: 'sm:px-6 sm:py-16',
      desktop: 'lg:px-8 lg:py-20',
      large: 'xl:px-12 xl:py-24',
      xl: '2xl:px-16 2xl:py-32'
    },
    margin: {
      mobile: 'mx-4 my-8',
      tablet: 'sm:mx-6 sm:my-12',
      desktop: 'lg:mx-8 lg:my-16',
      large: 'xl:mx-12 xl:my-20'
    }
  },
  component: {
    gap: {
      mobile: 'gap-4',
      tablet: 'sm:gap-6',
      desktop: 'lg:gap-8',
      large: 'xl:gap-12'
    }
  }
} as const;

// Typography responsive utilities
export const typography = {
  heading: {
    h1: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl',
    h2: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl',
    h3: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl',
    h4: 'text-lg sm:text-xl md:text-2xl lg:text-3xl',
    h5: 'text-base sm:text-lg md:text-xl lg:text-2xl',
    h6: 'text-sm sm:text-base md:text-lg lg:text-xl'
  },
  body: {
    large: 'text-lg sm:text-xl md:text-2xl',
    base: 'text-base sm:text-lg',
    small: 'text-sm sm:text-base',
    xs: 'text-xs sm:text-sm'
  }
} as const;

// Grid system utilities
export const grid = {
  responsive: {
    single: 'grid-cols-1',
    twoCol: 'grid-cols-1 md:grid-cols-2',
    threeCol: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    fourCol: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    autoFit: 'grid-cols-[repeat(auto-fit,minmax(300px,1fr))]',
    autoFill: 'grid-cols-[repeat(auto-fill,minmax(250px,1fr))]'
  },
  gaps: {
    small: 'gap-2 sm:gap-3 md:gap-4',
    medium: 'gap-4 sm:gap-6 md:gap-8',
    large: 'gap-6 sm:gap-8 md:gap-12',
    xl: 'gap-8 sm:gap-12 md:gap-16'
  }
} as const;

// Flexbox utilities for responsive layouts
export const flex = {
  direction: {
    responsive: 'flex-col lg:flex-row',
    reverseResponsive: 'flex-col-reverse lg:flex-row-reverse'
  },
  wrap: {
    responsive: 'flex-wrap'
  },
  justify: {
    centerOnMobile: 'justify-center lg:justify-start',
    spaceBetween: 'justify-between',
    spaceAround: 'justify-around',
    center: 'justify-center'
  },
  align: {
    centerOnMobile: 'items-center lg:items-start',
    center: 'items-center',
    stretch: 'items-stretch'
  }
} as const;

// Image and media responsive utilities
export const media = {
  aspectRatio: {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[16/9]',
    ultraWide: 'aspect-[21/9]'
  },
  objectFit: {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill'
  },
  sizes: {
    avatar: 'w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12',
    icon: 'w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6',
    logo: 'w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40'
  }
} as const;

// Animation utilities that work well with responsive design
export const animation = {
  entrance: {
    fadeInUp: 'animate-in slide-in-from-bottom-4 fade-in duration-700',
    fadeInLeft: 'animate-in slide-in-from-left-4 fade-in duration-700',
    fadeInRight: 'animate-in slide-in-from-right-4 fade-in duration-700',
    stagger: (delay: number) => `animation-delay-${delay * 100}`
  }
} as const;

// Performance optimizations
export const debounce = <T extends (...args: unknown[]) => unknown>(func: T, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Enhanced responsive image loader
export const useResponsiveImageLoader = () => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = useCallback(() => setLoaded(true), []);
  const handleError = useCallback(() => setError(true), []);

  return { loaded, error, handleLoad, handleError };
};

// Viewport-based performance optimization
export const useViewportOptimization = () => {
  const [isInViewport, setIsInViewport] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInViewport(entry.isIntersecting),
      { rootMargin: '50px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isInViewport };
};

// Utility function to combine responsive classes
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Helper function to create responsive padding
export function responsivePadding(size: 'sm' | 'md' | 'lg' | 'xl' = 'md'): string {
  const sizes = {
    sm: 'px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16',
    md: 'px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20',
    lg: 'px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24',
    xl: 'px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32'
  };
  return sizes[size];
}

// Helper function to create responsive container
export function responsiveContainer(size: keyof typeof containerSizes = 'xl'): string {
  return cn(
    'mx-auto w-full',
    containerSizes[size],
    'px-4 sm:px-6 lg:px-8'
  );
}

// Helper function for responsive text alignment
export function responsiveTextAlign(mobile: 'left' | 'center' | 'right' = 'center', desktop: 'left' | 'center' | 'right' = 'left'): string {
  const mobileClass = `text-${mobile}`;
  const desktopClass = `lg:text-${desktop}`;
  return cn(mobileClass, desktopClass);
}

// Common responsive patterns
export const patterns = {
  // Hero section layout
  hero: cn(
    'min-h-screen flex items-center justify-center',
    'px-4 sm:px-6 lg:px-8',
    'pt-16 sm:pt-20'
  ),
  
  // Card grid layout
  cardGrid: cn(
    'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    'gap-6 sm:gap-8 lg:gap-10'
  ),
  
  // Two column layout
  twoColumn: cn(
    'grid grid-cols-1 lg:grid-cols-2',
    'gap-8 lg:gap-12 items-center'
  ),
  
  // Navigation responsive
  nav: cn(
    'flex items-center justify-between',
    'px-4 sm:px-6 lg:px-8',
    'py-4 sm:py-6'
  ),
    // Button group responsive
  buttonGroup: cn(
    'flex flex-col sm:flex-row',
    'gap-3 sm:gap-4',
    'justify-center lg:justify-start'
  )
} as const;

// Hook to get current screen size
export function useScreenSize() {
  const [screenSize, setScreenSize] = useState<{
    width: number;
    height: number;
    breakpoint: BreakpointKey | 'xs';
  }>({
    width: 0,
    height: 0,
    breakpoint: 'xs',
  });

  useEffect(() => {
    function updateScreenSize() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      let breakpoint: BreakpointKey | 'xs' = 'xs';
      
      if (width >= BREAKPOINTS['2xl']) {
        breakpoint = '2xl';
      } else if (width >= BREAKPOINTS.xl) {
        breakpoint = 'xl';
      } else if (width >= BREAKPOINTS.lg) {
        breakpoint = 'lg';
      } else if (width >= BREAKPOINTS.md) {
        breakpoint = 'md';
      } else if (width >= BREAKPOINTS.sm) {
        breakpoint = 'sm';
      }

      setScreenSize({ width, height, breakpoint });
    }

    // Initial call
    updateScreenSize();

    // Add event listener
    window.addEventListener('resize', updateScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  return screenSize;
}

// Hook to check if screen matches a breakpoint
export function useBreakpoint(breakpoint: BreakpointKey) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const query = `(min-width: ${BREAKPOINTS[breakpoint]}px)`;
    const media = window.matchMedia(query);
    
    const updateMatch = () => setMatches(media.matches);
    updateMatch();
    
    media.addEventListener('change', updateMatch);
    return () => media.removeEventListener('change', updateMatch);
  }, [breakpoint]);

  return matches;
}

// Hook to check if user prefers reduced motion
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const query = '(prefers-reduced-motion: reduce)';
    const media = window.matchMedia(query);
    
    const updatePreference = () => setPrefersReducedMotion(media.matches);
    updatePreference();
    
    media.addEventListener('change', updatePreference);
    return () => media.removeEventListener('change', updatePreference);
  }, []);

  return prefersReducedMotion;
}

// Hook to check if user prefers dark mode
export function usePrefersDarkMode() {
  const [prefersDarkMode, setPrefersDarkMode] = useState(false);

  useEffect(() => {
    const query = '(prefers-color-scheme: dark)';
    const media = window.matchMedia(query);
    
    const updatePreference = () => setPrefersDarkMode(media.matches);
    updatePreference();
    
    media.addEventListener('change', updatePreference);
    return () => media.removeEventListener('change', updatePreference);
  }, []);

  return prefersDarkMode;
}

// Container query hook for component-level responsiveness
export function useContainerQuery(containerRef: React.RefObject<HTMLElement | null>) {
  const [containerSize, setContainerSize] = useState<{
    width: number;
    height: number;
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  }>({
    width: 0,
    height: 0,
    size: 'xs',
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        
        let size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'xs';
        
        if (width >= 1024) {
          size = 'xl';
        } else if (width >= 768) {
          size = 'lg';
        } else if (width >= 640) {
          size = 'md';
        } else if (width >= 480) {
          size = 'sm';
        }

        setContainerSize({ width, height, size });
      }
    });

    observer.observe(containerRef.current);
    
    return () => observer.disconnect();
  }, [containerRef]);

  return containerSize;
}

// Animation variants based on user preferences
export function getAnimationVariants(prefersReducedMotion: boolean) {
  if (prefersReducedMotion) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.01 },
    };
  }

  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.6, ease: 'easeOut' },
  };
}

// Enhanced animation variants based on motion preferences
export const getAdaptiveAnimationVariants = (prefersReducedMotion: boolean) => ({
  initial: { 
    opacity: 0, 
    y: prefersReducedMotion ? 0 : 20,
    scale: prefersReducedMotion ? 1 : 0.95
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: prefersReducedMotion ? 0.01 : 0.5,
      ease: 'easeOut'
    }
  },
  exit: { 
    opacity: 0, 
    y: prefersReducedMotion ? 0 : -20,
    transition: {
      duration: prefersReducedMotion ? 0.01 : 0.3
    }
  }
});

// Responsive font size calculator using fluid typography
export function getFluidFontSize(
  minSize: number,
  maxSize: number,
  minViewport: number = 320,
  maxViewport: number = 1200
): string {
  const slope = (maxSize - minSize) / (maxViewport - minViewport);
  const yAxisIntersection = -minViewport * slope + minSize;
  
  return `clamp(${minSize}px, ${yAxisIntersection}px + ${slope * 100}vw, ${maxSize}px)`;
}

// Device detection utilities
export function getDeviceType(width: number): 'mobile' | 'tablet' | 'desktop' {
  if (width < BREAKPOINTS.md) return 'mobile';
  if (width < BREAKPOINTS.lg) return 'tablet';
  return 'desktop';
}

// Touch device detection
export function isTouchDevice(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// High DPI detection
export function isHighDPI(): boolean {
  return window.devicePixelRatio > 1.5;
}

export default {
  breakpoints,
  containerSizes,
  spacing,
  typography,
  grid,
  flex,
  media,
  animation,
  patterns,
  cn,
  responsivePadding,
  responsiveContainer,
  responsiveTextAlign
};
