<script setup>
defineProps({
    messages: {
        default() {
            return [];
        },
    },
    className: {
        type: String,
        default: "",
    },
});
</script>

<template>
    <div v-show="messages.length > 0">
        <p v-for="(message, index) in messages" :key="index" class="text-sm text-red-600 dark:text-red-400">
            {{ message }}
        </p>
    </div>
</template>
