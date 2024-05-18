<template>
  <div class="w-full">
    <LazyImage
        :src="CoverPng"
        alt="cover"
        aspect-ratio="3/1"
        class="w-full object-cover object-[50%_50%]"/>
  </div>
</template>
<script lang="ts" setup>
import CoverPng from '@/assets/cover.png'
import LazyImage from "~/components/misc/LazyImage.vue";
</script>
