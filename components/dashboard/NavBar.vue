<template>
  <div class="sidebar-container" :class="{ 'sidebar-open': isOpen }">
    <div class="sidebar-overlay" @click="closeSidebar" v-if="isOpen"></div>

    <aside class="sidebar" :class="{ 'sidebar-mobile-open': isOpen }">
      <!-- Header Section -->
      <div class="sidebar-header">
        <div class="profile-section">
          <div class="profile-avatar">
            <img
                :src="user.avatar || '/default-avatar.png'"
                :alt="user.name"
                class="avatar-image"
            />
          </div>
          <div class="profile-info">
            <h3 class="profile-name">{{ user.name }}</h3>
            <p class="profile-role">{{ user.role }}</p>
          </div>
        </div>

        <!-- Menu Toggle Button -->
        <button @click="toggleSidebar" class="menu-toggle" aria-label="Toggle menu">
          <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- Navigation Menu -->
      <nav class="sidebar-nav">
        <ul class="nav-list">
          <li v-for="item in navigationItems" :key="item.id" class="nav-item">
            <NuxtLink
                :to="item.route"
                class="nav-link"
                :class="{ 'nav-link-active': isActiveRoute(item.route) }"
                @click="handleNavClick(item)"
            >
              <component :is="getIcon(item.icon)" class="nav-icon" />
              <span class="nav-text">{{ item.label }}</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </aside>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// Props
const props = defineProps({
  user: {
    type: Object,
    default: () => ({
      name: 'Developer',
      role: 'Administrator',
      avatar: null
    })
  },
  initialOpen: {
    type: Boolean,
    default: false
  }
})

// Composables
const router = useRouter()
const route = useRoute()

// Reactive state
const isOpen = ref(props.initialOpen)

// Navigation items
const navigationItems = ref([
  {
    id: 'account',
    label: 'My Account',
    route: '/account',
    icon: 'UserIcon'
  },
  {
    id: 'settings',
    label: 'Settings',
    route: '/settings',
    icon: 'SettingsIcon'
  },
  {
    id: 'lock',
    label: 'Lock My Account',
    route: '/lock-account',
    icon: 'LockIcon'
  },
  {
    id: 'pulse',
    label: 'App Pulse',
    route: '/app-pulse',
    icon: 'PulseIcon'
  },
  {
    id: 'logs',
    label: 'Dev Logs',
    route: '/dev-logs',
    icon: 'LogsIcon'
  },
  {
    id: 'backup',
    label: 'App Backup',
    route: '/app-backup',
    icon: 'BackupIcon'
  },
  {
    id: 'telescope',
    label: 'App TeleScope',
    route: '/app-telescope',
    icon: 'TelescopeIcon'
  },
  {
    id: 'logout',
    label: 'Logout',
    route: '/logout',
    icon: 'LogoutIcon'
  }
])

// Methods
const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}

const closeSidebar = () => {
  isOpen.value = false
}

const handleNavClick = (item) => {
  if (item.id === 'logout') {
    handleLogout()
  } else {
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      closeSidebar()
    }
  }

  emit('navItemClick', item)
}

const handleLogout = () => {
  // Add your logout logic here
  console.log('Logging out...')
  emit('logout')
}

const isActiveRoute = (routePath) => {
  return route.path === routePath
}

// Icon components (you can replace these with your preferred icon library)
const getIcon = (iconName) => {
  const icons = {
    UserIcon: () => h('svg', {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2'
    }, [
      h('path', { d: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' }),
      h('circle', { cx: '12', cy: '7', r: '4' })
    ]),

    SettingsIcon: () => h('svg', {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2'
    }, [
      h('circle', { cx: '12', cy: '12', r: '3' }),
      h('path', { d: 'M12 1v6m0 6v6m11-7h-6m-6 0H1m17.5-3.5L19 12l3.5 3.5M5 8.5L1.5 12 5 15.5' })
    ]),

    LockIcon: () => h('svg', {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2'
    }, [
      h('rect', { x: '3', y: '11', width: '18', height: '11', rx: '2', ry: '2' }),
      h('circle', { cx: '12', cy: '16', r: '1' }),
      h('path', { d: 'M7 11V7a5 5 0 0 1 10 0v4' })
    ]),

    PulseIcon: () => h('svg', {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2'
    }, [
      h('polyline', { points: '22,12 18,12 15,21 9,3 6,12 2,12' })
    ]),

    LogsIcon: () => h('svg', {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2'
    }, [
      h('path', { d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' }),
      h('polyline', { points: '14,2 14,8 20,8' }),
      h('line', { x1: '16', y1: '13', x2: '8', y2: '13' }),
      h('line', { x1: '16', y1: '17', x2: '8', y2: '17' }),
      h('polyline', { points: '10,9 9,9 8,9' })
    ]),

    BackupIcon: () => h('svg', {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2'
    }, [
      h('path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' }),
      h('polyline', { points: '7,10 12,15 17,10' }),
      h('line', { x1: '12', y1: '15', x2: '12', y2: '3' })
    ]),

    TelescopeIcon: () => h('svg', {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2'
    }, [
      h('path', { d: 'M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z' }),
      h('path', { d: 'M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z' })
    ]),

    LogoutIcon: () => h('svg', {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2'
    }, [
      h('path', { d: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' }),
      h('polyline', { points: '16,17 21,12 16,7' }),
      h('line', { x1: '21', y1: '12', x2: '9', y2: '12' })
    ])
  }

  return icons[iconName] || icons.UserIcon
}

// Handle window resize
const handleResize = () => {
  if (window.innerWidth >= 768) {
    isOpen.value = false
  }
}

// Emits
const emit = defineEmits(['navItemClick', 'logout', 'sidebarToggle'])

// Watch for sidebar state changes
watch(isOpen, (newValue) => {
  emit('sidebarToggle', newValue)
})

// Lifecycle
onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

// Expose methods to parent
defineExpose({
  toggleSidebar,
  closeSidebar,
  isOpen
})
</script>

<style scoped>
.sidebar-container {
  position: relative;
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 40;
  display: none;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 320px;
  background-color: #1a1d23;
  border-right: 1px solid #2d3748;
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;
  z-index: 50;
  overflow-y: auto;
}

.sidebar-header {
  padding: 24px 20px;
  border-bottom: 1px solid #2d3748;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.profile-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.profile-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.profile-info {
  flex: 1;
}

.profile-name {
  font-size: 16px;
  font-weight: 600;
  color: #f7fafc;
  margin: 0 0 4px 0;
}

.profile-role {
  font-size: 14px;
  color: #a0aec0;
  margin: 0;
}

.menu-toggle {
  background: none;
  border: none;
  color: #a0aec0;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.menu-toggle:hover {
  background-color: #2d3748;
  color: #f7fafc;
}

.menu-icon {
  width: 20px;
  height: 20px;
}

.sidebar-nav {
  padding: 20px 0;
}

.nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin-bottom: 4px;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  color: #a0aec0;
  text-decoration: none;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.nav-link:hover {
  background-color: #2d3748;
  color: #f7fafc;
  border-left-color: #4299e1;
}

.nav-link-active {
  background-color: #2d3748;
  color: #4299e1;
  border-left-color: #4299e1;
}

.nav-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.nav-text {
  font-size: 14px;
  font-weight: 500;
}

/* Mobile styles */
@media (max-width: 767px) {
  .sidebar-overlay {
    display: block;
  }

  .sidebar-mobile-open {
    transform: translateX(0);
  }

  .sidebar-open .sidebar-overlay {
    display: block;
  }
}

/* Desktop styles */
@media (min-width: 768px) {
  .sidebar {
    position: relative;
    transform: translateX(0);
    height: auto;
    min-height: 100vh;
  }

  .menu-toggle {
    display: none;
  }
}

/* Scrollbar styling */
.sidebar::-webkit-scrollbar {
  width: 4px;
}

.sidebar::-webkit-scrollbar-track {
  background: #1a1d23;
}

.sidebar::-webkit-scrollbar-thumb {
  background: #4a5568;
  border-radius: 2px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: #718096;
}
</style>