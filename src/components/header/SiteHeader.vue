<script setup lang="ts">
import HeaderLogo from "@/components/header/HeaderLogo.vue";
import HeaderMenu from "@/components/header/HeaderMenu.vue";
import IconCart from "@/components/icons/IconCart.vue";
import IconMenu from "@/components/icons/IconMenu.vue";
import { useMenuDrawerStore } from "@/stores/store";

const menuDrawerStore = useMenuDrawerStore();
</script>

<template>
  <header class="Header no-select">
    <div class="Header__container">
      <IconMenu class="Header__IconMenu" @click="menuDrawerStore.open" />
      <HeaderLogo class="Header__HeaderLogo" />
      <HeaderMenu class="Header__HeaderMenu" />
      <IconCart class="Header__IconCart" />
    </div>
  </header>
</template>

<style scoped>
.Header {
  z-index: 50;
  position: fixed;
  top: 0;
  display: flex;
  box-sizing: content-box;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: calc(100vw - (100vw - 100%));
  height: var(--header-height);
}

.Header__container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  gap: 50px;
  padding: 25px 0;
  border-top: 1px solid rgba(var(--rgba-primary-faint));
  border-bottom: 1px solid rgba(var(--rgba-primary-faint));
  width: 100%;
}

.Header__IconCart {
  width: 33px;
  height: 39px;
  flex-shrink: 0;
}

.Header__IconMenu {
  display: none;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  cursor: pointer;
}

@media (max-width: 1000px) {
  .Header__HeaderMenu {
    display: none;
  }

  .Header__IconMenu {
    display: block;
  }

  .Header__container {
    gap: 33px;
  }
}
</style>
