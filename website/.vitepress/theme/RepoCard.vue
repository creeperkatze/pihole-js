<script setup lang="ts">
import { Star } from '@lucide/vue';

const props = defineProps<{
  repo: string; // "owner/name"
  description?: string | null;
  stars?: number | null;
}>();

const [owner, name] = props.repo.split('/');

function formatCount(count: number): string {
  return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : `${count}`;
}
</script>

<template>
  <a
    :href="`https://github.com/${repo}`"
    target="_blank"
    rel="noopener noreferrer"
    class="repo-card"
  >
    <div class="box">
      <img class="avatar" :src="`https://github.com/${owner}.png?size=64`" :alt="owner" loading="lazy" />
      <div class="content">
        <div class="title-row">
          <span class="title">{{ name }}</span>
          <span v-if="stars != null" class="stars">
            <Star class="stars-icon" :stroke-width="2" />
            {{ formatCount(stars) }}
          </span>
        </div>
        <p v-if="description" class="details">{{ description }}</p>
      </div>
    </div>
  </a>
</template>

<style scoped>
.repo-card {
  display: block;
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  height: 100%;
  background-color: var(--vp-c-bg-soft);
  text-decoration: none !important;
  color: inherit;
  transition: border-color 0.25s, background-color 0.25s;
}

.repo-card:hover {
  border-color: var(--vp-c-brand-1);
}

.box {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  height: 100%;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  flex-shrink: 0;
}

.content {
  flex-grow: 1;
  min-width: 0;
}

.title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.title {
  line-height: 24px;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.stars {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.stars-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

.details {
  padding-top: 4px;
  line-height: 20px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}
</style>
