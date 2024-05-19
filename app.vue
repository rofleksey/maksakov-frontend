<template>
  <NuxtNotifications :speed="500" position="bottom left"/>
  <NuxtLoadingIndicator color="#9E7076"/>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>

<script lang="ts" setup>
// TODO: header select predicates
// TODO: 404 page
// TODO: fix flicker
// TODO: sitemap
// TODO: test order
// TODO: improve email
// TODO: validate form
// TODO: handle errors
// TODO: test slow network
// TODO: preload images
// TODO: feedback button + notification
// TODO: yandex and google SEO
// TODO: yandex metrika
// TODO: add health endpoint
// TODO: send email to me as well

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
