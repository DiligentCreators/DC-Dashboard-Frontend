<!-- components/Common/Breadcrumb.vue -->
<template>
  <div class="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
    <template v-for="(crumb, index) in items" :key="index">
      <NuxtLink
          v-if="index < items.length - 1"
          :to="crumb.to"
          class="hover:underline  transition-colors"
      >
        {{ crumb.label }}
      </NuxtLink>
      <span v-else class="text-gray-600 dark:text-gray-300">{{ crumb.label }}</span>
      <span v-if="index < items.length - 1" class="mx-2">/</span>
    </template>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
    default: () => []
  }
})
</script>
