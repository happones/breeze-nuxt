<script setup>
import { initializeTheme } from './composables/useAppearance';

initializeTheme();
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
