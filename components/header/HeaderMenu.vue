<script lang="ts" setup>
import {useRoute, useRouter} from "vue-router";

const router = useRouter();
const route = useRoute();
const {data} = await useFetchCategories()
</script>

<template>
  <div class="menu">
    <div class="item w-[80px]">
      <NuxtLink class="block w-full h-full" to="/catalog">
        каталог
      </NuxtLink>
      <div class="sub-menu">
        <NuxtLink v-for="category in (data || [])"
                  :key="category.id"
                  :to="`/category/${category.id}`"
                  class="w-full"
        >
          <div class="sub-menu-item">
            {{ category.name }}
          </div>
        </NuxtLink>
      </div>
    </div>
    <NuxtLink :to="`/category/${SALE_CATEGORY_ID}`" class="item w-[110px]">
      распродажа
    </NuxtLink>
    <NuxtLink class="item w-[160px]" to="/delivery">
      доставка и оплата
    </NuxtLink>
    <NuxtLink class="item w-[100px]" to="/contacts">
      контакты
    </NuxtLink>
  </div>
</template>

<style lang="sass" scoped>
.menu
  @apply flex flex-row flex-nowrap items-center gap-[25px] text-[15px]

.item
  @apply block relative box-content text-center shrink-0 font-bold px-[5px] py-2.5
  transition: color 0.25s ease 0s, letter-spacing 0.4s ease 0s

  &:hover
    color: var(--color-hovered)
    letter-spacing: 1px

  &.selected
    color: var(--color-selected)

    &:hover
      color: var(--color-hovered)

.sub-menu
  @apply absolute -translate-x-2/4 w-[300px] text-center mx-auto my-0 pt-5 left-2/4

.item:hover
  .sub-menu
    .sub-menu-item
      @apply block opacity-100 bg-white

.sub-menu-item
  @apply text-[color:var(--color-secondary)] tracking-[normal] hidden opacity-0 p-[5px]
  transition: color 0.25s ease 0s, letter-spacing 0.4s ease 0s, opacity 0.4s ease 0s

  &:hover
    @apply text-[color:var(--color-hovered)] tracking-[1px]
</style>
