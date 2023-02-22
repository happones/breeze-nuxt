<script setup>
import InputError from "@/components/InputError.vue";
import InputLabel from "@/components/InputLabel.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import TextInput from "@/components/TextInput.vue";
import { useRoute } from "nuxt/app";
import { ref } from "vue";
import { useAuth } from "@/composables/auth";

const route = useRoute();
const name = ref("");
const email = ref("");
const password = ref("");
const password_confirmation = ref("");
const errors = ref([]);
const status = ref(route.query.reset?.length > 0 && errors.value.length === 0 ? atob(route.query.reset) : null);
const processing = ref(false);

const { register } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
});

const submit = async () => {
    processing.value = true;
    await register({
        name: name.value,
        email: email.value,
        password: password.value,
        password_confirmation: password_confirmation.value,
        errors,
        status,
    });
    processing.value = false;
};
</script>

<template>
    <NuxtLayout name="guest-layout">
        <Head>
            <Title>Register</Title>
        </Head>

        <form @submit.prevent="submit">
            <div>
                <InputLabel for="name" value="Name" />

                <TextInput
                    id="name"
                    v-model="name"
                    type="text"
                    class="mt-1 block w-full"
                    required
                    autofocus
                    autocomplete="name"
                />

                <InputError class="mt-2" :messages="errors.name" />
            </div>

            <div class="mt-4">
                <InputLabel for="email" value="Email" />

                <TextInput
                    id="email"
                    v-model="email"
                    type="email"
                    class="mt-1 block w-full"
                    required
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
                    autocomplete="new-password"
                />

                <InputError class="mt-2" :messages="errors.password" />
            </div>

            <div class="mt-4">
                <InputLabel for="password_confirmation" value="Confirm Password" />

                <TextInput
                    id="password_confirmation"
                    v-model="password_confirmation"
                    type="password"
                    class="mt-1 block w-full"
                    required
                    autocomplete="new-password"
                />

                <InputError class="mt-2" :messages="errors.password_confirmation" />
            </div>

            <div class="flex items-center justify-end mt-4">
                <NuxtLink
                    to="/login"
                    class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                >
                    Already registered?
                </NuxtLink>

                <PrimaryButton class="ml-4" :class="{ 'opacity-25': processing }" :disabled="processing">
                    Register
                </PrimaryButton>
            </div>
        </form>
    </NuxtLayout>
</template>
