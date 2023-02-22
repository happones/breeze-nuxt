<script setup>
import { ref } from "vue";
import { useRoute } from "nuxt/app";

const route = useRoute();

import InputError from "@/components/InputError.vue";
import InputLabel from "@/components/InputLabel.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import TextInput from "@/components/TextInput.vue";
import { useAuth } from "@/composables/auth";

const email = ref(route.query.email);
const password = ref("");
const password_confirmation = ref("");
const { resetPassword } = useAuth();
const errors = ref({});
const status = ref(null);
const processing = ref(false);
const submit = async () => {
    processing.value = true;
    await resetPassword({
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
            <Title>Reset Password</Title>
        </Head>
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
                <PrimaryButton :class="{ 'opacity-25': processing }" :disabled="processing">
                    Reset Password
                </PrimaryButton>
            </div>
        </form>
    </NuxtLayout>
</template>
