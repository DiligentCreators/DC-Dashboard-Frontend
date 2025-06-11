<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from '#imports'
import Input from '~/components/Common/Input.vue'
import Breadcrumb from '~/components/dashboard/Breadcrumb.vue'
import MainLayout from '~/layouts/Dashboard/MainLayout.vue'
import { useClientStore } from '~/stores/client'
const loading = ref(false)
const breadcrumbItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Client List', to: '/admin/client' },
  { label: 'Client Edit', to: '/clients/edit' }
]

const route = useRoute()
const toast = useToast()
const clientStore = useClientStore()
const id = route.params.id

const form = ref({
  name: '',
  username: '',
  email: '',
  firstName: '',
  lastName: '',
  gender: null,
  dateOfBirth: null,
  country: '',
  state: '',
  city: '',
  zipCode: '',
  emailVerified: false,
  suspended: false
})
onMounted(async () => {
  try {
    await clientStore.getClient(id)
    const clientData = clientStore.selectedClient

    const user = clientData.data
    const profile = user.profile || {}

    form.value = {
      username: user.username || '',
      email: user.email || '',
      firstName: user.name?.split(' ')[0] || '',
      lastName: user.name?.split(' ')[1] || '',
      gender: profile.gender || '',
      dateOfBirth: profile.dob || '',
      country: profile.country || '',
      state: profile.state || '',
      city: profile.city || '',
      zipCode: profile.zipcode || '',
      emailVerified: !!user.email_verified_at,
      suspended: user.is_suspended || false
    }
  } catch (error) {
    toast.add({ title: 'Failed to load client data', color: 'error' })
    console.error('Client fetch error:', error)
  }
})

const activeTab = ref('profile')

const setActiveTab = (tab) => {
  activeTab.value = tab
}

const loginAsClient = () => {
  toast.add({ title: `Logged in as ${form.value.username} (simulated)`, color: 'success' })
}

const markEmailAsVerified = () => {
  form.value.emailVerified = true
  toast.add({ title: 'Email marked as verified', color: 'success' })
}

const suspendClient = () => {
  form.value.suspended = true
  toast.add({ title: 'Client suspended', color: 'error' })
}
const saveChanges = async () => {
  try {
    const submitData = {
      username: form.value.username,
      email: form.value.email,
      name: `${form.value.firstName} ${form.value.lastName}`,
      email_verified_at: form.value.emailVerified ? new Date().toISOString() : null,
      is_suspended: form.value.suspended,

      // Profile data should be nested if your API expects it
      profile: {
        gender: form.value.gender,
        dob: form.value.dateOfBirth,
        country: form.value.country,
        state: form.value.state,
        city: form.value.city,
        zipcode: form.value.zipCode,
      }
    };

    await clientStore.updateClient(id, submitData);

    console.log(submitData)
  } catch (error) {
    console.error('Failed to update client:', error);
  }
};


const options = ref([
  { value: null, label: 'N/A' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' }
])
</script>

<template>
  <MainLayout>
    <Breadcrumb :items="breadcrumbItems" />

    <div>
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="text-4xl mb-4">⏳</div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Loading client data...</h3>
      </div>


      <!-- Client Data -->
      <div v-else>
        <!-- Header -->
        <div class="mb-6">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
            Client Profile
          </h1>
        </div>

        <!-- Profile Card -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <UAvatar
                  :src="`https://i.pravatar.cc/120?img=${form.id}`"
                  size="lg"
                  :alt="`${form.firstName} ${form.lastName} avatar`"
                  class="border-2 border-gray-200 dark:border-gray-600"
              />
              <div>
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                  {{ form.firstName || 'N/A' }} {{ form.lastName || '' }}
                </h2>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Username: {{ form.username || 'N/A' }}
                </p>
              </div>
            </div>
            <div class="flex gap-3">
              <UButton
                  color="success"
                  variant="outline"
                  size="sm"
                  @click="loginAsClient"
                  :disabled="form.suspended"
              >
                Login As Client
              </UButton>
              <UButton
                  color="success"
                  variant="outline"
                  size="sm"
                  @click="markEmailAsVerified"
                  :disabled="form.emailVerified"
              >
                Mark Email As Verified
              </UButton>
              <UButton
                  color="error"
                  variant="outline"
                  size="sm"
                  @click="suspendClient"
                  :disabled="form.suspended"
              >
                Suspend Client
              </UButton>
            </div>
          </div>
        </div>

        <!-- Tabs -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <div class="border-b border-gray-200 dark:border-gray-700">
            <nav class="flex">
              <button
                  @click="setActiveTab('profile')"
                  class="px-6 py-3 text-sm font-medium"
                  :class="activeTab === 'profile'
                  ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
              >
                <UIcon name="i-lucide-user" class="w-4 h-4 inline mr-1" />
                Profile
              </button>
              <button
                  @click="setActiveTab('personal')"
                  class="px-6 py-3 text-sm font-medium"
                  :class="activeTab === 'personal'
                  ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
              >
                <UIcon name="i-lucide-info" class="w-4 h-4 inline mr-1" />
                Personal Details
              </button>
              <button
                  @click="setActiveTab('password')"
                  class="px-6 py-3 text-sm font-medium"
                  :class="activeTab === 'password'
                  ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
              >
                <UIcon name="i-lucide-lock" class="w-4 h-4 inline mr-1" />
                Change Password
              </button>
            </nav>
          </div>

          <!-- Tab Content -->
          <div class="p-6">
            <!-- Profile Tab -->
            <div v-if="activeTab === 'profile'">
              <div class="flex items-center gap-3 mb-6">
                <UIcon name="i-lucide-mail" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <p class="text-sm text-gray-900 dark:text-gray-100">
                  {{ form.email || 'N/A' }}
                </p>
              </div>
              <div class="flex gap-3">
                <UButton
                    color="success"
                    variant="outline"
                    size="md"
                    @click="loginAsClient"
                    :disabled="form.suspended"
                >
                  Login As Client
                </UButton>
                <UButton
                    color="success"
                    variant="outline"
                    size="md"
                    @click="markEmailAsVerified"
                    :disabled="form.emailVerified"
                >
                  Mark Email As Verified
                </UButton>
                <UButton
                    color="error"
                    variant="outline"
                    size="md"
                    @click="suspendClient"
                    :disabled="form.suspended"
                >
                  Suspend Client
                </UButton>
              </div>
            </div>

            <!-- Personal Details Tab -->
            <div v-if="activeTab === 'personal'">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Personal Details -->
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Personal Details
                  </h3>
                  <div class="space-y-4">
                    <div>
                      <Input
                          v-model="form.firstName"
                          placeholder="First Name"
                          size="md"
                          class="w-full"
                      />
                    </div>
                    <div>
                      <Input
                          v-model="form.lastName"
                          placeholder="Last Name"
                          size="md"
                          class="w-full"
                      />
                    </div>
                    <div>
                      <select
                          v-model="form.gender"
                          class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      >
                        <option v-for="option in options" :key="option.value" :value="option.value">
                          {{ option.label }}
                        </option>
                      </select>
                    </div>
                    <div>
                      <Input
                          v-model="form.dateOfBirth"
                          type="date"
                          size="md"
                          class="w-full"
                      />
                    </div>
                  </div>
                </div>

                <!-- Contact Details -->
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Contact Details
                  </h3>
                  <div class="space-y-4">
                    <div>
                      <Input
                          v-model="form.country"
                          placeholder="Country"
                          size="md"
                          class="w-full"
                      />
                    </div>
                    <div>
                      <Input
                          v-model="form.state"
                          placeholder="State"
                          size="md"
                          class="w-full"
                      />
                    </div>
                    <div>
                      <Input
                          v-model="form.city"
                          placeholder="City"
                          size="md"
                          class="w-full"
                      />
                    </div>
                    <div>
                      <Input
                          v-model="form.zipCode"
                          placeholder="Zip Code"
                          size="md"
                          class="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-6">
                <UButton
                    color="neutral"
                    size="md"
                    @click="saveChanges"
                >
                  Save Changes
                </UButton>
              </div>
            </div>

            <!-- Change Password Tab -->
            <div v-if="activeTab === 'password'">
              <div class="space-y-4 max-w-md">

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    New Password
                  </label>
                  <Input
                      type="password"
                      placeholder="New Password"
                      size="md"
                      class="w-full"
                  />
                </div>

                <div class="mt-4">
                  <UButton
                      color="neutral"
                      size="md"
                      @click="toast.add({ title: 'Password updated successfully', color: 'success', icon: 'i-lucide-lock' })"
                  >
                    Update Password
                  </UButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<style scoped>
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
input:focus,
select:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
</style>