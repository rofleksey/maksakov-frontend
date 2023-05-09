<script setup lang="ts">
interface Props {
  light?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  light: false,
});
</script>

<template>
    <div :class="{ Title: true, light: props.light, heavy: !props.light }">
        <slot></slot>
    </div>
</template>

<style scoped>
.Title {
  width: 100%;
  color: var(--color-secondary);
  text-align: center;
}

.Title.heavy {
  font: var(--font-din-next);
  font-weight: 700;
  letter-spacing: 10.8px;
  font-size: 36px;
}

.Title.light {
  font: var(--font-raleway);
  font-size: 28px;
}
</style>
