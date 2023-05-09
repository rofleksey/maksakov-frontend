<script setup lang="ts">
import {useCartStore} from "@/stores/store";
import {computed, ref} from "vue";
import IconNotes from "@/components/icons/IconNotes.vue";
import TextField from "@/components/misc/TextField.vue";

const cartStore = useCartStore();
const notes = computed(() => cartStore.notes);
const notesActive = computed(() => notes.value.trim().length > 0);

const notesOpen = ref(false);

function onNotesInput(e: any) {
  cartStore.setNotes(e.target.value);
}
</script>

<template>
    <div class="CartNotes">
        <div
                :class="{
        CartNotes__Button: true,
        'no-select': true,
        active: notesActive,
      }"
                @click="notesOpen = !notesOpen"
        >
            <IconNotes class="CartNotes__Icon"/>
            Комментарий
        </div>
        <div class="CartNotes__Edit">
            <TextField
                    :value="notes"
                    @input="onNotesInput"
                    :open="notesOpen"
                    placeholder="Пожалуйста, укажите ваши контакты и особые пожелания / комментарии здесь"
            />
        </div>
  </div>
</template>

<style scoped>
.CartNotes {
  font: var(--font-din-next);
  font-size: 16px;
  flex-shrink: 0;
  align-self: flex-start;
  width: 350px;
}

.CartNotes__Edit {
  margin-top: 8px;
  height: 140px;
  width: 100%;
}

.CartNotes__Button {
  cursor: pointer;
  color: rgb(158, 112, 118);
  transition: color 0.4s ease, letter-spacing 0.4s ease;
}

.CartNotes__Button.active {
  letter-spacing: 1px;
  color: coral;
}

.CartNotes__Button:hover {
  color: rgba(158, 112, 118, 0.5);
}

.CartNotes__Icon {
  margin-right: 8px;
}

.CartNotes__Edit__Container {
  padding: 8px 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.CartNotes__Edit__TextArea {
  position: relative;
  left: -500px;
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

.CartNotes__Edit__TextArea.active {
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
