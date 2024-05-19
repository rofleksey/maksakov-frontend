<script lang="ts" setup>
interface Props {
  placeholder: string;
  value: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "",
});
const emit = defineEmits(["input"]);
</script>

<template>
  <div class="overflow-hidden px-0 py-2">
    <textarea
        class="TextField__TextArea"
        :placeholder="props.placeholder"
        :value="props.value"
        @input="(e) => emit('input', e)"
    >
    </textarea>
  </div>
</template>

<style lang="sass" scoped>
.TextField__TextArea
  font: var(--font-din-next)
  @apply relative resize-none h-full w-full box-border overflow-hidden bg-inherit p-3 rounded-none
  color: var(--color-secondary)
  border: 1px solid var(--color-secondary)
  transition: left 0.15s ease

textarea::placeholder
  color: var(--color-secondary)
  opacity: 0.5

textarea:focus
  outline: 0
</style>
