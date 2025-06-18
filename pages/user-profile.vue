<script setup>
import { ref, reactive, computed } from 'vue'
import { useCommonStore } from '~/stores/common'
import { useToast } from '#imports'
import { useRouter } from 'vue-router'
import MainLayout from "~/layouts/Dashboard/MainLayout.vue";
import Input from "~/components/Common/Input.vue";
import ValidationError from "~/components/Common/ValidationError.vue";
const  authStore = useAuthStore()
const toast = useToast()

const loading = ref(false)
const loadingPassword = ref(false)

// Profile form
const profileForm = reactive({
  name: authStore.user.data.name || '',
  email: authStore.user.data.email || '',
  avatar: null,
  gender: authStore.user.data.profile.gender || '',
  dob: authStore.user.data.profile.dob || '',
  phone: authStore.user.data.profile.phone || '',
  country: authStore.user.data.profile.country || '',
  state: authStore.user.data.profile.state || '',
  city: authStore.user.data.profile.city || '',
  zipcode: authStore.user.data.profile.zipcode || '',
  address: authStore.user.data.profile.address || ''
})

function handleAvatarUpload(event) {
  const file = event.target.files[0];
  if (file) {
    profileForm.avatar = file;
  }
}
// Password form
const passwordForm = reactive({
  current_password: '',
  password: '',
  password_confirmation: ''
})

const updateProfile = async () => {
  loading.value = true
  try {
    await authStore.updateProfileUser(profileForm)
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}



const updatePassword = async () => {
  loadingPassword.value = true
  try {
    const isSuccess = await authStore.updatePasswordUser(passwordForm)
    if (isSuccess) {
      passwordForm.current_password = ''
      passwordForm.password = ''
      passwordForm.password_confirmation = ''
    }
  } catch (err) {
    console.error(err)
  } finally {
    loadingPassword.value = false
  }
}
const options = ref([
  { value: null, label: 'N/A' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' }
])
definePageMeta({
  middleware: ["auth","user"],
});

useHead({
  title: 'Dashboard - Profile',
})
</script>
<template>
  <MainLayout>
    <h1>user profile</h1>
    <div class="p-6 bg-white dark:bg-gray-800 shadow rounded-xl mt-6 border border-gray-200 dark:border-gray-700">
      <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Update Profile</h2>

      <form @submit.prevent="updateProfile" class="space-y-4">
        <!-- Name & Email -->
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <Input
                v-model="profileForm.name"
                placeholder="Last Name"
                size="md"
                class="w-full"
                label="Name"
            />
            <ValidationError field="name" />
          </div>
          <div>
            <Input
                v-model="profileForm.email" label="Email" type="email"
                placeholder="Last Name"
                size="md"
                class="w-full"
            />
            <ValidationError field="email" />
          </div>


        </div>

        <!-- Phone & Gender -->
        <div class="grid md:grid-cols-2 gap-4">
          <Input
              v-model="profileForm.phone" label="phone"
              placeholder="phone"
              size="md"
              class="w-full"
          />

          <div>
            <label>Gender</label>
            <select
                v-model="profileForm.gender"
                class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option v-for="option in options" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>

          </div>

        </div>

        <!-- DOB & Avatar -->
        <div class="grid md:grid-cols-2 gap-4">
          <Input
              v-model="profileForm.dob" label="Date of Birth" type="date"
              placeholder="DOB"
              size="md"
              class="w-full"
          />
          <div>
            <div>
              <label for="avatar" class="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                Avatar
              </label>
              <div class="flex items-center gap-4">
                <!-- Preview Image -->

                <input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    @change="handleAvatarUpload"
                    class="block w-full text-sm text-gray-700 dark:text-gray-300
             file:mr-4 file:py-2 file:px-4
             file:rounded-full file:border-0
             file:text-sm file:font-semibold
             file:bg-blue-50 file:text-blue-700
             hover:file:bg-blue-100
             dark:file:bg-gray-600 dark:file:text-white dark:hover:file:bg-gray-500"
                />
              </div>
            </div>

          </div>
        </div>

        <!-- Address Info -->
        <div class="grid md:grid-cols-2 gap-4">
          <Input
              v-model="profileForm.country" label="Country"
              placeholder="Country"
              size="md"
              class="w-full"
          />
          <Input
              v-model="profileForm.state" label="State"
              placeholder="State"
              size="md"
              class="w-full"
          /> <Input
            v-model="profileForm.city" label="City"
            placeholder="City"
            size="md"
            class="w-full"
        /> <Input
            v-model="profileForm.zipcode" label="Zip Code"
            placeholder="Zip Code"
            size="md"
            class="w-full"
        />
          <Input
              v-model="profileForm.address" label="Address"
              placeholder="Address"
              size="md"
              class="w-full"
          />


        </div>

        <UButton color="neutral" type="submit" :loading="loading">Update Profile</UButton>
      </form>
    </div>

    <!-- Password Section -->
    <div class="p-6 bg-white dark:bg-gray-800 shadow rounded-xl mt-6 border border-gray-200 dark:border-gray-700">
      <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Change Password</h2>

      <form @submit.prevent="updatePassword" class="space-y-4">
        <div>
          <Input
              v-model="passwordForm.current_password" type="password" label="Current Password"
              placeholder="Last Name"
              size="md"
              class="w-full"
          />
          <ValidationError field="current_password" />
        </div>

        <div>
          <Input
              v-model="passwordForm.password" type="password" label="New Password"
              placeholder="Last Name"
              size="md"
              class="w-full"
          />
          <ValidationError field="password" />

        </div>

        <div>
          <Input
              v-model="passwordForm.password_confirmation" type="password" label="Confirm Password"
              placeholder="Last Name"
              size="md"
              class="w-full"
          />
        </div>


        <UButton color="neutral"
                 type="submit" :loading="loadingPassword">Update Password</UButton>
      </form>
    </div>
  </MainLayout>
</template>
