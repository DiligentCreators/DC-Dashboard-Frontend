<template>
  <div class="bg-white dark:bg-gray-800 p-5 rounded-xl shadow space-y-4">
    <h2 class="text-lg font-semibold text-gray-800 dark:text-white">🏆 Top Active Users</h2>

    <div v-for="(user, index) in users" :key="user.id" class="flex items-center gap-4">
      <div class="flex items-center gap-3 w-full">
        <div class="relative">
          <div class="bg-gray-200 dark:bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold">
            {{ user.name[0] }}
          </div>
          <span
              class="absolute -top-1 -right-1 text-xs"
              :class="index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : index === 2 ? 'text-orange-500' : 'text-gray-500'"
          >
            {{ index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '' }}
          </span>
        </div>
        <div class="flex-1">
          <p class="text-sm font-medium text-gray-800 dark:text-white">{{ user.name }}</p>
          <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-1">
            <div
                class="h-full rounded-full"
                :class="user.color"
                :style="{ width: user.progress + '%' }"
            ></div>
          </div>
        </div>
        <span class="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{{ user.activity }} actions</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const users = [
  { id: 1, name: 'John Doe', activity: 54, progress: 95, color: 'bg-green-500' },
  { id: 2, name: 'Sarah Lee', activity: 48, progress: 85, color: 'bg-blue-500' },
  { id: 3, name: 'Mike Ross', activity: 33, progress: 65, color: 'bg-yellow-500' },
  { id: 4, name: 'Emma Smith', activity: 27, progress: 45, color: 'bg-red-400' }
];
</script>
