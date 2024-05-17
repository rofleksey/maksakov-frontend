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
        :class="{ Pagination__prev: true, disabled: props.prevLink === null }"
        :to="prevLink"
    >
      <IconPrev/>
      Назад
    </component>
    <component
        :is="props.nextLink ? 'router-link' : 'span'"
        :class="{ Pagination__next: true, disabled: props.nextLink === null }"
        :to="nextLink"
    >
      Вперед
      <IconNext/>
    </component>
  </div>
</template>

<style scoped>
.Pagination {
  display: flex;
  flex-direction: row;
  justify-content: center;
  font: var(--font-din-next);
}

.Pagination__prev.disabled,
.Pagination__next.disabled {
  opacity: 0.6;
}

.Pagination__prev svg,
.Pagination__next svg {
  transform: rotate(0deg) translateY(3.5px);
}

.Pagination__next::before {
  border-left: 1px solid #303132;
  margin: 0 10px;
  content: "";
  display: inline-block;
  height: 16px;
  transform: translateY(3.5px);
}
</style>
