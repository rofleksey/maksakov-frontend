<script setup lang="ts">
import IconVK from "@/components/icons/IconVK.vue";
import IconInst from "@/components/icons/IconInst.vue";
import FooterIcon from "@/components/footer/FooterIcon.vue";
import IconEmail from "@/components/icons/IconEmail.vue";

function goto(url: string) {
  window.location.href = url;
}
</script>

<template>
  <footer class="Footer no-select">
    <FooterIcon>
      <IconEmail/>
    </FooterIcon>

    <FooterIcon @click="goto('https://vk.com/maksakovcom')">
      <IconVK/>
    </FooterIcon>

    <FooterIcon @click="goto('https://www.instagram.com/maksakovcom/')">
      <IconInst/>
    </FooterIcon>
  </footer>
</template>

<style scoped>
.Footer {
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 25px;
  flex-wrap: nowrap;
  background-color: rgb(83, 81, 81);
  width: calc(100vw - (100vw - 100%));
  padding: 5px 0;
}
</style>
