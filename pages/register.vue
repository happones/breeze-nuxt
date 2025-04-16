<script setup lang="ts">
import InputError from "@/components/InputError.vue";
import TextLink from "@/components/TextLink.vue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle } from "lucide-vue-next";

const { login } = useSanctumAuth();
const client = useSanctumClient();

const form = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const errors = ref({});
const processing = ref(false);

const resetForm = () => {
  form.value = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };
  errors.value = {};
};

const submit = async () => {
  processing.value = true;
  errors.value = {};
  try {
    await client("/register", {
      method: "POST",
      body: form.value,
    });
    await login(form.value);
    resetForm();
  } catch (e) {
    errors.value = e.response?._data?.errors;
  }
  processing.value = false;
};

definePageMeta({
  title: "Register",
  sanctum: {
    guestOnly: true,
  },
});
</script>

<template>
  <NuxtLayout
    name="auth-layout"
    title="Create an account"
    description="Enter your details below to create your account"
  >
    <form class="flex flex-col gap-6" @submit.prevent="submit">
      <div class="grid gap-6">
        <div class="grid gap-2">
          <Label for="name">Name</Label>
          <Input
            id="name"
            v-model="form.name"
            type="text"
            required
            autofocus
            :tabindex="1"
            autocomplete="name"
            placeholder="Full name"
          />
          <InputError :message="errors.name" />
        </div>

        <div class="grid gap-2">
          <Label for="email">Email address</Label>
          <Input
            id="email"
            v-model="form.email"
            type="email"
            required
            :tabindex="2"
            autocomplete="email"
            placeholder="email@example.com"
          />
          <InputError :message="errors.email" />
        </div>

        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input
            id="password"
            v-model="form.password"
            type="password"
            required
            :tabindex="3"
            autocomplete="new-password"
            placeholder="Password"
          />
          <InputError :message="errors.password" />
        </div>

        <div class="grid gap-2">
          <Label for="password_confirmation">Confirm password</Label>
          <Input
            id="password_confirmation"
            v-model="form.password_confirmation"
            type="password"
            required
            :tabindex="4"
            autocomplete="new-password"
            placeholder="Confirm password"
          />
          <InputError :message="errors.password_confirmation" />
        </div>

        <Button
          type="submit"
          class="mt-2 w-full"
          tabindex="5"
          :disabled="form.processing"
        >
          <LoaderCircle v-if="form.processing" class="h-4 w-4 animate-spin" />
          Create account
        </Button>
      </div>

      <div class="text-center text-sm text-muted-foreground">
        Already have an account?
        <TextLink
          href="/login"
          class="underline underline-offset-4"
          :tabindex="6"
          >Log in</TextLink
        >
      </div>
    </form>
  </NuxtLayout>
</template>
