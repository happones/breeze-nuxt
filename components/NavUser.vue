<script setup lang="ts">
import UserInfo from "@/components/UserInfo.vue";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import type { User } from "@/shared/types";
import { ChevronsUpDown } from "lucide-vue-next";
import UserMenuContent from "./UserMenuContent.vue";

const user = useSanctumUser<User>();

const { isMobile, state } = useSidebar();
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <SidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <UserInfo v-if="user" :user="user" />
            <ChevronsUpDown class="ml-auto size-4" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="w-(--reka-dropdown-menu-trigger-width) min-w-56 rounded-lg"
          :side="
            isMobile ? 'bottom' : state === 'collapsed' ? 'left' : 'bottom'
          "
          align="end"
          :side-offset="4"
        >
          <UserMenuContent v-if="user" :user="user" />
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
