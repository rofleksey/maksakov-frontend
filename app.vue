<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>

<script lang="ts" setup>
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
@import @/assets/main.sass
</style>

<style>
.page-enter-active, .page-leave-active {
  transition: opacity 0.5s ease;
}

.page-enter-from, .page-leave-to {
  opacity: 0;
}
</style>
