# 🚀 Vercel Deployment Guide

Complete guide for deploying your Next.js portfolio to Vercel with all features working.

## 📋 Pre-Deployment Checklist

### ✅ **Code Preparation**
- [ ] All TypeScript errors resolved
- [ ] Local build successful (`npm run build`)
- [ ] Environment variables identified
- [ ] Images optimized and in correct directories
- [ ] API routes tested locally

### ✅ **Repository Setup**
- [ ] Code pushed to GitHub
- [ ] Repository is public or Vercel has access
- [ ] `.env.local.example` file included
- [ ] README.md updated with deployment info

## 🔧 Step-by-Step Deployment

### **1. Prepare Environment Variables**

Create these in your local `.env.local` first:
```bash
GITHUB_TOKEN=ghp_your_token_here
GROQ_API_KEY=gsk_your_groq_key_here
NODE_ENV=production
```

### **2. GitHub Repository Setup**

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Portfolio website ready for deployment"

# Add remote repository
git remote add origin https://github.com/your-username/portfolio-github.git

# Push to GitHub
git push -u origin main
```

### **3. Vercel Account Setup**

1. **Sign Up**: Go to [vercel.com](https://vercel.com)
2. **GitHub Integration**: Choose "Continue with GitHub"
3. **Authorize**: Grant Vercel access to your repositories

### **4. Import Project**

1. **New Project**: Click "New Project" in Vercel dashboard
2. **Import Repository**: Find and select your portfolio repository
3. **Configure Project**:
   - **Project Name**: `portfolio-aniruddha` (or your preference)
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

### **5. Environment Variables Setup**

In Vercel project settings:

1. Go to **Settings** → **Environment Variables**
2. Add each variable:

| Variable | Value | Environment |
|----------|--------|-------------|
| `GITHUB_TOKEN` | Your GitHub token | Production, Preview, Development |
| `GROQ_API_KEY` | Your Groq API key | Production, Preview, Development |
| `NODE_ENV` | `production` | Production only |

### **6. Deploy**

Click **"Deploy"** and wait for the build to complete.

## 🔑 API Keys Setup Guide

### **GitHub Personal Access Token**

1. **Go to GitHub Settings**:
   - Click your profile → Settings
   - Developer settings → Personal access tokens → Tokens (classic)

2. **Generate New Token**:
   - Click "Generate new token (classic)"
   - Name: "Portfolio Website Vercel"
   - Expiration: No expiration (or 1 year)

3. **Select Scopes**:
   ```
   ✅ repo (Full control of private repositories)
   ✅ read:user (Read user profile data)
   ✅ user:email (Access user email addresses)
   ```

4. **Generate and Copy**: Save the token securely

### **Groq API Key**

1. **Visit Groq Console**: [console.groq.com](https://console.groq.com)
2. **Create Account**: Sign up with GitHub/Google
3. **Generate API Key**:
   - Go to API Keys section
   - Click "Create API Key"
   - Name: "Portfolio Website"
   - Copy the key (starts with `gsk_`)

## 🔧 Vercel Configuration

Create `vercel.json` in project root:

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/sitemap.xml",
      "destination": "/api/sitemap"
    }
  ]
}
```

## 🎯 Domain Configuration

### **Custom Domain Setup**

1. **Add Domain**: In Vercel dashboard → Domains
2. **Configure DNS**: Update your domain's DNS settings
3. **SSL Certificate**: Automatic via Vercel

### **Subdomain Examples**
- `portfolio.yourdomain.com`
- `aniruddha.yourdomain.com`
- `dev.yourdomain.com`

## 📊 Post-Deployment Verification

### **✅ Checklist After Deployment**

1. **Basic Functionality**:
   - [ ] Website loads without errors
   - [ ] All sections visible and interactive
   - [ ] Navigation works correctly
   - [ ] Theme switching functional

2. **GitHub Integration**:
   - [ ] Projects section loads GitHub repositories
   - [ ] Repository filtering works
   - [ ] Language detection working
   - [ ] Star counts and dates visible

3. **API Routes**:
   - [ ] `/api/github` returns repository data
   - [ ] `/api/readme` generates AI content (if used)
   - [ ] No 500 errors in functions

4. **Performance**:
   - [ ] Page loads in < 3 seconds
   - [ ] Images load properly
   - [ ] Animations work smoothly
   - [ ] Mobile responsiveness good

5. **Contact Form**:
   - [ ] Form submissions work
   - [ ] Email notifications sent (if configured)
   - [ ] Google Maps loads correctly

## 🔍 Troubleshooting

### **Common Issues**

#### **Build Failures**
```bash
# Check locally first
npm run build

# Common fixes:
npm install
npm run lint --fix
```

#### **Environment Variable Issues**
- Variables not loading → Check Vercel environment settings
- API calls failing → Verify token permissions
- 401 errors → Check token expiration

#### **Image Loading Issues**
- Add domains to `next.config.ts`:
```typescript
images: {
  domains: [
    'avatars.githubusercontent.com',
    'img.shields.io',
    'github.com'
  ],
}
```

#### **Function Timeouts**
- Increase timeout in `vercel.json`
- Optimize API calls
- Add caching where possible

### **Debug Commands**

```bash
# Check deployment logs
vercel logs your-deployment-url

# Run functions locally
vercel dev

# Check environment variables
vercel env ls
```

## 🚀 Continuous Deployment

### **Automatic Deployments**

Vercel automatically deploys when you:
- Push to `main` branch → Production deployment
- Push to other branches → Preview deployment
- Create pull requests → Preview deployment

### **Manual Deployment**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

## 📈 Analytics & Monitoring

### **Vercel Analytics**

Add to `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### **Performance Monitoring**

- **Core Web Vitals**: Automatic monitoring
- **Function Logs**: Available in Vercel dashboard
- **Error Tracking**: Built-in error reporting

## 🔄 Updates & Maintenance

### **Regular Updates**

```bash
# Update dependencies
npm update

# Security updates
npm audit fix

# Deploy updates
git add .
git commit -m "Update: dependencies and security fixes"
git push origin main
```

### **Monitoring**

- Check Vercel dashboard regularly
- Monitor function execution times
- Review Core Web Vitals metrics
- Check for security alerts

## 📞 Support

### **Vercel Support**
- [Vercel Documentation](https://vercel.com/docs)
- [Community Forum](https://github.com/vercel/vercel/discussions)
- Support tickets for Pro users

### **Project Support**
- GitHub Issues for bugs
- Email: aniruddha.ponnuri@gmail.com

---

## 🎉 Success!

Your portfolio is now live! 🚀

**Next Steps**:
1. Share your portfolio URL
2. Update your resume/LinkedIn with the link
3. Monitor performance and user feedback
4. Keep content updated with new projects

**Sample URLs**:
- Production: `https://your-portfolio.vercel.app`
- Custom Domain: `https://aniruddha.dev`
