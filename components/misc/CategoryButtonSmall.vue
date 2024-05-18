<script lang="ts" setup>

import LazyImage from "~/components/misc/LazyImage.vue";

interface Props {
  id: number;
  name: string;
  img: string;
}

const props = defineProps<Props>()
</script>

<template>
  <NuxtLink :to="`/category/${props.id}`" class="w-full">
    <div
        class="CategoryButton flex flex-row justify-start items-center text-center text-sm w-full hover:bg-white hover:tracking-[1px]">
      <div class="CategoryButton__img-container">
        <LazyImage
            :alt="props.name"
            :src="props.img"
            aspect-ratio="3/2"
            eager
            height="37px"
            width="57px"
        />
      </div>
      <div class="flex-grow">{{ props.name }}</div>
    </div>
  </NuxtLink>
</template>

<style lang="sass" scoped>
.CategoryButton
  font: var(--font-din-next)
  color: var(--color-secondary)
  background-color: var(--color-banner)
  transition: background-color 0.25s ease 0s, letter-spacing 0.4s ease 0s

  &:hover
    img
      transform: scale(1.2)

.CategoryButton__img-container
  @apply w-[57px] h-[37px] overflow-hidden

img
  @apply w-[57px] h-[37px] object-cover
  transition: transform 0.4s ease 0s
  backface-visibility: hidden
  transform-style: preserve-3d
  transform: translate3d(0, 0, 1px) scale(1, 1)
</style>
