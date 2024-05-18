<template>
  <NuxtNotifications :speed="500" position="bottom left"/>
  <NuxtLoadingIndicator color="#9E7076"/>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>

<script lang="ts" setup>
// TODO: fix mobile links
// TODO: header select predicates
// TODO: 404 page
// TODO: fix flicker
// TODO: fix links
// TODO: sitemap
// TODO: check localstorage
// TODO: fix product hover
// TODO: test order
// TODO: improve email
// TODO: always open comment
// TODO: validate form
// TODO: handle errors
// TODO: test slow network
// TODO: preload images
// TODO: spinner images
// TODO: prevent cart reset

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
.page-enter-active, .page-leave-active
  transition: opacity 0.3s ease

.page-enter-from, .page-leave-to
  opacity: 0
</style>
