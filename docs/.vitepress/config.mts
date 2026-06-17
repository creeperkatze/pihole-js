import fs from 'node:fs';
import path from 'node:path';

import tailwindcss from '@tailwindcss/vite';
import svgLoader from 'vite-svg-loader';
import { defineConfig } from 'vitepress';
import { version } from '../../package.json';

function normalizeBase(base: string): string {
  if (!base) return '/';

  const withLeadingSlash = base.startsWith('/') ? base : `/${base}`;
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`;
}

interface SidebarItem {
  text: string;
  link: string;
}

function titleFromSlug(slug: string): string {
  return slug
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function readApiItems(section: string): SidebarItem[] {
  const sectionDir = path.resolve(process.cwd(), 'docs', 'api', section);
  if (!fs.existsSync(sectionDir)) {
    return [];
  }

  return fs
    .readdirSync(sectionDir)
    .filter((file) => file.endsWith('.md'))
    .sort((a, b) => a.localeCompare(b))
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      return {
        text: titleFromSlug(slug),
        link: `/api/${section}/${slug}`,
      };
    });
}

const apiSidebar = [
  {
    text: 'API Reference',
    items: [{ text: 'Overview', link: '/api/' }],
  },
  {
    text: 'Classes',
    collapsed: false,
    items: readApiItems('classes'),
  },
  {
    text: 'Interfaces',
    collapsed: true,
    items: readApiItems('interfaces'),
  },
  {
    text: 'Type Aliases',
    collapsed: true,
    items: readApiItems('type-aliases'),
  },
];

const base = normalizeBase(process.env.DOCS_BASE ?? '/');

export default defineConfig({
  vite: {
    plugins: [tailwindcss(), svgLoader()],
  },
  title: 'pihole-js',
  description: 'A framework-agnostic JavaScript client for the Pi-hole v6 API.',
  base,
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/' },
      {
        text: `v${version}`,
        items: [
          { text: 'Changelog', link: 'https://github.com/creeperkatze/pihole-js/releases' },
        ],
      },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Authentication', link: '/guide/authentication' },
            { text: 'Sessions and Fetch', link: '/guide/sessions-and-fetch' },
            { text: 'Error Handling', link: '/guide/error-handling' },
            { text: 'Blocking', link: '/guide/blocking' },
            { text: 'Domain Management', link: '/guide/domain-management' },
          ],
        },
      ],
      '/api/': apiSidebar,
      '/': [
        {
          text: 'Guide',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Authentication', link: '/guide/authentication' },
            { text: 'Sessions and Fetch', link: '/guide/sessions-and-fetch' },
            { text: 'Error Handling', link: '/guide/error-handling' },
            { text: 'Blocking', link: '/guide/blocking' },
            { text: 'Domain Management', link: '/guide/domain-management' },
          ],
        },
        ...apiSidebar,
      ],
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/creeperkatze/pihole-js' }],
    search: {
      provider: 'local',
    },
  },
});
