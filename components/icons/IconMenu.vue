<template>
  <svg class="IconMenu" preserveAspectRatio="none" viewBox="0 0 17 17">
    <line class="IconMenu__line1" x2="100%"></line>
    <line class="IconMenu__line2" x2="100%"></line>
    <line class="IconMenu__line3" x2="100%"></line>
  </svg>
</template>

<style scoped>
.IconMenu {
  stroke-width: 2;
  stroke: var(--color-primary);
  overflow: visible;
}

.IconMenu__line1 {
  transform: translateY(0.5px);
}

.IconMenu__line2 {
  transform: translateY(8.5px);
}

.IconMenu__line3 {
  transform: translateY(16.5px);
}
</style>
