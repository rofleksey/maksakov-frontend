<template>
  <div class="Banner">
    <slot></slot>
  </div>
</template>

<style lang="sass" scoped>
.Banner
  font: var(--font-raleway)
  @apply flex justify-center items-center box-content w-full bg-[color:var(--color-banner)] h-12 tracking-[0.3em] text-[color:var(--color-secondary)] text-center text-[13px]
</style>
