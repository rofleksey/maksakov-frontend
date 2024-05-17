<template>
  <div class="w-full flex justify-center relative">
    <SiteHeader/>
    <CartDrawer/>
    <MenuDrawer/>

    <main id="main">
      <slot/>
    </main>
  </div>
</template>
<script lang="ts" setup>
import SiteHeader from "~/components/header/SiteHeader.vue";
import MenuDrawer from "~/components/header/MenuDrawer.vue";
</script>
