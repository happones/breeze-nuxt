<script setup lang="ts">
import InputError from "@/components/InputError.vue";
import TextLink from "@/components/TextLink.vue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle } from "lucide-vue-next";

const client = useSanctumClient();

const form = ref({
  email: "",
});

const errors = ref({});
const status = ref("");
const processing = ref(false);

const resetForm = () => {
  form.value.email = "";
  errors.value = {};
};

const submit = async () => {
  processing.value = true;
  errors.value = {};
  try {
    const data = await client("/forgot-password", {
      method: "POST",
      body: form.value,
    });

    status.value = data.status;
    resetForm();
  } catch (e) {
    errors.value = e.response._data.errors;
  }
  processing.value = false;
};

definePageMeta({
  title: "Forgot password",
  sanctum: {
    guestOnly: true,
  },
});
</script>

<template>
  <NuxtLayout
    name="auth-layout"
    title="Forgot password"
    description="Enter your email to receive a password reset link"
  >
    <div
      v-if="status"
      class="mb-4 text-center text-sm font-medium text-green-600"
    >
      {{ status }}
    </div>

    <div class="space-y-6">
      <form @submit.prevent="submit">
        <div class="grid gap-2">
          <Label for="email">Email address</Label>
          <Input
            id="email"
            v-model="form.email"
            type="email"
            name="email"
            autocomplete="off"
            autofocus
            placeholder="email@example.com"
          />
          <InputError :message="errors.email" />
        </div>

        <div class="my-6 flex items-center justify-start">
          <Button class="w-full" :disabled="processing">
            <LoaderCircle v-if="processing" class="h-4 w-4 animate-spin" />
            Email password reset link
          </Button>
        </div>
      </form>

      <div class="space-x-1 text-center text-sm text-muted-foreground">
        <span>Or, return to</span>
        <TextLink href="/login">log in</TextLink>
      </div>
    </div>
  </NuxtLayout>
</template>
