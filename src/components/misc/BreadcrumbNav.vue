<script setup lang="ts">
import {ref} from "vue";

interface Segment {
  text: string;
  path: string;
}

interface Props {
  segments: Segment[];
}

const props = defineProps<Props>();

const slashRef = ref("/");
</script>

<template>
  <div class="Breadcrumb no-select">
      <template v-for="(segment, index) in props.segments" :key="segment.text">
      <span
              v-if="index === props.segments.length - 1"
              class="Breadcrumb__link active"
      >
        {{ segment.text }}
      </span>
          <RouterLink v-else :to="segment.path" class="Breadcrumb__link">
              {{ segment.text }}
          </RouterLink>
          <span v-if="index !== props.segments.length - 1">{{ slashRef }}</span>
    </template>
  </div>
</template>

<style scoped>
.Breadcrumb > * {
  color: var(--color-secondary);
  font: var(--font-din-next);
  text-transform: capitalize;
}

.Breadcrumb__link {
  padding: 0 3px;
}

.Breadcrumb__link.active {
  opacity: 0.6;
}
</style>
