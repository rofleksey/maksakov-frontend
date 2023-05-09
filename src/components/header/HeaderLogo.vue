<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter();
</script>

<template>
    <RouterLink to="/" class="HeaderLogo">
        <img class="HeaderLogo__img" alt="logo" src="@/assets/logo.png"/>
        <div class="HeaderLogo__title">
            <div class="HeaderLogo__title__primary">МАКСАКОВ</div>
            <div class="HeaderLogo__title__secondary">изделия ручной работы</div>
        </div>
    </RouterLink>
</template>

<style>
.HeaderLogo {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.HeaderLogo__title {
  margin-top: 10px;
}

.HeaderLogo__title__primary {
  font-size: 27px;
  font-weight: bold;
  color: var(--color-primary);
  margin-bottom: 8px;
}

.HeaderLogo__title__secondary {
  font-size: 15px !important;
  color: var(--color-secondary);
  font: var(--font-din-next);
}

.HeaderLogo__img {
  width: 79px;
  height: 63px;
  object-fit: cover;
}
</style>
