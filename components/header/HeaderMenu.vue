<script lang="ts" setup>
import {useRoute, useRouter} from "vue-router";

const router = useRouter();
const route = useRoute();
const {data} = await useFetchCategories()
</script>

<template>
  <div class="HeaderMenu">
    <div
        :class="{
        HeaderMenu__item: true,
        selected:
          (route.name === 'catalog' ||
            route.name === 'category' ||
            route.name === 'product') &&
          route.query.id !== '-1' &&
          route.query.categoryId !== '-1',
      }"
        style="width: 80px"
        @click="router.push('/catalog')"
    >
      каталог
      <ul class="HeaderMenu__SubMenu">
        <li
            v-for="category in (data || [])"
            :key="category.id"
            @click.stop="router.push(`/category/${category.id}`)"
        >
          {{ category.name }}
        </li>
      </ul>
    </div>
    <div
        :class="{
        HeaderMenu__item: true,
        selected:
          (route.name === 'catalog' ||
            route.name === 'category' ||
            route.name === 'product') &&
          (route.query.id === '-1' || route.query.categoryId === '-1'),
      }"
        style="width: 110px"
        @click="router.push(`/category/${SALE_CATEGORY_ID}`)"
    >
      распродажа
    </div>
    <div
        class="HeaderMenu__item"
        style="width: 160px"
        @click="router.push('/delivery')"
    >
      доставка и оплата
    </div>
    <div
        class="HeaderMenu__item"
        style="width: 100px"
        @click="router.push('/contacts')"
    >
      контакты
    </div>
  </div>
</template>

<style lang="sass" scoped>
.HeaderMenu
  @apply flex flex-row flex-nowrap items-center gap-[25px] text-[15px]

.HeaderMenu__item
  @apply relative box-content text-center cursor-pointer shrink-0 font-bold px-[5px] py-2.5
  transition: color 0.25s ease 0s, letter-spacing 0.4s ease 0s

  &:hover
    color: var(--color-hovered)
    letter-spacing: 1px

  > div
    @apply w-full h-full

  &.selected
    color: var(--color-selected)

    &:hover
      color: var(--color-hovered)

.HeaderMenu__SubMenu
  @apply absolute -translate-x-2/4 w-[300px] text-center mx-auto my-0 pt-5 left-2/4
  list-style: none

.HeaderMenu__item:hover .HeaderMenu__SubMenu li
  @apply block opacity-100 bg-white

.HeaderMenu__SubMenu li
  @apply text-[color:var(--color-secondary)] tracking-[normal] hidden opacity-0 p-[5px]
  transition: color 0.25s ease 0s, letter-spacing 0.4s ease 0s, opacity 0.4s ease 0s

.HeaderMenu__SubMenu li:hover
  @apply text-[color:var(--color-hovered)] tracking-[1px]
</style>
