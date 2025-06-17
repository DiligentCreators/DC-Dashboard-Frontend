<template>
  <MainLayout>
    <div v-if="permissions.includes('users.list')">
      <UserTable />
    </div>

    <div v-else >
      <NoPermission />
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import NoPermission from  '@/components/Common/NoPermission.vue'

import MainLayout from "~/layouts/Dashboard/MainLayout.vue";
import UserTable from "@/components/User/UserTable.vue";
import { computed } from "vue";

const authStore = useAuthStore();
const permissions = computed(() => authStore.user?.data?.permissions ?? []);


definePageMeta({
  middleware: ["auth"],
});
useHead({
  title: 'Dashboard - Users List',
})
</script>
