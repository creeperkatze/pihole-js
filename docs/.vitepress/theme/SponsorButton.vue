<script setup lang="ts">
import KofiIcon from './kofi.svg?component';
</script>

<template>
  <a
    href="https://ko-fi.com/creeperkatze"
    target="_blank"
    rel="noopener noreferrer"
    class="ml-2 inline-flex! items-center gap-1.5 rounded-full bg-[#FF5E5B] text-[13px] font-medium text-white! no-underline transition-opacity duration-150"
    aria-label="Sponsor on Ko-fi"
  >
    <KofiIcon class="size-[15px] shrink-0" />
    Sponsor
  </a>
</template>

<style scoped>
a {
  padding: 4px 12px;
}

a:hover {
  opacity: 0.8;
}
</style>
