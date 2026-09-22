import { h } from 'vue';
import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';

import SponsorButton from './SponsorButton.vue';
import RepoCard from './RepoCard.vue';
import ProjectsGrid from './ProjectsGrid.vue';
import './custom.css';

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(SponsorButton),
    });
  },
  enhanceApp({ app }) {
    app.component('RepoCard', RepoCard);
    app.component('ProjectsGrid', ProjectsGrid);
  },
} satisfies Theme;
