# Quickforge Blog

This is the official blog for Quickforge, focused on practical AI automation solutions for businesses.

## Overview

Built with Docusaurus 2, this blog features:

- Custom Quickforge branding and design system
- SEO optimization for maximum visibility
- PostHog analytics integration
- Responsive design with dark mode support
- Fast page loads with optimized fonts and images

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/quickforge/quickforge-blog.git
cd quickforge-blog

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your actual values
```

### Development

```bash
# Start development server
npm start

# Type checking
npm run typecheck

# Build for production
npm run build

# Test production build locally
npm run serve
```

## Writing Blog Posts

### Creating a New Post

1. Create a new file in the `blog` directory with the format: `YYYY-MM-DD-slug-name.md`
2. Add front matter with required metadata:

```markdown
---
slug: your-post-slug
title: Your Post Title
authors: [greg, alex, quickforge]
tags: [ai-automation, integration, case-study]
image: /img/blog/your-post-image.png
description: A brief description for SEO and social sharing
keywords: [keyword1, keyword2, keyword3]
---

Your introduction paragraph here...

<!-- truncate -->

Rest of your post content...
```

### Available Authors

Authors are defined in `blog/authors.yml`:

- `quickforge` - Quickforge Team
- `greg` - Greg (Co-founder)
- `alex` - Alex (Co-founder)

### Available Tags

Tags are defined in `blog/tags.yml`:

- `ai-automation` - General AI automation topics
- `case-study` - Client success stories
- `integration` - Tool integration guides
- `best-practices` - Implementation best practices
- `roi` - ROI and business impact
- `crm`, `erp` - Specific system integrations
- `workflow` - Workflow optimization
- `tutorial` - Step-by-step guides
- `industry` - Industry-specific content

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repo to Vercel
2. Set environment variables in Vercel dashboard:
   - `REACT_APP_POSTHOG_KEY`
   - `REACT_APP_POSTHOG_HOST`
3. Deploy automatically on push to main

### GitHub Actions

The project includes a GitHub Actions workflow that:

1. Runs type checking and builds on every PR
2. Deploys to Vercel on merge to main

Required GitHub Secrets:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
- `POSTHOG_KEY`
- `POSTHOG_HOST`

### Manual Deployment

```bash
# Build the site
npm run build

# The build output will be in the `build` directory
# Upload this directory to your hosting provider
```

## Customization

### Styling

- Colors and fonts are defined in `src/css/custom.css`
- Matches the main Quickforge site design system
- Uses custom Aeonik font family

### Configuration

- Main config: `docusaurus.config.ts`
- SEO settings are in the themeConfig metadata
- Blog settings control sidebar, pagination, and RSS

## Analytics

PostHog is integrated for privacy-friendly analytics:

- Page views are automatically tracked
- Custom events can be added in blog posts
- Dashboard available at app.posthog.com

## Contributing

1. Create a feature branch
2. Write your blog post
3. Test locally with `npm run build`
4. Submit a pull request
5. GitHub Actions will validate the build

## Support

For questions or issues:

- Create an issue in this repository
- Contact the team at team@quickforge.ai
- Visit [quickforge.ai](https://quickforge.ai)

## License

© 2025 Quickforge. All rights reserved.
