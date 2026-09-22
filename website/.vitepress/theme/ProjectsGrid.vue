<script setup lang="ts">
import { ref, onMounted } from 'vue';

import RepoCard from './RepoCard.vue';
import repos from '../../projects.json';

interface RepoEntry {
  repo: string;
  description: string | null;
  stars: number | null;
}

const loading = ref(true);
const entries = ref<RepoEntry[]>(repos.map((repo) => ({ repo, description: null, stars: null })));

onMounted(async () => {
  const results = await Promise.all(
    repos.map(async (repo): Promise<RepoEntry> => {
      try {
        const res = await fetch(`https://api.github.com/repos/${repo}`);
        if (!res.ok) throw new Error('request failed');

        const data = await res.json();
        return {
          repo,
          description: data.description ?? null,
          stars: data.stargazers_count ?? null,
        };
      } catch {
        return { repo, description: null, stars: null };
      }
    }),
  );

  entries.value = results.sort((a, b) => (b.stars ?? -1) - (a.stars ?? -1));
  loading.value = false;
});
</script>

<template>
  <div class="projects-grid" :class="{ loading }">
    <RepoCard v-for="entry in entries" :key="entry.repo" :repo="entry.repo" :description="entry.description" :stars="entry.stars" />
  </div>
</template>

<style scoped>
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  transition: opacity 0.15s;
}

.projects-grid.loading {
  opacity: 0.6;
}
</style>
