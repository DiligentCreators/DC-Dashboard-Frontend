<template>
<MainLayout>

  <div class="mb-10">
    <div v-if="auth.loginAdminAsUser">
      <h1 class="text-2xl font-bold mb-4">Admin Overview {{auth.loginAdminAsUser?.name || 'unkonwon'  }}</h1>
    </div>
    <div v-else>
      <h1 class="text-2xl font-bold mb-4">Admin Overview {{ auth.user?.user?.name || 'unkonwon' }}</h1>
    </div>


    <!-- Stats -->
    <Card />

    <!-- Top Users -->
    <UserActivityChart class="my-10"/>

    <!-- Recent Activity -->
    <RecentActivity />
  </div>
</MainLayout>


</template>
<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

import MainLayout from "~/layouts/Dashboard/MainLayout.vue";
import Card from "~/components/dashboard/Card.vue";
import RecentActivity from "~/components/dashboard/RecentActivity.vue";
import UserActivityChart from "~/components/dashboard/UserActivityChart.vue";
const  auth = useAuthStore();

</script>