<script setup lang="ts">
defineProps<{
  message?: string | object;
}>();
</script>

<template>
  <div v-show="message">
    <template v-if="typeof message === 'object'">
      <p class="text-sm text-red-500">{{ message[0] }}</p>
    </template>
    <p v-else class="text-sm text-red-500">{{ message }}</p>
  </div>
</template>
