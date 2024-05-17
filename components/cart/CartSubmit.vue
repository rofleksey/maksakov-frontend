<script lang="ts" setup>
interface Props {
  loading: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits(["submit"]);
</script>

<template>
  <button
      :class="{ CartSubmit: true, loading: props.loading }"
      @click="emit('submit')"
  >
    <span>Оформить заказ</span>
  </button>
</template>

<style lang="sass" scoped>
.CartSubmit
  font: var(--font-din-next)
  @apply text-base text-[white] bg-[rgb(158,112,118)] cursor-pointer w-full px-4 py-2
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out

  &.loading
    animation: ldx-bounce 1s infinite linear

  &:hover
    background-color: rgba(158, 112, 118, 0.8)
    color: rgba(255, 255, 255, 0.7)

  span
    line-height: 1.5
</style>
