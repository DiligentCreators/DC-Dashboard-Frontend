<template>
  <MainLayout>
    <CreateTemplate  v-if="permissions.includes('email-templates.create')"/>
    <NoPermission  v-else/>
  </MainLayout>


</template>

<script setup>
const  authStore = useAuthStore()
const permissions = computed(() => authStore.user?.data?.permissions ?? []);
import NoPermission from  '@/components/Common/NoPermission.vue'
import MainLayout from '~/layouts/Dashboard/MainLayout.vue'

definePageMeta({
  middleware: ["auth","admin"],
});
useHead({
  title: 'Dashboard - Create Email',
})
import CreateTemplate from '@/components/Email/CreateTemplate.vue'
</script>