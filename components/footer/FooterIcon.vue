<script lang="ts" setup>
interface Props {
  href?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <a :href="props.href" class="FooterIcon" target="”_blank”">
    <slot></slot>
  </a>
</template>

<style lang="sass">
.FooterIcon
  @apply flex items-center justify-center w-[35px] h-[35px] bg-white cursor-pointer
  @apply transition-[background-color] duration-[0.15s] ease-[ease] rounded-[50%]

  > *
    @apply w-[25px] h-[25px]

  &:hover
    background-color: rgb(150, 150, 150)

</style>
