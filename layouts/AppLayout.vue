<script setup lang="ts">
import AppContent from "@/components/app/Content.vue";
import AppShell from "@/components/app/Shell.vue";
import AppSidebar from "@/components/app/Sidebar.vue";
import AppSidebarHeader from "@/components/app/SidebarHeader.vue";
import type { BreadcrumbItemType } from "../shared/types/index";

interface Props {
  breadcrumbs?: BreadcrumbItemType[];
}

withDefaults(defineProps<Props>(), {
  breadcrumbs: () => [],
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
