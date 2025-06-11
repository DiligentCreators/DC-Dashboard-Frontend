<script setup lang="ts">
import { ref } from 'vue';
import MainLayout from "~/layouts/Dashboard/MainLayout.vue";
import Input from "~/components/Common/Input.vue";
import Breadcrumb from "~/components/dashboard/Breadcrumb.vue";
const breadcrumbItems = [
  { label: 'Dashboard', to: '/dashboard' },
  // { label: 'Users List', to: 'list' },
  { label: 'Users Edit', to: '/users/edit' },


]
interface Client {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string | null;
  dateOfBirth: string | null;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  emailVerified: boolean;
  suspended: boolean;
}

const toast = useToast();

// Sample client data
const client = ref<Client>({
  id: 1,
  username: 'kjhk_jhj',
  email: 'email@email.com',
  firstName: 'Kjhk',
  lastName: 'Jhj',
  gender: null,
  dateOfBirth: null,
  country: '',
  state: '',
  city: '',
  zipCode: '',
  emailVerified: false,
  suspended: false,
});

const activeTab = ref('profile');

// Tab change handler
const setActiveTab = (tab: string) => {
  activeTab.value = tab;
};

// Action handlers
const loginAsClient = () => {
  toast.add({
    title: `Logged in as ${client.value.firstName} ${client.value.lastName}`,
    color: 'success',
    icon: 'i-lucide-user',
  });
};

const markEmailAsVerified = () => {
  client.value.emailVerified = true;
  toast.add({
    title: 'Email marked as verified',
    color: 'success',
    icon: 'i-lucide-check-circle',
  });
};

const suspendClient = () => {
  client.value.suspended = true;
  toast.add({
    title: `${client.value.firstName} ${client.value.lastName} has been suspended`,
    color: 'error',
    icon: 'i-lucide-user-x',
  });
};

// Form submission handler
const saveChanges = () => {
  toast.add({
    title: 'Client details updated successfully',
    color: 'success',
    icon: 'i-lucide-save',
  });
};
const options = ref([
{ value: null, label: 'N/A' },
{ value: 'male', label: 'Male' },
{ value: 'female', label: 'Female' },
{ value: 'other', label: 'Other' },
])
</script>

<template>
  <MainLayout>
    <Breadcrumb :items="breadcrumbItems" />

      <div >
        <!-- Header -->
        <div class="mb-6">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
            Users Profile
          </h1>
        </div>

        <!-- Profile Card -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <UAvatar
                  :src="`https://i.pravatar.cc/120?img=${client.id}`"
                  size="lg"
                  :alt="`${client.firstName} ${client.lastName} avatar`"
                  class="border-2 border-gray-200 dark:border-gray-600"
              />
              <div>
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                  {{ client.firstName }} {{ client.lastName }}
                </h2>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Username: {{ client.username }}
                </p>
              </div>
            </div>
            <div class="flex gap-3">
              <UButton
                  color="success"
                  variant="outline"
                  size="sm"
                  @click="loginAsClient"
                  :disabled="client.suspended"
              >
                Login As Client
              </UButton>
              <UButton
                  color="success"
                  variant="outline"
                  size="sm"
                  @click="markEmailAsVerified"
                  :disabled="client.emailVerified"
              >
                Mark Email As Verified
              </UButton>
              <UButton
                  color="error"
                  variant="outline"
                  size="sm"
                  @click="suspendClient"
                  :disabled="client.suspended"
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
                  :class="
                activeTab === 'profile'
                  ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              "
              >
                <UIcon name="i-lucide-user" class="w-4 h-4 inline mr-1" />
                Profile
              </button>
              <button
                  @click="setActiveTab('personal')"
                  class="px-6 py-3 text-sm font-medium"
                  :class="
                activeTab === 'personal'
                  ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              "
              >
                <UIcon name="i-lucide-info" class="w-4 h-4 inline mr-1" />
                Personal Details
              </button>
              <button
                  @click="setActiveTab('password')"
                  class="px-6 py-3 text-sm font-medium"
                  :class="
                activeTab === 'password'
                  ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              "
              >
                <UIcon name="i-lucide-lock" class="w-4 h-4 inline mr-1" />
                Change Password
              </button>
              <button
                  @click="setActiveTab('role')"
                  class="px-6 py-3 text-sm font-medium"
                  :class="
                activeTab === 'role'
                  ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              "
              >
                <UIcon name="i-lucide-lock" class="w-4 h-4 inline mr-1" />
               manage roles
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
                  {{ client.email }}
                </p>
              </div>
              <div class="flex gap-3">
                <UButton
                    color="success"
                    variant="outline"
                    size="md"
                    @click="loginAsClient"
                    :disabled="client.suspended"
                >
                  Login As Client
                </UButton>
                <UButton
                    color="success"
                    variant="outline"
                    size="md"
                    @click="markEmailAsVerified"
                    :disabled="client.emailVerified"
                >
                  Mark Email As Verified
                </UButton>
                <UButton
                    color="error"
                    variant="outline"
                    size="md"
                    @click="suspendClient"
                    :disabled="client.suspended"
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
                          v-model="client.firstName"
                          placeholder="First Name"
                          size="md"
                          class="w-full"
                      />
                    </div>
                    <div>

                      <Input
                          v-model="client.lastName"
                          placeholder="Last Name"
                          size="md"
                          class="w-full"
                      />
                    </div>
                    <div>


                      <select v-model="client.gender" class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                        <option value="">Filter Active/Inactive</option>
                        <option value=""  v-for="option in options">{{option.label}}</option>


                      </select>
                    </div>
                    <div>

                      <Input
                          v-model="client.dateOfBirth"
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
                          v-model="client.country"
                          placeholder="Country"
                          size="md"
                          class="w-full"
                      />
                    </div>
                    <div>

                      <Input
                          v-model="client.state"
                          placeholder="State"
                          size="md"
                          class="w-full"
                      />
                    </div>
                    <div>

                      <Input
                          v-model="client.city"
                          placeholder="City"
                          size="md"
                          class="w-full"
                      />
                    </div>
                    <div>

                      <Input
                          v-model="client.zipCode"
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
                  <label
                      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Current Password
                  </label>
                  <Input
                      type="password"
                      placeholder="Current Password"
                      size="md"
                      class="w-full"
                  />
                </div>
                <div>
                  <label
                      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    New Password
                  </label>
                  <Input
                      type="password"
                      placeholder="New Password"
                      size="md"
                      class="w-full"
                  />
                </div>
                <div>
                  <label
                      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Confirm New Password
                  </label>
                  <Input
                      type="password"
                      placeholder="Confirm New Password"
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
            <div v-if="activeTab === 'role'">
              <div class="space-y-4 max-w-md">
                <div>
                  <label
                      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    User's Role(s)
                  </label>
                  <div>


                    <select v-model="client.gender" class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                      <option value="">Filter Active/Inactive</option>
                      <option value=""  v-for="option in options">{{option.label}}</option>


                    </select>
                  </div>
                </div>
                <div class="mt-4">
                  <UButton

                      color="neutral"
                      size="md"
                      @click="toast.add({ title: 'Password updated successfully', color: 'success', icon: 'i-lucide-lock' })"
                  >
                    Update Role(s)
                  </UButton>
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