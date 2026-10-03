import { createTheme } from '../shared/theme';

import ProjectsGrid from './ProjectsGrid.vue';
import RepoCard from './RepoCard.vue';
// Must come after the theme so the brand colors win
import './custom.css';

export default createTheme({
  donate: 'github',
  enhanceApp({ app }) {
    app.component('RepoCard', RepoCard);
    app.component('ProjectsGrid', ProjectsGrid);
  },
});
