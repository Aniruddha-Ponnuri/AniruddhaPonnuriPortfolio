// Smooth scroll utility for navigation
export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const navHeight = 64; // Height of fixed navigation
    const elementPosition = element.offsetTop;
    const offsetPosition = elementPosition - navHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

// Check if element is in viewport
export const isElementInViewport = (el: Element, threshold = 0.6) => {
  const rect = el.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  
  return rect.top <= windowHeight * (1 - threshold) && rect.bottom >= windowHeight * threshold;
};

// Get currently active section
export const getCurrentSection = (sections: string[]): string => {
  for (const sectionId of sections) {
    const element = document.getElementById(sectionId);
    if (element && isElementInViewport(element)) {
      return sectionId;
    }
  }
  return sections[0] || 'home';
};
