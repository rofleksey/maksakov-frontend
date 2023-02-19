<template>
  <div class="Banner">
    <slot></slot>
  </div>
</template>

<style scoped>
.Banner {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: content-box;
  font: var(--font-raleway);
  width: 100%;
  background-color: var(--color-banner);
  height: 48px;
  letter-spacing: 0.3em;
  color: var(--color-secondary);
  text-align: center;
  font-size: 13px;
}
</style>
