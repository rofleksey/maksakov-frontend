<template>
  <div
      v-element-visibility="onVisibilityChange"
      :style="{aspectRatio: state !== State.Ready ? props.aspectRatio : undefined}"
      class="relative h-auto">
    <img
        :alt="props.alt ?? ''"
        :class="{ active: state === State.Ready }"
        :src="curSrc"
        @load="onImageLoad"
    />
    <Skeleton
        v-if="state !== State.Ready "
        :style="{aspectRatio: props.aspectRatio}"
        class="skeleton"
        height="auto"
    />
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {vElementVisibility} from '@vueuse/components'
import Skeleton from "~/components/misc/Skeleton.vue";

interface Props {
  src: string;
  eager?: boolean;
  alt?: string;
  aspectRatio?: string;
}

const props = defineProps<Props>();

enum State {
  Idle = 0,
  Loading = 1,
  Ready = 2
}

const state = ref(State.Idle)
const curSrc = ref('')

function onImageLoad() {
  state.value = State.Ready
  console.log('!!!!!')
}

function startLoading() {
  if (state.value === State.Ready) {
    return
  }

  state.value = State.Loading
  curSrc.value = props.src
}

function onVisibilityChange(visible: boolean) {
  if (visible && state.value === State.Idle) {
    startLoading()
  }
}

if (props.eager) {
  onNuxtReady(() => {
    startLoading()
  })
}
</script>

<style lang="sass" scoped>
img
  @apply opacity-0 w-full h-full
  transition: opacity 250ms ease

  &.active
    @apply opacity-100

.skeleton
  @apply absolute top-0 left-0
</style>
