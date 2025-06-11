<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <div
        v-for="stat in stats"
        :key="stat.label"
        class="bg-white dark:bg-gray-800 shadow rounded-xl p-5 flex items-center gap-4 hover:shadow-md transition"
    >
      <div
          :class="['p-3 rounded-lg', stat.bg]"
      >
        <Icon
            :name="stat.icon"
            class="w-6 h-6 text-white"
        />
      </div>

      <div>
        <p class="text-sm ">{{ stat.label }}</p>
        <p class="text-xl font-bold ">{{ stat.count }}</p>
      </div>
    </div>
  </div>
</template>


<script setup>
const stats = [
  {
    label: 'Total Users',
    count: 1200,
    icon: 'lucide-users',
    bg: 'bg-blue-500',
  },
  {
    label: 'Active Users',
    count: 980,
    icon: 'lucide-user-check',
    bg: 'bg-green-500',
  },
  {
    label: 'Suspended Users',
    count: 45,
    icon: 'lucide-user-x',
    bg: 'bg-red-500',
  },
  {
    label: 'Staff Members',
    count: 32,
    icon: 'lucide-shield-check',
    bg: 'bg-purple-500',
  },
];
</script>
