# 🚀 Portfolio Website - Ponnuri Aniruddha

<div align="center">

![Portfolio Banner](https://img.shields.io/badge/Portfolio-AI%2FML%20Developer-blue?style=for-the-badge&logo=react&logoColor=white)

[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.9-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.17.0-0055FF?style=flat&logo=framer&logoColor=white)](https://www.framer.com/motion/)

**A modern, responsive portfolio website showcasing AI/ML development expertise with advanced animations and GitHub integration.**

[🌐 Live Demo](https://your-portfolio.vercel.app) • [📧 Contact](mailto:aniruddha.ponnuri@gmail.com) • [💼 LinkedIn](https://linkedin.com/in/your-profile)

</div>

---

## ✨ Features

### 🎨 **Modern Design & User Experience**
- 🌓 **Dark/Light Theme** - Seamless theme switching with system preference detection
- 📱 **Fully Responsive** - Optimized for all device sizes (mobile, tablet, desktop, 4K)
- 🎭 **Advanced Animations** - Framer Motion with reduced motion support for accessibility
- 🎯 **Single Page Application** - Smooth scrolling navigation with section highlighting
- 🖼️ **Image Optimization** - Next.js Image component with WebP/AVIF support

### 🔧 **Advanced Technical Features**
- 📦 **Container Queries** - Granular responsive design at component level
- 🎨 **Variable Fonts** - Inter, Inter Tight, and JetBrains Mono with optical sizing
- 📐 **CSS Grid Level 3** - Modern layout techniques with subgrid support
- 🎪 **Fluid Typography** - Responsive text scaling using clamp() functions
- ⚡ **Performance Optimized** - Core Web Vitals optimization

### 🐙 **GitHub Integration**
- 📊 **Real-time Repository Data** - Live stats, languages, and project information
- 🔍 **Advanced Filtering** - Search by name, language, tags with multi-criteria support
- 📈 **Dynamic Sorting** - Sort by stars, update date, creation date, or name
- 🤖 **AI-Powered README Generation** - Groq AI integration for automatic documentation
- 📋 **Repository Management** - Detailed project cards with live GitHub data

### 📱 **Interactive Sections**
- 🏠 **Hero Section** - Animated introduction with profile image
- 👨‍💻 **About Section** - Background story with visual effects
- 📄 **Resume Section** - Interactive timeline with downloadable CV
- 🛠️ **Skills Section** - Container-aware grid with technology badges
- 💼 **Projects Section** - GitHub-integrated portfolio showcase
- 📞 **Contact Section** - Form integration with Google Maps

---

## 🛠️ Tech Stack

### **Frontend Framework**
- **Next.js 15.3.3** - App Router, Server Components, TypeScript
- **React 19** - Latest features with concurrent rendering
- **TypeScript 5** - Type-safe development environment

### **Styling & UI**
- **Tailwind CSS 4.1.9** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Framer Motion 12.17.0** - Production-ready motion library
- **Lucide React** - Beautiful SVG icon library

### **Data & APIs**
- **TanStack Query 5** - Powerful data synchronization
- **Octokit REST** - GitHub API integration
- **Groq SDK** - AI-powered content generation

### **Development Tools**
- **ESLint 9** - Code linting and formatting
- **PostCSS** - CSS preprocessing
- **Autoprefixer** - CSS vendor prefixing

---

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18.17 or later
- npm, yarn, or pnpm
- Git

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/portfolio-github.git
   cd portfolio-github
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Add your API keys to `.env.local`:
   ```env
   GITHUB_TOKEN=your_github_personal_access_token
   GROQ_API_KEY=your_groq_api_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── components/              # Reusable UI components
│   │   ├── layout/             # Navigation, header, footer
│   │   ├── sections/           # Page sections (hero, about, etc.)
│   │   ├── project/            # Project-specific components
│   │   ├── search/             # Search and filter components
│   │   └── ui/                 # Base UI components
│   ├── api/                    # API routes
│   │   ├── github/             # GitHub data fetching
│   │   └── readme/             # AI README generation
│   ├── lib/                    # Utility functions
│   │   ├── github.ts           # GitHub API utilities
│   │   ├── groq.ts             # Groq AI integration
│   │   ├── responsive.ts       # Responsive design utilities
│   │   └── utils.ts            # General utilities
│   ├── types/                  # TypeScript type definitions
│   └── globals.css             # Global styles
└── components/                  # Shared component library
    └── ui/                     # Radix UI components
```

---

## 🔧 Configuration

### **Environment Variables**

| Variable | Description | Required |
|----------|-------------|----------|
| `GITHUB_TOKEN` | GitHub Personal Access Token for API access | ✅ |
| `GROQ_API_KEY` | Groq API key for AI README generation | ✅ |
| `NODE_ENV` | Environment (development/production) | Auto-set |

### **GitHub Token Setup**
1. Go to GitHub Settings → Developer Settings → Personal Access Tokens
2. Generate new token (classic)
3. Select scopes: `repo`, `read:user`, `user:email`
4. Copy token to `.env.local`

### **Groq API Setup**
1. Visit [Groq Console](https://console.groq.com/)
2. Create account and generate API key
3. Add key to `.env.local`

---

## 🚀 Deployment

### **Deploy to Vercel (Recommended)**

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy via Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard
   - Deploy automatically

3. **Custom Domain** (Optional)
   - Add domain in Vercel dashboard
   - Update DNS settings as instructed

### **Deploy via CLI**
```bash
npm i -g vercel
vercel login
vercel --prod
```

---

## ⚡ Performance

### **Optimization Features**
- 🖼️ **Image Optimization** - WebP/AVIF with responsive sizing
- 📦 **Code Splitting** - Automatic route-based splitting
- 🗜️ **Compression** - Gzip/Brotli compression enabled
- 🎯 **Tree Shaking** - Dead code elimination
- 📊 **Bundle Analysis** - Webpack bundle analyzer

### **Core Web Vitals**
- **LCP** < 2.5s (Largest Contentful Paint)
- **FID** < 100ms (First Input Delay)
- **CLS** < 0.1 (Cumulative Layout Shift)

---

## 🎨 Customization

### **Theming**
```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        // Add your brand colors
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui'],
        tight: ['var(--font-inter-tight)', 'system-ui'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
    },
  },
}
```

### **Content Updates**
- **Personal Info**: Update `src/app/components/sections/hero.tsx`
- **Skills**: Modify `src/app/components/sections/skills.tsx`
- **Contact Info**: Edit `src/app/components/sections/contact.tsx`

---

## 🧪 Testing

### **Development Testing**
```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build testing
npm run build
npm run start
```

### **Performance Testing**
- Lighthouse CI integration
- Core Web Vitals monitoring
- Bundle size analysis

---

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit changes** (`git commit -m 'Add amazing feature'`)
4. **Push to branch** (`git push origin feature/amazing-feature`)
5. **Open Pull Request**

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Next.js Team** - Incredible framework and developer experience
- **Vercel** - Seamless deployment platform
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library
- **Radix UI** - Accessible component primitives

---

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ using Next.js, TypeScript, and Tailwind CSS

</div>
