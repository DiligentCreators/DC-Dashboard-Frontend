<!-- layouts/MainLayout.vue -->
<template>
  <div class="flex h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
    <!-- Sidebar -->
    <Sidebar :isOpen="isSidebarOpen" @close="isSidebarOpen = false" />
    <button @click="isSidebarOpen = true" class="md:hidden fixed top-4 left-4 z-30">
      <Icon name="feather-menu" class="w-6 h-6 text-gray-800 dark:text-white" />
    </button>


    <!-- Main Content -->
    <div class="flex flex-col flex-1 overflow-hidden">
      <!-- Top Nav -->
      <Navbar @toggleSidebar="toggleSidebar" />

      <!-- Page content -->
      <main class="flex-1 overflow-y-auto p-4">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>

import { ref } from 'vue'
import Sidebar from "~/layouts/Dashboard/Sidebar.vue";
import Navbar from "~/layouts/Dashboard/Navbar.vue";

const isSidebarOpen = ref(false)

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>
