<script setup>
import Checkbox from "@/components/Checkbox.vue";
import InputError from "@/components/InputError.vue";
import InputLabel from "@/components/InputLabel.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import TextInput from "@/components/TextInput.vue";
import { ref } from "vue";
import { useAuth } from "@/composables/auth";
import { useRoute } from "nuxt/app";

const route = useRoute();
const email = ref("");
const password = ref("");
const remember = ref(false);
const errors = ref([]);
const status = ref(route.query.reset?.length > 0 && errors.value.length === 0 ? atob(route.query.reset) : null);
const processing = ref(false);

const { login } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
});

const submit = async () => {
    processing.value = true;
    await login({
        email: email.value,
        password: password.value,
        remember: remember.value,
        errors,
        status,
    });
    processing.value = false;
};
</script>

<template>
    <NuxtLayout name="guest-layout">
        <div v-if="status" class="mb-4 font-medium text-sm text-green-600">
            {{ status }}
        </div>

        <form @submit.prevent="submit">
            <div>
                <InputLabel for="email" value="Email" />

                <TextInput
                    id="email"
                    v-model="email"
                    type="email"
                    class="mt-1 block w-full"
                    required
                    autofocus
                    autocomplete="username"
                />

                <InputError class="mt-2" :messages="errors.email" />
            </div>

            <div class="mt-4">
                <InputLabel for="password" value="Password" />

                <TextInput
                    id="password"
                    v-model="password"
                    type="password"
                    class="mt-1 block w-full"
                    required
                    autocomplete="current-password"
                />

                <InputError class="mt-2" :messages="errors.password" />
            </div>

            <div class="block mt-4">
                <label class="flex items-center">
                    <Checkbox v-model:checked="remember" name="remember" />
                    <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                </label>
            </div>

            <div class="flex items-center justify-end mt-4">
                <NuxtLink
                    to="/forgot-password"
                    class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                >
                    Forgot your password?
                </NuxtLink>

                <PrimaryButton class="ml-4" :class="{ 'opacity-25': processing }" :disabled="processing">
                    Log in
                </PrimaryButton>
            </div>
        </form>
    </NuxtLayout>
</template>
