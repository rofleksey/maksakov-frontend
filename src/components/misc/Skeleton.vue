<script setup lang="ts">
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
    class="Skeleton"
    :style="{ width: props.width, height: props.height }"
  ></div>
</template>

<style>
.Skeleton {
  position: relative;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.12);
  display: block;
}

.Skeleton:after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translateX(-100%);
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.5),
    rgba(37, 22, 22, 0)
  );
  animation: shimmer 1s infinite;
  content: "";
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>
