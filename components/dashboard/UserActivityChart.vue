<!-- components/UserActivityChart.vue -->
<template>
  <div class="bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
    <h2 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">📊 User Activity</h2>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const chartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Active Users',
      backgroundColor: '#3B82F6',
      data: [40, 55, 75, 60, 80, 90, 100],
    },
  ],
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        color: '#9CA3AF',
      },
    },
    x: {
      ticks: {
        color: '#9CA3AF',
      },
    },
  },
  plugins: {
    legend: {
      labels: {
        color: '#9CA3AF',
      },
    },
  },
}
</script>

<style scoped>
div {
  height: 300px;
}
</style>
