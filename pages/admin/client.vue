<template>

  <MainLayout>

    <ClientTable v-if="permissions.includes('clients.list')" />

    <NoPermission  v-else/>
  </MainLayout>
</template>


<script setup lang="ts">

const  authStore = useAuthStore();
import NoPermission from  '@/components/Common/NoPermission.vue'
const permissions = computed(() => authStore.user?.data?.permissions ?? []);

import MainLayout from "~/layouts/Dashboard/MainLayout.vue";
import ClientTable from "../../components/client/ClientTable.vue";

definePageMeta({
  middleware: ["auth"],
});

</script>