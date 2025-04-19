<script setup lang="ts">
import InputError from "@/components/InputError.vue";
import TextLink from "@/components/TextLink.vue";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle } from "lucide-vue-next";

const { login } = useSanctumAuth();
const route = useRoute();

const form = ref({
  email: "",
  password: "",
  remember: false,
});

const errors = ref({});
const status = ref(route.query.status || "");
const processing = ref(false);

const resetForm = () => {
  form.value = {
    email: "",
    password: "",
    remember: false,
  };
  errors.value = {};
};

const submit = async () => {
  processing.value = true;
  errors.value = {};
  try {
    await login(form.value);
    resetForm();
  } catch (e) {
    errors.value = e.response?._data?.errors;
  }
  processing.value = false;
};

definePageMeta({
  title: "Log in",
  sanctum: {
    guestOnly: true,
  },
});
</script>

<template>
  <NuxtLayout
    name="auth-layout"
    title="Log in to your account"
    description="Enter your email and password below to log in"
  >
    <div
      v-if="status"
      class="mb-4 text-center text-sm font-medium text-green-600"
    >
      {{ status }}
    </div>

    <form class="flex flex-col gap-6" @submit.prevent="submit">
      <div class="grid gap-6">
        <div class="grid gap-2">
          <Label for="email">Email address</Label>
          <Input
            id="email"
            v-model="form.email"
            type="email"
            required
            autofocus
            :tabindex="1"
            autocomplete="email"
            placeholder="email@example.com"
          />
          <InputError :message="errors.email" />
        </div>

        <div class="grid gap-2">
          <div class="flex items-center justify-between">
            <Label for="password">Password</Label>
            <TextLink href="/forgot-password" class="text-sm" :tabindex="5">
              Forgot password?
            </TextLink>
          </div>
          <Input
            id="password"
            v-model="form.password"
            type="password"
            required
            :tabindex="2"
            autocomplete="current-password"
            placeholder="Password"
          />
          <InputError :message="errors.password" />
        </div>

        <div class="flex items-center justify-between" :tabindex="3">
          <Label for="remember" class="flex items-center space-x-3">
            <Checkbox id="remember" v-model="form.remember" :tabindex="4" />
            <span>Remember me</span>
          </Label>
        </div>

        <Button
          type="submit"
          class="mt-4 w-full"
          :tabindex="4"
          :disabled="processing"
        >
          <LoaderCircle v-if="processing" class="h-4 w-4 animate-spin" />
          Log in
        </Button>
      </div>

      <div class="text-center text-sm text-muted-foreground">
        Don't have an account?
        <TextLink href="register" :tabindex="5">Sign up</TextLink>
      </div>
    </form>
  </NuxtLayout>
</template>
