<script setup lang="ts">
import IconPrev from "@/components/icons/IconPrev.vue";

interface Props {
  text: string;
  link: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="BreadcrumbBack no-select">
    <IconPrev />
    <RouterLink :to="props.link">
      {{ props.text }}
    </RouterLink>
  </div>
</template>

<style scoped>
.BreadcrumbBack {
  color: var(--color-secondary);
  font: var(--font-din-next);
  text-transform: capitalize;
  display: flex;
  flex-direction: row;
  gap: 5px;
}
</style>
