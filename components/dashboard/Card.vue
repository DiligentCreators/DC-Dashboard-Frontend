<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
    <div
        v-for="(stat, index) in stats"
        :key="stat.label"
        class="group relative transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"
        :class="`animate-delay-${index * 100}`"
    >
      <!-- Glass background -->
      <div
          class="absolute inset-0 rounded-2xl backdrop-blur-xl border shadow-2xl"
          :class="[
          'bg-gradient-to-br from-white/30 via-white/10 to-white/5',
          'dark:from-gray-700/30 dark:via-gray-800/10 dark:to-gray-900/5',
          'border-white/20 dark:border-gray-700/40'
        ]"
      ></div>

      <!-- Hover gradient border -->
      <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10"></div>

      <!-- Content -->
      <div class="relative z-10 p-6 h-full flex flex-col justify-between space-y-4">
        <!-- Header -->
        <div class="flex items-center justify-between">
          <div
              :class="[
              'relative p-3 rounded-xl shadow-xl transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3',
              stat.bgClass
            ]"
          >
            <!-- Icon shine effect -->
            <div class="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-xl dark:from-white/10"></div>
            <Icon
                :name="stat.icon"
                class="w-7 h-7 text-white relative z-10 drop-shadow-lg"
            />
            <!-- Floating dots -->
            <div class="absolute top-1 right-1 w-1 h-1 bg-white/60 rounded-full animate-ping"></div>
            <div class="absolute bottom-2 left-2 w-0.5 h-0.5 bg-white/40 rounded-full animate-pulse"></div>
          </div>

          <!-- Status indicator -->
          <div class="relative">
            <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <div class="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
          </div>
        </div>

        <!-- Stats -->
        <div class="space-y-2">
          <p class="text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider opacity-80">
            {{ stat.label }}
          </p>
          <div class="flex items-baseline gap-2">
            <p class="text-3xl font-bold text-gray-900 dark:text-white transform transition-all duration-700 group-hover:scale-105">
              {{ stat.count.toLocaleString() }}
            </p>
            <span
                :class="[
                'text-xs font-semibold px-2 py-1 rounded-full',
                stat.growth >= 0 ? 'text-green-400 bg-green-400/20' : 'text-red-400 bg-red-400/20'
              ]"
            >
              {{ stat.growth >= 0 ? '+' : '' }}{{ stat.growth }}%
            </span>
          </div>
        </div>

        <!-- Progress bar -->
        <div class="w-full h-1.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
          <div
              :class="[
              'h-full rounded-full transition-all duration-1000 ease-out transform origin-left',
              stat.bgClass,
              'shadow-lg'
            ]"
              :style="{
              width: `${(stat.count / Math.max(...stats.map(s => s.count))) * 100}%`,
              boxShadow: `0 0 20px ${stat.glowColor}`
            }"
          ></div>
        </div>

        <!-- Decorative elements -->
        <div class="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-white/20 to-white/5 dark:from-white/10 dark:to-white/5 rounded-full animate-bounce" style="animation-duration: 3s;"></div>
        <div class="absolute bottom-6 left-4 w-4 h-4 bg-gradient-to-br from-white/15 to-white/5 dark:from-white/5 dark:to-white/5 rounded-full animate-bounce" style="animation-duration: 3s; animation-delay: 1s; animation-direction: reverse;"></div>
      </div>

      <!-- Hover glow -->
      <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/10 via-purple-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl -z-20"></div>

      <!-- Card reflection -->
      <div class="absolute inset-0 rounded-2xl bg-gradient-to-t from-transparent via-white/5 to-white/20 dark:via-white/10 dark:to-white/5 opacity-60"></div>
    </div>
  </div>
</template>

<script setup>

const dashboardStore = useDashboardStore();

onMounted(() => {
  dashboardStore.fetchCards()
})
const stats = computed(() => [
  {
    label: 'Users',
    count: dashboardStore.Staffs || 0,
    icon: 'lucide-shield-check',
    bgClass: 'bg-gradient-to-br from-purple-500 to-purple-600',
    glowColor: 'rgba(168, 85, 247, 0.5)',
    growth: 15.7,
  },
  {
    label: 'Clients',
    count: dashboardStore.Users || 0,
    icon: 'lucide-users',
    bgClass: 'bg-gradient-to-br from-blue-500 to-blue-600',
    glowColor: 'rgba(59, 130, 246, 0.5)',
    growth: 12.5,
  },

  {
    label: 'Active Users',
    count: dashboardStore.activeUser || 0,
    icon: 'lucide-user-check',
    bgClass: 'bg-gradient-to-br from-green-500 to-green-600',
    glowColor: 'rgba(34, 197, 94, 0.5)',
    growth: 8.3,
  },
  {
    label: 'Suspended Users',
    count: dashboardStore.suspendedUser || 0,
    icon: 'lucide-user-x',
    bgClass: 'bg-gradient-to-br from-red-500 to-red-600',
    glowColor: 'rgba(239, 68, 68, 0.5)',
    growth: -2.1,
  },

])
</script>

<style scoped>
/* Custom animation delays for staggered entrance */
.animate-delay-0 { animation-delay: 0ms; }
.animate-delay-100 { animation-delay: 100ms; }
.animate-delay-200 { animation-delay: 200ms; }
.animate-delay-300 { animation-delay: 300ms; }

/* Enhanced pulse animation */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.02);
  }
}

/* Smooth entrance animation */
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Progress bar glow effect */
.shadow-lg {
  filter: drop-shadow(0 0 10px currentColor);
}
</style>