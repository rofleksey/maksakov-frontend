<script setup lang="ts">
interface Props {
  href?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <a class="FooterIcon" target="”_blank”" :href="href">
      <slot></slot>
  </a>
</template>

<style>
.FooterIcon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  background-color: white;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.FooterIcon > * {
  width: 25px;
  height: 25px;
}

.FooterIcon:hover {
  background-color: rgb(150, 150, 150);
}
</style>
