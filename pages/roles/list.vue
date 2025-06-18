<template>

  <MainLayout>
    <RoleTable v-if="permissions.includes('roles.list')"/>
    <NoPermission v-else/>
  </MainLayout>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: ["auth","admin"],
});
useHead({
  title: 'Dashboard - Roles List',
})
const  authStore = useAuthStore();
import NoPermission from  '@/components/Common/NoPermission.vue'
const permissions = computed(() => authStore.user?.data?.permissions ?? []);
import RoleTable from "@/components/Role/RoleTable.vue"
import MainLayout from "~/layouts/Dashboard/MainLayout.vue";
</script>