<script lang="ts" setup>
import IconPrev from "@/components/icons/IconPrev.vue";

interface Props {
  text: string;
  link: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="BreadcrumbBack no-select capitalize flex flex-row gap-[5px]">
    <IconPrev/>
    <RouterLink :to="props.link">
      {{ props.text }}
    </RouterLink>
  </div>
</template>

<style lang="sass" scoped>
.BreadcrumbBack
  font: var(--font-din-next)
  color: var(--color-secondary)
</style>
