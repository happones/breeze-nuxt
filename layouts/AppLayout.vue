<script setup lang="ts">
import AppContent from "@/components/app/Content.vue";
import AppShell from "@/components/app/Shell.vue";
import AppSidebar from "@/components/app/Sidebar.vue";
import AppSidebarHeader from "@/components/app/SidebarHeader.vue";
import type { BreadcrumbItemType } from "@/shared/types";

const route = useRoute();

interface Props {
  breadcrumbs?: BreadcrumbItemType[];
}

withDefaults(defineProps<Props>(), {
  breadcrumbs: () => [],
});

useHead({
  title: `${route.meta.title || ""} - Laravel`,
});
</script>

<template>
  <AppShell variant="sidebar">
    <AppSidebar />
    <AppContent variant="sidebar">
      <AppSidebarHeader :breadcrumbs="breadcrumbs" />
      <slot />
    </AppContent>
  </AppShell>
</template>
