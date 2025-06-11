<template>
  <MainLayout>

    <div class="min-h-screen bg-gray-50 p-6">
      <!-- Breadcrumb -->
      <nav class="mb-6">
        <ol class="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <NuxtLink to="/dashboard" class="hover:text-gray-900">Dashboard</NuxtLink>
          </li>
          <li class="flex items-center">
            <svg class="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
            <span class="text-gray-900">Settings</span>
          </li>
        </ol>
      </nav>

      <!-- Page Title -->
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Application Settings</h1>

      <div class="flex gap-8">
        <!-- Sidebar -->
        <div class="w-64 flex-shrink-0">
          <div class="bg-white rounded-lg shadow-sm border border-gray-200">
            <nav class="p-4">
              <ul class="space-y-2">
                <li>
                  <button
                      @click="activeTab = 'application'"
                      :class="[
                    'w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors',
                    activeTab === 'application'
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  ]"
                  >
                    Application Setting
                  </button>
                </li>
                <li>
                  <button
                      @click="activeTab = 'email'"
                      :class="[
                    'w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors',
                    activeTab === 'email'
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  ]"
                  >
                    Email Settings
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <!-- Main Content -->
        <div class="flex-1">
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <!-- Application Settings Tab -->
            <div v-if="activeTab === 'application'">
              <form @submit.prevent="saveSettings" class="space-y-6">
                <!-- Application Name and URL -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label for="appName" class="block text-sm font-medium text-gray-700 mb-2">
                      Application Name
                    </label>
                    <input
                        id="appName"
                        v-model="settings.applicationName"
                        type="text"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter application name"
                    />
                  </div>
                  <div>
                    <label for="appUrl" class="block text-sm font-medium text-gray-700 mb-2">
                      Application URL
                    </label>
                    <input
                        id="appUrl"
                        v-model="settings.applicationUrl"
                        type="url"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="http://localhost"
                    />
                  </div>
                </div>

                <!-- Dark Logo and Light Logo -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Dark Logo
                    </label>
                    <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <input
                          ref="darkLogoInput"
                          type="file"
                          accept="image/jpeg,image/png"
                          @change="handleFileUpload($event, 'darkLogo')"
                          class="hidden"
                      />
                      <div v-if="settings.darkLogo" class="mb-4">
                        <img :src="settings.darkLogo" alt="Dark Logo" class="max-h-20 mx-auto" />
                      </div>
                      <button
                          type="button"
                          @click="$refs.darkLogoInput.click()"
                          class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Choose file
                      </button>
                      <span class="ml-3 text-sm text-gray-500">
                      {{ settings.darkLogoName || 'No file chosen' }}
                    </span>
                    </div>
                    <p class="mt-2 text-xs text-gray-500">
                      The dark logo will be used in dark mode. Only JPG, PNG with max 2MB file size allowed. Best image size 120×40 in pixel
                    </p>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Light Logo
                    </label>
                    <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <input
                          ref="lightLogoInput"
                          type="file"
                          accept="image/jpeg,image/png"
                          @change="handleFileUpload($event, 'lightLogo')"
                          class="hidden"
                      />
                      <div v-if="settings.lightLogo" class="mb-4">
                        <img :src="settings.lightLogo" alt="Light Logo" class="max-h-20 mx-auto" />
                      </div>
                      <button
                          type="button"
                          @click="$refs.lightLogoInput.click()"
                          class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Choose file
                      </button>
                      <span class="ml-3 text-sm text-gray-500">
                      {{ settings.lightLogoName || 'No file chosen' }}
                    </span>
                    </div>
                    <p class="mt-2 text-xs text-gray-500">
                      The light logo will be used in light mode. Only JPG, PNG with max 2MB file size allowed. Best image size 120×40 in pixel
                    </p>
                  </div>
                </div>

                <!-- Favicon -->
                <div class="max-w-md">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Fav Icon
                  </label>
                  <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <input
                        ref="faviconInput"
                        type="file"
                        accept="image/jpeg,image/png"
                        @change="handleFileUpload($event, 'favicon')"
                        class="hidden"
                    />
                    <div v-if="settings.favicon" class="mb-4">
                      <img :src="settings.favicon" alt="Favicon" class="max-h-16 mx-auto" />
                    </div>
                    <button
                        type="button"
                        @click="$refs.faviconInput.click()"
                        class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Choose file
                    </button>
                    <span class="ml-3 text-sm text-gray-500">
                    {{ settings.faviconName || 'No file chosen' }}
                  </span>
                  </div>
                  <p class="mt-2 text-xs text-gray-500">
                    Only JPG, PNG with max 2MB file size allowed. Best image size 512×512 in pixel
                  </p>
                </div>

                <!-- Save Button -->
                <div class="pt-4">
                  <button
                      type="submit"
                      :disabled="loading"
                      class="inline-flex items-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                  <span v-if="loading" class="mr-2">
                    <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                    {{ loading ? 'Saving...' : 'Save' }}
                  </button>
                </div>
              </form>
            </div>

            <!-- Email Settings Tab -->
            <div v-else-if="activeTab === 'email'">
              <div class="text-center py-12">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h3 class="mt-4 text-lg font-medium text-gray-900">Email Settings</h3>
                <p class="mt-2 text-sm text-gray-500">Configure your email settings here.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Success Toast -->
      <Transition
          enter-active-class="transition ease-out duration-300"
          enter-from-class="opacity-0 transform translate-y-2"
          enter-to-class="opacity-100 transform translate-y-0"
          leave-active-class="transition ease-in duration-200"
          leave-from-class="opacity-100 transform translate-y-0"
          leave-to-class="opacity-0 transform translate-y-2"
      >
        <div
            v-if="showSuccessToast"
            class="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
        >
          <div class="flex items-center">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            Settings saved successfully!
          </div>
        </div>
      </Transition>
    </div>

  </MainLayout>
</template>


<script setup>
// Page meta
import MainLayout from "~/layouts/Dashboard/MainLayout.vue";

definePageMeta({
  title: 'Application Settings',
  layout: 'dashboard'
})

// Reactive data
const activeTab = ref('application')
const loading = ref(false)
const showSuccessToast = ref(false)

const settings = reactive({
  applicationName: 'khan',
  applicationUrl: 'http://localhost',
  darkLogo: null,
  darkLogoName: null,
  lightLogo: null,
  lightLogoName: null,
  favicon: null,
  faviconName: null
})

// Methods
const handleFileUpload = (event, type) => {
  const file = event.target.files[0]
  if (!file) return

  // Validate file size (2MB max)
  if (file.size > 2 * 1024 * 1024) {
    alert('File size must be less than 2MB')
    return
  }

  // Validate file type
  if (!['image/jpeg', 'image/png'].includes(file.type)) {
    alert('Only JPG and PNG files are allowed')
    return
  }

  // Create preview URL
  const reader = new FileReader()
  reader.onload = (e) => {
    settings[type] = e.target.result
    settings[`${type}Name`] = file.name
  }
  reader.readAsDataURL(file)
}

const saveSettings = async () => {
  loading.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Here you would typically send the data to your API
    // const response = await $fetch('/api/settings', {
    //   method: 'POST',
    //   body: settings
    // })

    console.log('Settings saved:', settings)

    // Show success toast
    showSuccessToast.value = true
    setTimeout(() => {
      showSuccessToast.value = false
    }, 3000)

  } catch (error) {
    console.error('Error saving settings:', error)
    alert('Error saving settings. Please try again.')
  } finally {
    loading.value = false
  }
}

// Load existing settings on component mount
onMounted(async () => {
  try {
    // Here you would typically fetch existing settings from your API
    // const existingSettings = await $fetch('/api/settings')
    // Object.assign(settings, existingSettings)
  } catch (error) {
    console.error('Error loading settings:', error)
  }
})
</script>

<style scoped>
/* Custom styles if needed */
</style>