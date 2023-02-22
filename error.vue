<script setup>
defineProps({
    error: {},
});
</script>

<template>
    <div
        class="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0"
    >
        <div>
            <div class="max-w-xl mx-auto sm:px-6 lg:px-8">
                <div
                    class="flex items-center pt-8"
                    :class="{
                        'sm:justify-start sm:pt-0': error.statusMessage,
                        'sm:justify-center': !error.statusMessage,
                    }"
                >
                    <div
                        class="px-4 text-lg text-gray-500"
                        :class="{ 'border-r border-gray-400 tracking-wider': error.statusMessage }"
                    >
                        {{ error.statusCode }}
                    </div>
                    <div v-if="error.statusMessage" class="ml-4 text-lg text-gray-500 uppercase tracking-wider">
                        {{ error.statusMessage }}
                    </div>
                </div>
            </div>
            <div v-if="error.statusCode === 500" class="mt-10 w-screen lg:max-w-max mx-auto p-5">
                <div
                    class="w-full bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
                >
                    <div class="w-full overflow-x-auto px-20" v-html="error.stack"></div>
                </div>
            </div>
        </div>
    </div>
</template>
