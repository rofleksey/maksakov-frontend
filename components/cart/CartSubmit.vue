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

<style scoped>
.CartSubmit {
  font: var(--font-din-next);
  font-size: 16px;
  color: white;
  background-color: rgb(158, 112, 118);
  cursor: pointer;
  padding: 8px 16px;
  width: 100%;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
}

.CartSubmit.loading {
  animation: ldx-bounce 1s infinite linear;
}

.CartSubmit:hover {
  background-color: rgba(158, 112, 118, 0.8);
  color: rgba(255, 255, 255, 0.7);
}

.CartSubmit span {
  line-height: 1.5;
}
</style>
