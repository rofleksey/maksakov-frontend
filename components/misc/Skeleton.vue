<script lang="ts" setup>
interface Props {
  width?: number | string;
  height?: number | string;
}

const props = withDefaults(defineProps<Props>(), {
  width: "100%",
  height: "100%",
});
</script>

<template>
  <div
      :style="{ width: props.width, height: props.height }"
      class="Skeleton"
  ></div>
</template>

<style lang="sass">
.Skeleton
  @apply relative overflow-hidden bg-[rgba(0,0,0,0.12)] block

.Skeleton:after
  @apply absolute w-full h-full -translate-x-full content-[""] left-0 top-0
  background-image: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5), rgba(37, 22, 22, 0))
  animation: shimmer 1s infinite

@keyframes shimmer
  100%
    transform: translateX(100%)
</style>
