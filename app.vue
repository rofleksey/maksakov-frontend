<template>
  <NuxtNotifications :speed="500" position="bottom left"/>
  <NuxtLoadingIndicator color="#9E7076"/>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>

<script lang="ts" setup>
// TODO: fix links
// TODO: sitemap
// TODO: check localstorage
// TODO: test order

// TODO: improve email

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

<style lang="sass">
//@import @/assets/main.sass
</style>

<style lang="sass">
.page-enter-active, .page-leave-active
  transition: opacity 0.3s ease

.page-enter-from, .page-leave-to
  opacity: 0
</style>
