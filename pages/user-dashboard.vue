<template>
  <MainLayout>
    <div class="flex items-center gap-4 ">
      <!-- Greeting Text -->
      <div>
        <h1
            class="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-fade-in"
        >
          Welcome back, {{ auth.user.data?.name || 'Unknown' }} 🎉
        </h1>
        <p class="mt-1 text-sm sm:text-base text-gray-700 dark:text-gray-300">
          Great to see you! Here's a quick overview of your user dashboard.
        </p>
      </div>
    </div>
  </MainLayout>

</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth","user"],
});
const auth = useAuthStore();

import MainLayout from "~/layouts/Dashboard/MainLayout.vue";
</script>