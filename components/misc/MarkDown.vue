<script lang="ts" setup>
import {computed} from "vue";
import {marked} from "marked";

marked.setOptions({
  gfm: true,
  silent: true,
  breaks: true,
});

interface Props {
  text: string;
}

const props = defineProps<Props>();

const html = computed(() => marked(props.text));
</script>

<template>
  <div class="Markdown" v-html="html"></div>
</template>

<style lang="sass">
.Markdown
  font: var(--font-din-next)
  color: var(--color-secondary)

.Markdown p:not(:first-child)
  margin: 18px 0

.Markdown h1,
.Markdown h2
  font: var(--font-raleway)
  font-size: 24px !important
  letter-spacing: normal !important
  line-height: normal !important

.Markdown h1
  margin-bottom: 40px
</style>
