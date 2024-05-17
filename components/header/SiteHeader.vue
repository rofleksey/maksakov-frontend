<script lang="ts" setup>
import HeaderLogo from "@/components/header/HeaderLogo.vue";
import HeaderMenu from "@/components/header/HeaderMenu.vue";
import IconCart from "@/components/icons/IconCart.vue";
import IconMenu from "@/components/icons/IconMenu.vue";
import {useMenuDrawerStore} from "~/stores/menu-store";

const menuDrawerStore = useMenuDrawerStore();
</script>

<template>
  <header class="Header no-select">
    <div class="Header__container">
      <IconMenu class="Header__IconMenu" @click="menuDrawerStore.open"/>
      <HeaderLogo class="Header__HeaderLogo"/>
      <HeaderMenu class="Header__HeaderMenu"/>
      <IconCart class="Header__IconCart"/>
    </div>
  </header>
</template>

<style lang="sass" scoped>
.Header
  @apply z-50 fixed flex box-content flex-col justify-center items-center bg-white
  @apply w-[calc(100vw_-_(100vw_-_100%))] h-[var(--header-height)] top-0

.Header__container
  @apply flex flex-row justify-center items-center flex-nowrap gap-[50px] w-full

.Header__IconCart
  @apply w-[33px] h-[39px] shrink-0

.Header__IconMenu
  @apply hidden w-8 h-8 shrink-0 cursor-pointer

@media (max-width: 1000px)
  .Header__container
    justify-content: space-between
    width: 90%

  .Header__HeaderMenu
    display: none

  .Header__IconMenu
    display: block

  .Header__container
    gap: 33px

</style>
