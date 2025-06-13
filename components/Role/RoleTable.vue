<script setup>
import { ref, computed, onMounted } from 'vue'
import Breadcrumb from '~/components/dashboard/Breadcrumb.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


// Store and toast
const roleStore = useRoleStore()

// Table Columns (remove type annotations)
const columns = [
  { accessorKey: 'id', header: '#' },
  { accessorKey: 'name', header: 'NAME' },
  { accessorKey: 'is_active', header: 'ACTIVE' },
  { id: 'action', header: '' }
]

// Filters
const filters = ref({
  search: '',
  activeInactive: '',
  deleted: '',
})

// Pagination
const pageSize = ref(10)

// Get client list with mapped properties
const data = computed(() => {
  return roleStore.Roles.map(role => ({
    ...role,
    is_deleted: role.deleted_at !== null
  }))
})

// Filtered data
const filteredData = computed(() => {
  return data.value.filter(user => {
    const search = filters.value.search.toLowerCase()

    const matchesSearch =
        !search ||
        user.name?.toLowerCase().includes(search) ||
        user.email?.toLowerCase().includes(search) ||
        user.username?.toLowerCase().includes(search)

    const matchesActive =
        !filters.value.activeInactive ||
        (filters.value.activeInactive === 'active' && user.is_active) ||
        (filters.value.activeInactive === 'inactive' && !user.is_active)


    const matchesDeleted =
        filters.value.deleted === 'all' ||
        (filters.value.deleted === 'deleted' && user.deleted_at) ||
        (filters.value.deleted === '' && !user.deleted_at)

    return matchesSearch && matchesActive  && matchesDeleted
  })
})


const toggleActive = async (user) => {
  try {
    await roleStore.toggleActiveStatus(user.id)
    await roleStore.fetchRoles()
  } catch (error) {}
}



// Clear filters
function clearFilters() {
  filters.value = {
    search: '',
    activeInactive: '',
    deleted: '',
  }
}

// Check if filters are active
const hasActiveFilters = computed(() => {
  return Object.values(filters.value).some(val => val !== '')
})

// Breadcrumb
const breadcrumbItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Role List', to: '/roles' }
]
const loading = ref(false)

// Fetch clients on mount
onMounted(async () => {
  loading.value = true
  await roleStore.fetchRoles()
  loading.value = false
})


const { confirmDelete } = useDelete()

const handleDelete = async (id) => {
  loading.value = true
  await confirmDelete(() => roleStore.deleteRole(id))
  loading.value = false
}

const handleRestore = async (id) => {
  loading.value = id
  try {

    await roleStore.restoreRole(id)
  } catch (error) {
  } finally {
    loading.value = false
  }
}

const handleForceDelete = async (id) => {
  loading.value = id
  try {
    await confirmDelete(() => roleStore.forceDeleteRole(id))
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}
watchEffect(() => {
  if (loading.value) {
    NProgress.start()
  } else {
    NProgress.done()
  }
})
</script>

<template>
  <div>
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
              placeholder="Search name, email or username"
              class="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 w-64"
          />

          <!-- Filter Active/Inactive -->
          <select v-model="filters.activeInactive" class="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>


          <!-- Filter Deleted -->
          <!-- Filter Deleted -->
          <select v-model="filters.deleted" class="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
            <option value="">Active Users</option>
            <option value="deleted">Deleted Users</option>
            <option value="all">All Users</option>
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
            <th class="text-left py-4 px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">ACTIVE</th>
            <th class="text-right py-4 px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"></th>
          </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="user in filteredData" :key="user.id" class="hover:bg-gray-50 dark:hover:bg-gray-700/50">
            <!-- ID -->
            <td class="py-4 px-6 text-sm text-gray-900 dark:text-gray-100">
              {{ user.id }}
            </td>

            <!-- Name -->
            <td class="py-4 px-6">
              <div class="flex items-center gap-3">

                <div>
                  <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ user.name }}</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ user.email }}</p>
                </div>
              </div>
            </td>



            <!-- Active Toggle -->
            <td class="py-4 px-6">
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                    type="checkbox"
                    class="sr-only"
                    :checked="user.is_active"
                    @change="toggleActive(user)"
                />
                <div class="w-10 h-6 bg-gray-200 dark:bg-gray-700 rounded-full transition-colors duration-200"
                     :class="user.is_active ? 'bg-green-500 dark:bg-green-600' : 'bg-gray-300 dark:bg-gray-600'">
                  <div class="w-4 h-4 bg-white dark:bg-gray-200 rounded-full shadow transform transition-transform duration-200 translate-y-1"
                       :class="user.is_active ? 'translate-x-5' : 'translate-x-1'"></div>
                </div>
              </label>
            </td>



            <!-- Actions -->
            <td class="py-4 px-6 text-right">
              <div class="flex items-center justify-end gap-2">


                <!-- Edit (only show for non-deleted users) -->
                <Nuxt-link v-if="!user.deleted_at" :to="`${user.id}/edit`">
                  <UButton
                      icon="i-lucide-edit"
                      variant="ghost"
                      size="sm"
                      color="neutral"
                  />
                </Nuxt-link>

                <!-- Delete/Restore/Force Delete -->
                <template v-if="!user.deleted_at">
                  <UButton
                      icon="i-lucide-trash-2"
                      variant="ghost"
                      size="sm"
                      color="error"
                      @click="handleDelete(user.id)"
                      :loading="loading === user.id"
                  />
                </template>
                <template v-else>
                  <UButton
                      icon="i-lucide-rotate-ccw"
                      variant="ghost"
                      size="sm"
                      color="ne"
                      @click="handleRestore(user.id)"
                      :loading="loading === user.id"
                  />
                  <UButton
                      icon="i-lucide-trash-2"
                      variant="ghost"
                      size="sm"
                      color="error"
                      @click="handleForceDelete(user.id)"
                      :loading="loading === user.id"
                  />
                </template>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="filteredData.length === 0" class="text-center py-12">
        <div class="text-4xl mb-4">📝</div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No Roles found</h3>
        <p class="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Your existing styles */
</style>