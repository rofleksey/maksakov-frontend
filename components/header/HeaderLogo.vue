<template>
  <RouterLink class="flex flex-row items-center gap-2.5 cursor-pointer" to="/">
    <img alt="logo" class="HeaderLogo__img" src="@/assets/logo.png"/>
    <div class="mt-2.5">
      <div class="text-[27px] font-bold text-[color:var(--color-primary)] mb-2">МАКСАКОВ</div>
      <div class="HeaderLogo__title__secondary">изделия ручной работы</div>
    </div>
  </RouterLink>
</template>

<style lang="sass" scoped>
.HeaderLogo__title__secondary
  font: var(--font-din-next)
  @apply text-[15px] text-[color:var(--color-secondary)]

.HeaderLogo__img
  @apply w-[79px] h-[63px] object-cover

@media (max-width: 1000px)
  .HeaderLogo__img
    display: none
</style>
