import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Quickforge Blog',
  tagline: 'Practical AI Automation for Business',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://blog.quickforge.ai',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'quickforge', // Usually your GitHub org/user name.
  projectName: 'quickforge-blog', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: false, // Blog only
        blog: {
          routeBasePath: '/',
          showReadingTime: true,
          blogSidebarTitle: 'Recent posts',
          blogSidebarCount: 10,
          postsPerPage: 12,
          feedOptions: {
            type: 'all',
            copyright: `Copyright © ${new Date().getFullYear()} Quickforge`,
          },
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/quickforge-social-card.png',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    metadata: [
      {name: 'keywords', content: 'AI automation, business automation, workflow optimization, CRM integration, ERP automation, AI consulting'},
      {name: 'description', content: 'Learn how to implement practical AI automation solutions that connect to your existing business tools. Real implementation guides and case studies.'},
      {property: 'og:description', content: 'Learn how to implement practical AI automation solutions that connect to your existing business tools. Real implementation guides and case studies.'},
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:site', content: '@quickforge'},
    ],
    navbar: {
      title: 'Quickforge',
      logo: {
        alt: 'Quickforge Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          href: 'https://quickforge.ai',
          label: 'Main Site',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Quickforge. AI Automation That Actually Works.`,
    },
    prism: {
      theme: prismThemes.vsDark,
      darkTheme: prismThemes.vsDark,
      additionalLanguages: ['typescript', 'python', 'bash', 'json', 'yaml'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
