<script setup>
import {ref, onMounted, computed} from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from '#imports'
import Input from '~/components/Common/Input.vue'
import Breadcrumb from '~/components/dashboard/Breadcrumb.vue'
import MainLayout from '~/layouts/Dashboard/MainLayout.vue'
import ValidationError from "~/components/Common/ValidationError.vue";
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
definePageMeta({
  middleware: ["auth"],
});
const loading = ref(false)
const breadcrumbItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'User List', to: '/users/list' },
  { label: 'User Edit', to: '/users/edit' }
]

const route = useRoute()
const userStore = useUserStore()
const id = route.params.id

const form = ref({
  name: '',
  username: '',
  email: '',
  firstName: '',
  selectedRoles: [],
  lastName: '',
  gender: null,
  dateOfBirth: null,
  country: '',
  state: '',
  city: '',
  zipCode: '',
  emailVerified: false,
  suspended: false,

})
onMounted(async () => {
  try {
    await userStore.getUser(id)
    const clientData = userStore.selectedUser

    const user = clientData.data
    const profile = user.profile || {}

    // Initialize form with user data including roles
    form.value = {
      id: user.id,
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
      suspended: user.is_suspended || false,
      selectedRoles: roleStore.Roles.filter(role =>
          user.roles?.some(userRole => userRole.name === role.name)
      )
    }

    // Also fetch all available roles
    await roleStore.fetchRoles();
  } catch (error) {
    console.error('User fetch error:', error)
  }
})



const activeTab = ref('profile')

const setActiveTab = (tab) => {
  activeTab.value = tab
}

const loginAsUser = () => {
}

const loadingToggle = ref(false)
const clientStore = useClientStore()
const markEmailAsVerified = async () => {
  loadingToggle.value = true
  try {
    await clientStore.toggleEmail(id)
    form.emailVerified = !form.emailVerified
  } catch (error) {
    console.error(error)
  } finally {
    loadingToggle.value = false
  }
}

const saveChanges = async () => {
  try {
    console.log("Selected Roles:", form.value.selectedRoles);

    const roleNames = Array.isArray(form.value.selectedRoles)
        ? form.value.selectedRoles.map(role => role.name)
        : [];

    console.log("Role Names to send:", roleNames);

    const submitData = {
      username: form.value.username,
      email: form.value.email,
      name: `${form.value.firstName} ${form.value.lastName}`,
      email_verified_at: form.value.emailVerified ? new Date().toISOString() : null,
      is_suspended: form.value.suspended,
      roles: roleNames, // ✅ use safe roleNames
      profile: {
        gender: form.value.gender,
        dob: form.value.dateOfBirth,
        country: form.value.country,
        state: form.value.state,
        city: form.value.city,
        zipcode: form.value.zipCode,
      }
    };

    await userStore.updateUser(id, submitData);
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
const passwordForm = reactive({
  password: ''
})
async function handleUpdatePassword() {
  try {
    await userStore.updateUserPassword(id, {
      password: passwordForm.password,
    });
    passwordForm.password = '';
  } catch (err) {
    console.error(err);
  }
}


const suspendUser = async (user) => {
  try {
    await userStore.toggleSuspendedStatus(user.id);
    await userStore.fetchUsers();
    form.value.suspended = true

  } catch (error) {
    console.error('Error toggling suspension:', error);
    form.value.suspended = false

  }
};
const roleStore = useRoleStore()

onMounted(async () => {
 await roleStore.fetchRoles();
})


const  authStore = useAuthStore();

const permissions = computed(() => authStore.user?.data?.permissions ?? []);
import NoPermission from  '@/components/Common/NoPermission.vue'
</script>

<template>
  <MainLayout>
    <Breadcrumb :items="breadcrumbItems" />

    <div v-if="permissions.includes('users.update')">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="text-4xl mb-4">⏳</div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Loading client data...</h3>
      </div>


      <!-- User Data -->
      <div v-else>
        <!-- Header -->
        <div class="mb-6">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
            User Profile
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
                  @click="loginAsUser"
                  :disabled="form.suspended"
              >
                Login As User
              </UButton>
              <UButton
                  color="success"
                  variant="outline"
                  size="sm"
                  @click="markEmailAsVerified"
                  :loading="loadingToggle"
              >
                {{ form.emailVerified ? 'Mark Email As UnVerified' : 'Mark Email As Verified' }}
              </UButton>
              <UButton
                  color="error"
                  variant="outline"
                  size="sm"
                  @click="suspendUser(form)"
                  :disabled="form.suspended"
              >
                Suspend User
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
                      <ValidationError field="name" />
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

                    <div>
                      <label class="typo__label">Roles</label>
                      <multiselect
                          id="option-groups"
                          v-model="form.selectedRoles"
                          :options="roleStore.Roles"
                          :track-by="'name'"
                          :label="'name'"
                          :multiple="true"
                           placeholder="Select roles"
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
                      v-model="passwordForm.password"
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
                      @click="handleUpdatePassword"
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

    <div v-else >
      <NoPermission />
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