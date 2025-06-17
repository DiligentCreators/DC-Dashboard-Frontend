<template>
  <!-- Mobile Overlay -->
  <div
      v-if="isOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
      @click="$emit('close')"
  ></div>

  <!-- Sidebar -->
  <aside
      :class="[
      'bg-gray-100 dark:bg-gray-900 w-64 p-4 space-y-4 dark:border-r border-gray-700 ',
      'fixed z-20 h-full overflow-auto md:relative md:block',
      isOpen ? 'block' : 'hidden'
    ]"
  >
    <!-- Close button for mobile -->
    <div class="flex justify-end md:hidden">
      <button @click="$emit('close')" class="text-gray-600 dark:text-gray-300">
        <Icon name="feather-x" class="w-5 h-5" />
      </button>
    </div>

    <nav class="space-y-2">
      <template v-for="item in menu" :key="item.label">
        <div v-if="item.children && item.children.length">
          <!-- Parent menu with children -->
          <button
              @click="toggleMenu(item.label)"
              class="flex items-center justify-between w-full p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <div class="flex items-center gap-2">
              <Icon
                  :name="item.icon"
                  class="w-5 h-5 transition-colors duration-300"
                  :class="{
                   'text-gary-400 dark:text-gary-800':

                    isMenuOpen(item.label) || isChildActive(item.children),
                  'text-gray-500 dark:text-gray-400':
                    !(isMenuOpen(item.label) || isChildActive(item.children))
                }"
              />
              {{ item.label }}
            </div>
            <Icon
                name="feather-chevron-right"
                :class="{ 'rotate-90': isMenuOpen(item.label) }"
                class="w-4 h-4 transition-transform"
            />
          </button>

          <!-- Children -->
          <div v-show="isMenuOpen(item.label)" class="ml-6 mt-2 space-y-1">
            <NuxtLink
                v-for="child in item.children"
                :key="child.label"
                :to="child.to"
                :class="linkClasses(child.to)"
                class="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Icon
                  v-if="child.icon"
                  :name="child.icon"
                  class="w-4 h-4 inline mr-2 transition-colors duration-300"
                  :class="{
                  'text-gary-400 dark:text-gary-800':
                    route.path === child.to || route.path.startsWith(child.to + '/'),
                  'text-gray-500 dark:text-gray-400':
                    !(route.path === child.to || route.path.startsWith(child.to + '/'))
                }"
              />
              {{ child.label }}
            </NuxtLink>
          </div>
        </div>
        <div v-else>
          <!-- Single menu item -->
          <NuxtLink
              :to="item.to"
              :class="linkClasses(item.to)"
              class="flex items-center gap-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Icon
                :name="item.icon"
                class="w-5 h-5 transition-colors duration-300"
                :class="{
                 'text-gary-400 dark:text-gary-800':
                  route.path === item.to || route.path.startsWith(item.to + '/'),
                'text-gray-500 dark:text-gray-400':
                  !(route.path === item.to || route.path.startsWith(item.to + '/'))
              }"
            />
            {{ item.label }}
          </NuxtLink>
        </div>
      </template>
    </nav>
    <UButton
        v-if="authStore.user?.data.is_impersonating"
        color="error"
        variant="solid"
        @click="leaveImpersonation"
        :loading="loading"
        :disabled="loading"

    >
      Back to Admin
    </UButton>

  </aside>
</template>
<script setup>

import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const authStore = useAuthStore()

const loading = ref(false)


 const  leaveImpersonation =async () => {
   loading.value = true
  await authStore.leaveImpersonation()
   loading.value = false
 }
defineProps({ isOpen: Boolean })
defineEmits(['close'])

const route = useRoute()
const openMenus = ref({})

// Fake permissions from store
const roles = computed(() => authStore.user?.data?.roles ?? [])
const permissions = computed(() => authStore.user?.data?.permissions ?? [])

function toggleMenu(label) {
  openMenus.value[label] = !openMenus.value[label]
}

function isMenuOpen(label) {
  return !!openMenus.value[label]
}

function isChildActive(children) {
  return children.some(
      (child) => route.path === child.to || route.path.startsWith(child.to + '/')
  )
}

function linkClasses(path) {
  return [
    'flex items-center gap-2 p-2 rounded transition-colors duration-200'
  ].join(' ')
}

//  Raw menu with permissions
const rawMenu = [
  {
    label: 'Dashboard',
    to: '/dashboard',
    icon: 'lucide:layout-dashboard',
    permissions: [] // Always visible
  },
  {
    label: 'Clients',
    to: '/admin/client',
    icon: 'lucide:user-square',
    permissions: ['clients.list', 'clients.create']
  },
  {
    label: 'Manage Users',
    icon: 'lucide:users-round',
    permissions: [],
    children: [
      {
        label: 'User List',
        to: '/users/list',
        icon: 'lucide:list',
        permissions: ['users.list']
      },
      {
        label: 'Create User',
        to: '/users/create',
        icon: 'lucide:user-plus',
        permissions: ['users.create']
      },
      {
        label: 'Manage Roles',
        to: '/roles/list',
        icon: 'lucide:shield-check',
        permissions: ['roles.list']
      }
    ]
  },
  {
    label: 'Email & Setting',
    icon: 'lucide:mail',
    permissions: [],
    children: [
      {
        label: 'Email Templates',
        to: '/email/email-templates',
        icon: 'lucide:list',
        permissions: ['email-templates.list']
      },
      {
        label: 'Create New Email',
        to: '/email/create',
        icon: 'lucide:user-plus',
        permissions: ['email-templates.create']
      },
      // {
      //   label: 'Global Header & Footer',
      //   to: '/email/global-email-templates',
      //   icon: 'lucide:shield-check',
      //   permissions: ['global-email-templates.list']
      // }
    ]
  }
]

//  Helper: check if user has at least 1 required permission
function hasAnyPermission(required = []) {
  if (!required.length) return true // no restriction
  return required.some(p => permissions.value.includes(p))
}

//  Build filtered menu
const menu = computed(() => {
  return rawMenu
      .map((item) => {
        if (item.children) {
          const filteredChildren = item.children.filter(child =>
              hasAnyPermission(child.permissions)
          )
          if (filteredChildren.length > 0) {
            return {
              ...item,
              children: filteredChildren
            }
          }
          return null
        } else {
          return hasAnyPermission(item.permissions) ? item : null
        }
      })
      .filter(Boolean)
})





</script>
<style scoped>
.rotate-90 {
  transform: rotate(90deg);
}

</style>