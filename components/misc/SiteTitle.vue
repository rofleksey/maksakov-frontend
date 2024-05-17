<script lang="ts" setup>
interface Props {
  light?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  light: false,
});
</script>

<template>
  <div
      :class="{ light: props.light, heavy: !props.light }"
      class="w-full text-[color:var(--color-secondary)] text-center">
    <slot></slot>
  </div>
</template>

<style lang="sass" scoped>
.heavy
  font: var(--font-din-next)
  @apply font-bold tracking-[10.8px] text-4xl

.light
  font: var(--font-raleway)
  @apply text-[28px]
</style>
