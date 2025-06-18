<template>
  <MainLayout>
    <div class="">
      <div class="flex items-center gap-4 ">
        <!-- Greeting Text -->
        <div>
          <h1
              class="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-fade-in"
          >
            Welcome back, {{ auth.user.data?.name || 'Unknown' }} 🎉
          </h1>
          <p class="mt-1 text-sm sm:text-base text-gray-700 dark:text-gray-300">
            Great to see you! Here's a quick overview of your admin dashboard.
          </p>
        </div>
      </div>

      <!-- Decorative Glass Section -->
      <div class="mb-10 relative group overflow-hidden rounded-3xl">
        <div class="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-white/5 dark:from-slate-700/30 dark:via-slate-800/20 dark:to-slate-900/10 backdrop-blur-2xl rounded-3xl border border-white/20 dark:border-slate-600/20 shadow-2xl"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-700"></div>
        <div class="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute -bottom-16 -left-16 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl animate-bounce" style="animation-duration: 4s;"></div>
        <div class="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/5 via-purple-400/5 to-pink-400/5 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-2xl"></div>
      </div>

      <!-- Stats Cards -->
      <div class="mb-5">
        <Card />
      </div>


      <!-- Additional Dashboard Sections -->
      <div class=" my-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Quick Actions -->
        <div class="relative group">
          <div class="absolute inset-0 bg-white/10 dark:bg-slate-800/30 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-600/20 shadow-xl"></div>
          <div class="relative z-10 p-6">
            <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4">Quick Actions</h3>
            <div class="space-y-3">
              <button class="w-full text-left px-4 py-3 rounded-xl bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 border border-white/10 text-gray-800 dark:text-white transition-all duration-300 hover:scale-105">
               <Nuxt-link to="users/create">
                 <div class="flex items-center gap-3">
                   <Icon name="heroicons:plus" class="w-5 h-5 text-blue-400" />
                   <span>Add New User</span>
                 </div>
               </Nuxt-link>

              </button>
              <button class="w-full text-left px-4 py-3 rounded-xl bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 border border-white/10 text-gray-800 dark:text-white transition-all duration-300 hover:scale-105">
                <Nuxt-link to="admin/clients/create">
                  <div class="flex items-center gap-3">
                    <Icon name="heroicons:plus" class="w-5 h-5 text-blue-400" />
                    <span>Add New Client</span>
                  </div>
                </Nuxt-link>
              </button>
              <button class="w-full text-left px-4 py-3 rounded-xl bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 border border-white/10 text-gray-800 dark:text-white transition-all duration-300 hover:scale-105">
                <div class="flex items-center gap-3">
                  <Icon name="heroicons:cog-6-tooth" class="w-5 h-5 text-purple-400" />
                  <span>System Settings</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        <!-- System Status -->
        <div class="relative group">
          <div class="absolute inset-0 bg-white/10 dark:bg-slate-800/30 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-600/20 shadow-xl"></div>
          <div class="relative z-10 p-6">
            <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4">System Status</h3>
            <div class="space-y-4 text-sm">
              <div class="flex items-center justify-between">
                <span class="text-gray-600 dark:text-gray-300">Server</span>
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span class="text-green-400">Online</span>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600 dark:text-gray-300">Database</span>
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span class="text-green-400">Connected</span>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-gray-600 dark:text-gray-300">API</span>
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span class="text-yellow-400">Slow</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Notifications -->
        <div class="relative group">
          <div class="absolute inset-0 bg-white/10 dark:bg-slate-800/30 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-600/20 shadow-xl"></div>
          <div class="relative z-10 p-6">
            <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-4">Notifications</h3>
            <div class="space-y-3 text-sm">
              <div class="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 dark:text-blue-200">
                <p>New user registered</p>
                <p class="text-xs text-gray-400 mt-1">2 minutes ago</p>
              </div>
              <div class="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-300 dark:text-green-200">
                <p>Server backup completed</p>
                <p class="text-xs text-gray-400 mt-1">1 hour ago</p>
              </div>
              <div class="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 dark:text-yellow-200">
                <p>Storage space warning</p>
                <p class="text-xs text-gray-400 mt-1">3 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>

</template>
<script setup lang="ts">


definePageMeta({
  middleware: ["auth","admin"],
});

import MainLayout from "~/layouts/Dashboard/MainLayout.vue";
import Card from "~/components/dashboard/Card.vue";
import RecentActivity from "~/components/dashboard/RecentActivity.vue";
import UserActivityChart from "~/components/dashboard/UserActivityChart.vue";

const auth = useAuthStore();



useHead({
  title: 'Dashboard',
});
</script>

<style scoped>
/* Custom gradient animation */
@keyframes gradient-x {
  0%, 100% {
    background-size: 200% 200%;
    background-position: left center;
  }
  50% {
    background-size: 200% 200%;
    background-position: right center;
  }
}

.animate-gradient-x {
  animation: gradient-x 3s ease infinite;
}

/* Smooth entrance animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeInUp 0.8s ease-out;
}

/* Responsive text sizing */
@media (max-width: 640px) {
  .text-4xl.sm\:text-5xl.lg\:text-6xl {
    font-size: 2.5rem;
    line-height: 1.1;
  }
}
</style>