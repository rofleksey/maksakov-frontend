<script setup lang="ts">
interface Props {
  open?: boolean;
  placeholder: string;
  value: string;
}

const props = withDefaults(defineProps<Props>(), {
  open: true,
  placeholder: "",
});
const emit = defineEmits(["input"]);
</script>

<template>
  <div class="TextField">
    <textarea
            :value="props.value"
            @input="(e) => emit('input', e)"
            :placeholder="props.placeholder"
            :class="{ TextField__TextArea: true, open: props.open }"
    >
    </textarea>
  </div>
</template>

<style scoped>
.TextField {
  padding: 8px 0;
  overflow: hidden;
}

.TextField__TextArea {
  position: relative;
  left: -150%;
  font: var(--font-din-next);
  color: var(--color-secondary);
  border: 1px solid var(--color-secondary);
  border-radius: 0;
  resize: none;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 12px;
  overflow: hidden;
  background-color: inherit;
  transition: left 0.15s ease;
}

.TextField__TextArea.open {
  left: 0;
}

textarea::placeholder {
  color: var(--color-secondary);
  opacity: 0.5;
}

textarea:focus {
  outline: 0;
}
</style>
