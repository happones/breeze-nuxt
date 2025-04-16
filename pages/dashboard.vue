<script setup lang="ts">
import PlaceholderPattern from "../components/PlaceholderPattern.vue";
import type { BreadcrumbItem } from "@/shared/types";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
];

definePageMeta({
  title: "Dashboard",
  middleware: ["sanctum:auth", "email-verified"],
});
</script>

<template>
  <NuxtLayout name="app-layout" :breadcrumbs="breadcrumbs">
    <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
      <div class="grid auto-rows-min gap-4 md:grid-cols-3">
        <div
          class="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border"
        >
          <client-only>
            <PlaceholderPattern />
          </client-only>
        </div>
        <div
          class="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border"
        >
          <client-only>
            <PlaceholderPattern />
          </client-only>
        </div>
        <div
          class="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border"
        >
          <client-only>
            <PlaceholderPattern />
          </client-only>
        </div>
      </div>
      <div
        class="relative min-h-[100vh] flex-1 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border md:min-h-min"
      >
        <client-only>
          <PlaceholderPattern />
        </client-only>
      </div>
    </div>
  </NuxtLayout>
</template>
