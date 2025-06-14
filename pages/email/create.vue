<template>
  <CreateTemplate />
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
});
import CreateTemplate from '@/components/Email/CreateTemplate.vue'
</script>