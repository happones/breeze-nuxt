<script setup lang="ts">
import { Button } from "@/components/ui/button";

import { LoaderCircle } from "lucide-vue-next";

const { logout, user } = useSanctumAuth();
const route = useRoute();

watchEffect(async () => {
  if (user.value?.email_verified_at) {
    const redirectPath = route.query.redirect?.toString() || "/dashboard";
    await navigateTo(redirectPath);
  }
});

const client = useSanctumClient();

const status = ref("");
const processing = ref(false);

const submit = async () => {
  processing.value = true;
  try {
    const data = await client("email/verification-notification", {
      method: "POST",
    });

    status.value = data.status;
  } catch (e) {
    status.value = e.response._data?.status;
  }
  processing.value = false;
};

definePageMeta({
  title: "Email verification",
  middleware: ["sanctum:auth"],
});
</script>

<template>
  <NuxtLayout
    name="auth-layout"
    title="Verify email"
    description="Please verify your email address by clicking on the link we just emailed to you."
  >
    <div
      v-if="status === 'verification-link-sent'"
      class="mb-4 text-center text-sm font-medium text-green-600"
    >
      A new verification link has been sent to the email address you provided
      during registration.
    </div>

    <form class="space-y-6 text-center" @submit.prevent="submit">
      <Button :disabled="processing" variant="secondary">
        <LoaderCircle v-if="processing" class="h-4 w-4 animate-spin" />
        Resend verification email
      </Button>
      <Button variant="link" type="button" @click="logout">Log out</Button>
    </form>
  </NuxtLayout>
</template>
