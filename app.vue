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
// TODO: improve email
// TODO: handle errors
// TODO: feedback button + notification
// TODO: yandex and google SEO
// TODO: yandex metrika
// TODO: add health endpoint
// TODO: send email to me as well
// TODO: fix gallery
// TODO: fix cart drawer photos

import {DEFAULT_DESCRIPTION, DEFAULT_TITLE} from "~/utils/misc";

useSeoMeta({
  author: 'МАКСАКОВ',
  ogLocale: 'ru_RU',
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  ogTitle: DEFAULT_TITLE,
  ogDescription: DEFAULT_DESCRIPTION,
  ogImage: '/apple-touch-icon.png',
  ogUrl: 'https://maksakov.com/',
  twitterTitle: DEFAULT_TITLE,
  twitterDescription: DEFAULT_DESCRIPTION,
  twitterImage: '/apple-touch-icon.png',
  twitterCard: 'summary'
})

useHead({
  htmlAttrs: {
    lang: 'ru'
  },
  meta: [
    {name: 'yandex-verification', content: '17dadd6108bd6b56'}
  ],
})

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
