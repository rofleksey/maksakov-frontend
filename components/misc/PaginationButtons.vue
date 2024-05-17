<script lang="ts" setup>
import IconPrev from "@/components/icons/IconPrev.vue";
import IconNext from "@/components/icons/IconNext.vue";

interface Props {
  prevLink: string | null;
  nextLink: string | null;
}

const props = defineProps<Props>();
</script>

<template>
  <div class="Pagination no-select">
    <component
        :is="props.prevLink ? 'router-link' : 'span'"
        :class="{ disabled: props.prevLink === null }"
        class="Pagination__prev link"
        :to="prevLink"
    >
      <IconPrev class="icon"/>
      Назад
    </component>
    <component
        :is="props.nextLink ? 'router-link' : 'span'"
        :class="{ disabled: props.nextLink === null }"
        class="Pagination__next link"
        :to="nextLink"
    >
      Вперед
      <IconNext class="icon"/>
    </component>
  </div>
</template>

<style lang="sass" scoped>
.Pagination
  font: var(--font-din-next)
  @apply flex flex-row justify-center

.Pagination__prev.disabled,
.Pagination__next.disabled
  @apply opacity-60

.Pagination__next::before
  margin: 0 10px
  content: "|"
  display: inline-block
  height: 16px

.link
  @apply flex flex-row justify-center items-center

.icon
  @apply mx-1
</style>
