<script lang="ts" setup>
import {computed, ref} from "vue";
import IconNotes from "@/components/icons/IconNotes.vue";
import TextField from "@/components/misc/TextField.vue";
import {useCartStore} from "~/stores/cart-store";

const cartStore = useCartStore();
const notes = computed(() => cartStore.notes);
const notesActive = computed(() => notes.value.trim().length > 0);

function onNotesInput(e: any) {
  cartStore.setNotes(e.target.value);
}
</script>

<template>
  <div class="CartNotes">
    <div :class="{active: notesActive}"
         class="CartNotes__Button no-select">
      <IconNotes class="CartNotes__Icon"/>
      Комментарий
    </div>
    <div class="CartNotes__Edit">
      <TextField
          :value="notes"
          placeholder="Пожалуйста, укажите ваши контакты и особые пожелания / комментарии здесь"
          @input="onNotesInput"
      />
    </div>
  </div>
</template>

<style lang="sass" scoped>
.CartNotes
  font: var(--font-din-next)
  @apply text-base shrink-0 self-start w-[350px]

.CartNotes__Edit
  @apply h-[140px] w-full mt-2

.CartNotes__Button
  cursor: pointer
  color: rgb(158, 112, 118)
  transition: color 0.4s ease, letter-spacing 0.4s ease
  @apply flex flex-row items-center

  &.active
    letter-spacing: 1px
    color: coral

  &:hover
    color: rgba(158, 112, 118, 0.5)

.CartNotes__Icon
  margin-right: 8px

.CartNotes__Edit__Container
  @apply h-full w-full overflow-hidden px-0 py-2

.CartNotes__Edit__TextArea
  font: var(--font-din-next)
  @apply relative left-[-500px] text-[color:var(--color-secondary)] border border-[color:var(--color-secondary)]
  @apply resize-none h-full w-full box-border overflow-hidden bg-inherit p-3 rounded-none border-solid
  transition: left 0.15s ease

  &.active
    left: 0

textarea
  &::placeholder
    color: var(--color-secondary)
    opacity: 0.5

  &:focus
    outline: 0

</style>
