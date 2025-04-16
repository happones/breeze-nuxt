<script setup lang="ts">
import UserInfo from '@/components/UserInfo.vue';
import { DropdownMenuItem, DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import type { User } from '@/shared/types';
import { LogOut } from 'lucide-vue-next';

interface Props {
    user: User;
}

defineProps<Props>();

const { logout } = useSanctumAuth();
</script>

<template>
    <DropdownMenuLabel class="p-0 font-normal">
        <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <UserInfo :user="user" :show-email="true" />
        </div>
    </DropdownMenuLabel>

    <DropdownMenuItem  @click="logout">
        <LogOut class="mr-2 h-4 w-4" />
      Log out
    </DropdownMenuItem>
</template>
