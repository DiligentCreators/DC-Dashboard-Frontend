<template>
  <header class="bg-white dark:bg-gray-900 shadow px-4 py-3 flex justify-between items-center relative dark:border-b border-gray-700">
    <!-- Sidebar toggle (mobile) -->
    <button class="md:hidden text-xl" @click="$emit('toggleSidebar')">☰</button>
    <h1 class="text-lg font-bold">Admin Dashboard</h1>

    <!-- Right controls -->
    <div class="flex items-center gap-4">
      <!-- Dark/Light Mode -->
      <button
          @click="toggleDark"
          aria-label="Toggle dark mode"
          class="relative w-14 h-8 rounded-full transition-colors duration-300 focus:outline-none"
          :class="isDark ? 'bg-gray-700' : 'bg-yellow-300'"
      >
        <span
            class="absolute left-1 top-1 w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300"
            :class="isDark ? 'translate-x-6' : 'translate-x-0'"
        >
          <Icon :name="isDark ? 'line-md:moon-filled-alt-to-sunny-filled-loop-transition' : 'line-md:sunny-filled-loop-to-moon-filled-transition'" class="w-6 h-6 text-yellow-500 dark:text-gray-300" />
        </span>
      </button>

      <!-- Notification Icon -->
      <button @click="showNotification = !showNotification" class="relative text-gray-600 dark:text-gray-300 hover:text-blue-500">
        <Icon name="heroicons-outline:bell" class="w-6 h-6" />
        <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">3</span>
      </button>

      <!-- Profile Dropdown -->
      <div v-click-outside="() => dropdownOpen = false" class="relative">
        <button @click="dropdownOpen = !dropdownOpen" class="flex items-center gap-1">
          <img src="https://i.pravatar.cc/40" alt="Avatar" class="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600" />
          <Icon name="heroicons:chevron-down" class="w-4 h-4 text-gray-500 dark:text-gray-300" />
        </button>

        <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 shadow-lg rounded-md py-2 z-50">
          <NuxtLink to="/profile" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-sm text-gray-700 dark:text-gray-200">
            <Icon name="heroicons-outline:user" class="w-4 h-4" /> Profile
          </NuxtLink>
          <NuxtLink to="/settings" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-sm text-gray-700 dark:text-gray-200">
            <Icon name="heroicons-outline:cog-6-tooth" class="w-4 h-4" /> Settings
          </NuxtLink>
          <form @submit.prevent="handeLogout">
          <button type="submit" class="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-sm text-red-600 dark:text-red-400">
            <Icon name="heroicons-outline:arrow-right-on-rectangle" class="w-4 h-4" /> Logout
          </button>
          </form>
        </div>
      </div>
    </div>

    <!-- Notification Slide-Out Panel -->
    <transition name="slide">
      <div
          v-show="showNotification"
          class="fixed top-0 right-0 z-40 w-full max-w-sm h-full bg-white dark:bg-gray-800 shadow-xl p-6 overflow-y-auto border-l border-gray-200 dark:border-gray-700"
      >
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-bold text-gray-800 dark:text-white">Notifications</h2>
          <button @click="showNotification = false" class="text-gray-500 hover:text-gray-800 dark:hover:text-white">
            <Icon name="heroicons:x-mark" class="w-5 h-5" />
          </button>
        </div>
        <ul class="space-y-2">
          <li class="text-sm text-gray-700 dark:text-gray-300">🔔 New user registered</li>
          <li class="text-sm text-gray-700 dark:text-gray-300">⚠️ Server load high</li>
          <li class="text-sm text-gray-700 dark:text-gray-300">📢 New announcement posted</li>
        </ul>
      </div>
    </transition>
  </header>
</template>

<script setup>
const dropdownOpen = ref(false)
const showNotification = ref(false)

const  auth = useAuthStore();
const handeLogout = async () => {
  await auth.logout();
}
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

function toggleDark() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
