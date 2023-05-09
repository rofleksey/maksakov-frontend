<script setup lang="ts">
import IconVK from "@/components/icons/IconVK.vue";
import IconInst from "@/components/icons/IconInst.vue";
import FooterIcon from "@/components/footer/FooterIcon.vue";
import IconEmail from "@/components/icons/IconEmail.vue";
</script>

<template>
  <footer class="Footer">
    <div class="Footer__Text">8-981-87-000-22</div>

    <FooterIcon>
        <IconEmail/>
    </FooterIcon>

    <FooterIcon href="https://vk.com/maksakovcom">
        <IconVK/>
    </FooterIcon>

    <FooterIcon href="https://www.instagram.com/maksakovcom">
        <IconInst/>
    </FooterIcon>

      <div class="Footer__Text">maksakovcom@mail.ru</div>
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
  /*width: calc(100vw - (100vw - 100%));*/
  width: 100%;
  padding: 15px 0;
  animation: fadein 1s forwards;
  animation-delay: 1s;
  opacity: 0;
}

.Footer__Text {
  color: white;
  font: var(--font-din-next);
  font-size: 16px;
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
