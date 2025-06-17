<template>

  <MainLayout>

    <ClientTable v-if="permissions.includes('clients.list')" />

    <NoPermission  v-else/>
  </MainLayout>
</template>


<script setup lang="ts">

const  authStore = useAuthStore();
const permissions = computed(() => authStore.user?.data?.permissions ?? []);
import NoPermission from  '@/components/Common/NoPermission.vue'

import MainLayout from "~/layouts/Dashboard/MainLayout.vue";
import ClientTable from "../../components/client/ClientTable.vue";

definePageMeta({
  middleware: ["auth"],
});
useHead({
  title: 'Dashboard - Clients List',
})
</script>