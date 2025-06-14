<template>

  <MainLayout>
<EmailTemplates />
  </MainLayout>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
});
import EmailTemplates from '@/components/Email/EmailTemplate.vue'
import MainLayout from "~/layouts/Dashboard/MainLayout.vue";
</script>