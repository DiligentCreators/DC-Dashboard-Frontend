<template>

  <MainLayout>
<EmailTemplates v-if="permissions.includes('email-templates.list')"/>
    <NoPermission v-else/>
  </MainLayout>
</template>

<script setup>

import {computed} from "vue";

const  authStore = useAuthStore()
const permissions = computed(() => authStore.user?.data?.permissions ?? []);
import NoPermission from  '@/components/Common/NoPermission.vue'

definePageMeta({
  middleware: ["auth","admin"],
});
useHead({
  title: 'Dashboard - Email Templates',
})
import EmailTemplates from '@/components/Email/EmailTemplate.vue'
import MainLayout from "~/layouts/Dashboard/MainLayout.vue";
</script>