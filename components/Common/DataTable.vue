<script setup lang="ts">
import type { TableColumn, DropdownMenuItem } from '@nuxt/ui'

interface Props {
  data: any[]
  columns: TableColumn[]
  filters?: {
    search?: boolean
    status?: boolean
    emailVerification?: boolean
    activeInactive?: boolean
    customFilters?: {
      key: string
      label: string
      options: { value: string; label: string }[]
    }[]
  }
  actions?: {
    view?: boolean
    edit?: boolean | string // can be boolean or route pattern
    delete?: boolean
    customActions?: {
      label: string
      icon: string
      color?: string
      action: (item: any) => void
    }[]
  }
  pageSizeOptions?: number[]
  title?: string
  createRoute?: string
  exportFunction?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  filters: () => ({}),
  actions: () => ({}),
  pageSizeOptions: () => [10, 25, 50, 100],
  title: '',
  createRoute: '',
})

const emit = defineEmits(['update:filters', 'action'])

const toast = useToast()

// Local filter state
const localFilters = ref<Record<string, any>>({})
const pageSize = ref(props.pageSizeOptions[0])

// Initialize filters based on props
watch(() => props.filters, (newFilters) => {
  localFilters.value = {
    search: '',
    ...Object.keys(newFilters).reduce((acc, key) => {
      if (newFilters[key as keyof typeof newFilters] === true) {
        acc[key] = ''
      }
      return acc
    }, {} as Record<string, any>),
    ...(newFilters.customFilters?.reduce((acc, filter) => {
      acc[filter.key] = ''
      return acc
    }, {} as Record<string, any>) || {})
  }
}, { immediate: true })

const filteredData = computed(() => {
  return props.data.filter(item => {
    // Search filter
    const matchesSearch = !localFilters.value.search ||
        Object.keys(item).some(key =>
            String(item[key]).toLowerCase().includes(localFilters.value.search.toLowerCase())
        )

    // Status filter
    const matchesStatus = !localFilters.value.status ||
        item.status === localFilters.value.status

    // Email verification filter
    const matchesEmailVerification = !localFilters.value.emailVerification ||
        (localFilters.value.emailVerification === 'verified' && item.emailVerified) ||
        (localFilters.value.emailVerification === 'unverified' && !item.emailVerified)

    // Active/Inactive filter
    const matchesActiveInactive = !localFilters.value.activeInactive ||
        (localFilters.value.activeInactive === 'active' && item.active) ||
        (localFilters.value.activeInactive === 'inactive' && !item.active)

    // Custom filters
    const matchesCustomFilters = !props.filters.customFilters ||
        props.filters.customFilters.every(filter =>
            !localFilters.value[filter.key] ||
            item[filter.key] === localFilters.value[filter.key]
        )

    return matchesSearch && matchesStatus && matchesEmailVerification &&
        matchesActiveInactive && matchesCustomFilters
  })
})

function clearFilters() {
  Object.keys(localFilters.value).forEach(key => {
    localFilters.value[key] = ''
  })
}

const hasActiveFilters = computed(() => {
  return Object.values(localFilters.value).some(filter => filter !== '')
})

function handleAction(action: string, item: any) {
  emit('action', { action, item })
}

function getCellValue(item: any, column: TableColumn) {
  if (column.accessorFn) {
    return column.accessorFn(item)
  }
  return item[column.accessorKey as string]
}
</script>

<template>
  <div>
    <!-- Page Header -->
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ title }}</h1>
      <div class="flex items-center gap-3">
        <UButton
            v-if="exportFunction"
            variant="outline"
            color="neutral"
            size="sm"
            @click="exportFunction"
        >
          Export
        </UButton>
        <UButton
            v-if="hasActiveFilters"
            variant="outline"
            color="neutral"
            size="sm"
            @click="clearFilters"
        >
          Reset Filters
        </UButton>
        <UButton
            v-if="createRoute"
            color="neutral"
            size="sm"
            :to="createRoute"
        >
          Create New
        </UButton>
      </div>
    </div>

    <!-- Filters Row -->
    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex flex-wrap items-center gap-4">
          <!-- Page Size -->
          <select
              v-model="pageSize"
              class="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option v-for="size in pageSizeOptions" :key="size" :value="size">
              {{ size }}
            </option>
          </select>

          <!-- Search -->
          <input
              v-if="filters.search"
              v-model="localFilters.search"
              type="text"
              placeholder="Search"
              class="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 w-64"
          >

          <!-- Status Filter -->
          <select
              v-if="filters.status"
              v-model="localFilters.status"
              class="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="">Filter Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <!-- Email Verification Filter -->
          <select
              v-if="filters.emailVerification"
              v-model="localFilters.emailVerification"
              class="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="">Filter Email</option>
            <option value="verified">Verified</option>
            <option value="unverified">Unverified</option>
          </select>

          <!-- Active/Inactive Filter -->
          <select
              v-if="filters.activeInactive"
              v-model="localFilters.activeInactive"
              class="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="">Filter Active/Inactive</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <!-- Custom Filters -->
          <select
              v-for="filter in filters.customFilters"
              :key="filter.key"
              v-model="localFilters[filter.key]"
              class="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="">Filter {{ filter.label }}</option>
            <option
                v-for="option in filter.options"
                :key="option.value"
                :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th
                v-for="column in columns"
                :key="column.accessorKey || column.id"
                class="text-left py-4 px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
            >
              {{ column.header }}
            </th>
            <th
                v-if="actions.view || actions.edit || actions.delete || actions.customActions?.length"
                class="text-right py-4 px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <tr
              v-for="item in filteredData"
              :key="item.id"
              class="hover:bg-gray-50 dark:hover:bg-gray-700/50"
          >
            <td
                v-for="column in columns"
                :key="column.accessorKey || column.id"
                class="py-4 px-6 text-sm"
                :class="{
                  'text-gray-900 dark:text-gray-100': !column.color,
                  'text-right': column.align === 'right',
                  'text-center': column.align === 'center'
                }"
            >
              <template v-if="column.cell">
                <component :is="column.cell" :item="item" />
              </template>
              <template v-else>
                {{ getCellValue(item, column) }}
              </template>
            </td>

            <!-- Actions Column -->
            <td
                v-if="actions.view || actions.edit || actions.delete || actions.customActions?.length"
                class="py-4 px-6 text-right"
            >
              <div class="flex items-center justify-end gap-2">
                <!-- View Action -->
                <UButton
                    v-if="actions.view"
                    icon="i-heroicons-eye"
                    variant="ghost"
                    size="sm"
                    color="neutral"
                    @click="handleAction('view', item)"
                />

                <!-- Edit Action -->
                <template v-if="actions.edit">
                  <NuxtLink
                      v-if="typeof actions.edit === 'string'"
                      :to="typeof actions.edit === 'string' ? actions.edit.replace(':id', item.id) : '#'"
                  >
                    <UButton
                        icon="i-heroicons-pencil"
                        variant="ghost"
                        size="sm"
                        color="neutral"
                    />
                  </NuxtLink>
                  <UButton
                      v-else
                      icon="i-heroicons-pencil"
                      variant="ghost"
                      size="sm"
                      color="neutral"
                      @click="handleAction('edit', item)"
                  />
                </template>

                <!-- Delete Action -->
                <UButton
                    v-if="actions.delete"
                    icon="i-heroicons-trash"
                    variant="ghost"
                    size="sm"
                    color="error"
                    @click="handleAction('delete', item)"
                />

                <!-- Custom Actions -->
                <UButton
                    v-for="(action, index) in actions.customActions"
                    :key="index"
                    :icon="action.icon"
                    variant="ghost"
                    size="sm"
                    :color="action.color || 'neutral'"
                    @click="action.action(item)"
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
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No records found</h3>
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