<script lang="ts" setup>
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
  <div class="Breadcrumb no-select capitalize">
    <template v-for="(segment, index) in props.segments" :key="segment.text">
      <span
          v-if="index === props.segments.length - 1"
          class="py-0 px-[3px] opacity-60"
      >
        {{ segment.text }}
      </span>
      <RouterLink v-else :to="segment.path" class="py-0 px-[3px]">
        {{ segment.text }}
      </RouterLink>
      <span v-if="index !== props.segments.length - 1">{{ slashRef }}</span>
    </template>
  </div>
</template>

<style lang="sass" scoped>
.Breadcrumb > *
  font: var(--font-din-next)
  color: var(--color-secondary)
</style>
