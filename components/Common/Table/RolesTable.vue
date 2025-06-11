<script setup lang="ts">
import { ref, computed } from 'vue'
import type { TableColumn, DropdownMenuItem } from '@nuxt/ui'

interface User {
  id: number
  name: string
  active: boolean
}

const toast = useToast()

const data = ref<User[]>([
  {
    id: 1,
    name: 'Lindsay Walton',
    active: true,
  },
  {
    id: 2,
    name: 'Lindsay Walton',
    active: true,
  }, {
    id: 3,
    name: 'Lindsay Walton',
    active: true,
  }, {
    id: 4,
    name: 'Lindsay Walton',
    active: true,
  }, {
    id: 5,
    name: 'Lindsay Walton',
    active: true,
  },

])

const columns: TableColumn<User>[] = [
  { accessorKey: 'id', header: '#' },
  { accessorKey: 'name', header: 'NAME' },
  { accessorKey: 'active', header: 'ACTIVE' },
  { id: 'action', header: '' }
]

const filters = ref({
  search: '',
  activeInactive: '',
  deleted: '',

})

const pageSize = ref(10)

const filteredData = computed(() => {
  return data.value.filter(user => {
    const matchesSearch = !filters.value.search ||
        user.name.toLowerCase().includes(filters.value.search.toLowerCase())

    const matchesActiveInactive = !filters.value.activeInactive ||
        (filters.value.activeInactive === 'active' && user.active) ||
        (filters.value.activeInactive === 'inactive' && !user.active)

    // Fix: Use filters.email instead of filters.verified


    return matchesSearch && matchesActiveInactive
  })
})

function getDropdownActions(user: User): DropdownMenuItem[][] {
  return [
    [
      {
        label: 'View Profile',
        icon: 'i-lucide-user',
        onSelect: () => {
          toast.add({
            title: `Viewing ${user.name}'s profile`,
            color: 'info',
            icon: 'i-lucide-user'
          })
        }
      },
      {
        label: 'Edit User',
        icon: 'i-lucide-edit',
        onSelect: () => {
          toast.add({
            title: `Edit ${user.name}`,
            color: 'info',
            icon: 'i-lucide-edit'
          })
        }
      },
      {
        label: 'Delete User',
        icon: 'i-lucide-trash-2',
        color: 'error',
        onSelect: () => {
          toast.add({
            title: `User ${user.name} deleted`,
            color: 'error',
            icon: 'i-lucide-trash-2'
          })
        }
      }
    ]
  ]
}

function toggleActive(user: User) {
  user.active = !user.active
  toast.add({
    title: `${user.name} ${user.active ? 'activated' : 'deactivated'}`,
    color: user.active ? 'success' : 'warning',
    icon: user.active ? 'i-lucide-check-circle' : 'i-lucide-pause-circle'
  })
}


function clearFilters() {
  filters.value = {
    search: '',
    activeInactive: '',

    deleted: '',

  }
}

const hasActiveFilters = computed(() => {
  return Object.values(filters.value).some(filter => filter !== '')
})
import Breadcrumb from '~/components/dashboard/Breadcrumb.vue'


const breadcrumbItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Roles List', to: 'list' },
]
</script>

<template>
  <div>
    <!-- Sidebar Navigation -->

    <!-- Main Content -->
    <!-- Breadcrumb -->
    <Breadcrumb :items="breadcrumbItems" />


    <!-- Page Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Roles</h1>
      <div class="flex items-center gap-3">
        <UButton variant="outline" color="neutral" size="sm">
          Export
        </UButton>
        <UButton variant="outline" color="neutral" size="sm" @click="clearFilters" v-if="hasActiveFilters">
          Reset Filters
        </UButton>
        <UButton color="neutral" size="sm">
          <Nuxt-link to="create">
            Create New
          </Nuxt-link>
        </UButton>
      </div>
    </div>

    <!-- Filters Row -->
    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex flex-wrap items-center gap-4">
          <!-- Page Size -->
          <select v-model="pageSize" class="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>

          <!-- Search -->
          <input
              v-model="filters.search"
              type="text"
              placeholder="Search"
              class="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 w-64"
          />

          <!-- Filter Active/Inactive -->
          <select v-model="filters.activeInactive" class="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
            <option value="">Show All</option>
            <option value="inactive">Inactive Users</option>
            <option value="inactive">Active Users</option>

          </select>

          <!-- Filter Status -->





          <!-- Filter Deleted -->
          <select v-model="filters.deleted" class="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
            <option value="">Show All</option>
            <option value="deleted">Show Deleted Only</option>
          </select>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th class="text-left py-4 px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">#</th>
            <th class="text-left py-4 px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">NAME</th>
            <th class="text-left py-4 px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">STATUS</th>
            <th class="text-right py-4 px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"></th>


          </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="user in filteredData" :key="user.id" class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
            <!-- ID -->
            <td class="py-4 px-6 text-sm text-gray-900 dark:text-gray-100">
              {{ user.id }}
            </td>
            <td class="py-4 px-6 text-sm text-gray-900 dark:text-gray-100">
              {{ user.name }}
            </td>

            <td class="py-4 px-6">
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    class="sr-only"
                    :checked="user.active"
                    @change="toggleActive(user)"
                />
                <div class="w-10 h-6 bg-gray-200 dark:bg-gray-700 rounded-full transition-colors duration-200"
                     :class="user.active ? 'bg-green-500 dark:bg-green-600' : 'bg-gray-300 dark:bg-gray-600'">
                  <div class="w-4 h-4 bg-white dark:bg-gray-200 rounded-full shadow transform transition-transform duration-200 translate-y-1"
                       :class="user.active ? 'translate-x-5' : 'translate-x-1'"></div>
                </div>
              </label>
            </td>




            <!-- Actions -->
            <td class="py-4 px-6 text-right">
              <div class="flex items-center justify-end gap-2">
                <!-- View Profile -->
                <UButton
                    icon="i-lucide-user"
                    variant="ghost"
                    size="sm"
                    color="neutral"
                    @click="toast.add({ title: `Viewing ${user.name}'s profile`, color: 'info' })"
                />
                <!-- Edit -->
                <Nuxt-link :to="`${user.id}/edit`" >
                  <UButton
                      icon="i-lucide-edit"
                      variant="ghost"
                      size="sm"
                      color="neutral"
                  />
                </Nuxt-link>
                <!-- Delete -->
                <UButton
                    icon="i-lucide-trash-2"
                    variant="ghost"
                    size="sm"
                    color="error"
                    @click="toast.add({ title: `User ${user.name} deleted`, color: 'error' })"
                />
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="filteredData.length === 0" class="text-center py-12">
        <div class="text-4xl mb-4">📝</div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No clients found</h3>
        <p class="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Smooth transitions */
* {
  transition: all 0.2s ease-in-out;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 163, 175, 0.7);
}

/* Focus states */
input:focus, select:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
</style>