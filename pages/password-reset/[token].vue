<script setup lang="ts">
import InputError from "@/components/InputError.vue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle } from "lucide-vue-next";

const client = useSanctumClient();
const route = useRoute();

const form = ref({
  token: route.params.token,
  email: route.query.email,
  password: "",
  password_confirmation: "",
});

const errors = ref({});
const processing = ref(false);

const submit = async () => {
  processing.value = true;
  try {
    const data = await client("/reset-password", {
      method: "POST",
      body: form.value,
    });

    await navigateTo({
      path: "/login",
      query: {
        status: data.status,
      },
    });
  } catch (e) {
    errors.value = e.response?._data?.errors;
  }
  processing.value = false;
};

definePageMeta({
  title: "Reset password",
  sanctum: {
    guestOnly: true,
  },
});
</script>

<template>
  <NuxtLayout
    name="auth-layout"
    title="Reset password"
    description="Please enter your new password below"
  >
    <form @submit.prevent="submit">
      <div class="grid gap-6">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            v-model="form.email"
            type="email"
            name="email"
            autocomplete="email"
            class="mt-1 block w-full"
            readonly
          />
          <InputError :message="errors.email" class="mt-2" />
        </div>

        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input
            id="password"
            v-model="form.password"
            type="password"
            name="password"
            autocomplete="new-password"
            class="mt-1 block w-full"
            autofocus
            placeholder="Password"
          />
          <InputError :message="errors.password" />
        </div>

        <div class="grid gap-2">
          <Label for="password_confirmation"> Confirm Password </Label>
          <Input
            id="password_confirmation"
            v-model="form.password_confirmation"
            type="password"
            name="password_confirmation"
            autocomplete="new-password"
            class="mt-1 block w-full"
            placeholder="Confirm password"
          />
          <InputError :message="errors.password_confirmation" />
        </div>

        <Button type="submit" class="mt-4 w-full" :disabled="form.processing">
          <LoaderCircle v-if="form.processing" class="h-4 w-4 animate-spin" />
          Reset password
        </Button>
      </div>
    </form>
  </NuxtLayout>
</template>
