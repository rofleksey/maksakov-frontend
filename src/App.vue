<script setup lang="ts">
import {RouterView} from 'vue-router'
import Header from "@/components/header/Header.vue";
import {onMounted, onUnmounted} from "vue";
import CartPopup from "@/components/cart/CartPopup.vue";

function updateVhVar() {
  const doc = document.documentElement;
  doc.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
}

onMounted(() => {
  window.addEventListener("resize", updateVhVar);
  updateVhVar();
});
onUnmounted(() => {
  window.removeEventListener("resize", updateVhVar);
});
</script>

<template>
  <Header/>

  <CartPopup/>

  <main id="main">
    <RouterView v-slot="{ Component, route }">
      <Transition name="App" appear>
        <component :is="Component" :key="route.fullPath"/>
      </Transition>
    </RouterView>
  </main>
</template>

<style>
.App-enter-active,
.App-leave-active {
  transition: opacity 0.5s ease;
}

.App-enter-from {
  opacity: 0;
}

.App-enter-to {
  opacity: 1;
}

.App-leave-from {
  opacity: 1;
}

.App-leave-to {
  opacity: 0;
}
</style>
