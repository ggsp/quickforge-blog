# Quickforge Blog

Official blog for Quickforge, focused on practical AI automation solutions for businesses.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Type check
npm run typecheck

# Build for production
npm run build
```

## Writing Blog Posts

Create a new file in the `blog` directory with format: `YYYY-MM-DD-slug-name.md`

```markdown
---
slug: your-post-slug
title: Your Post Title
authors: [quickforge]  # or [greg, alex]
tags: [ai-automation, integration]
description: Brief description for SEO
---

Introduction paragraph...

<!-- truncate -->

Rest of your content...
```

### Available Authors

Defined in `blog/authors.yml`:
- `quickforge` - Quickforge Team
- `greg` - Greg (Co-founder)
- `alex` - Alex (Co-founder)

### Available Tags

Defined in `blog/tags.yml`:
- `ai-automation`, `case-study`, `integration`, `best-practices`
- `roi`, `crm`, `erp`, `workflow`, `tutorial`, `industry`

## Deployment

The blog automatically deploys to Vercel when pushing to the `master` branch.

### Environment Variables (Optional)

For analytics, set in Vercel dashboard:
- `POSTHOG_KEY` - PostHog project key
- `POSTHOG_HOST` - PostHog host (defaults to https://app.posthog.com)

## Tech Stack

- **Framework**: Docusaurus 3
- **Language**: TypeScript
- **Styling**: Custom CSS with Aeonik fonts
- **Deployment**: Vercel
- **Analytics**: PostHog (optional)

## Development

```bash
# Format code
npm run format

# Check formatting
npm run format:check

# Serve production build locally
npm run serve
```

## License

© 2025 Quickforge. All rights reserved.