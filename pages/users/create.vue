<template>
  <MainLayout>
    <Breadcrumb :items="breadcrumbItems" />

    <!-- If user has permission -->
    <div v-if="permissions.includes('users.create')" class="p-6 bg-white dark:bg-gray-800 shadow-md rounded-xl mt-5">
      <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Create New User</h2>

      <form @submit.prevent="createUser">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- First Name -->
          <div>
            <Input v-model="form.first_name" type="text" label="First Name" />
            <ValidationError field="name" />
          </div>

          <!-- Last Name -->
          <div>
            <Input v-model="form.last_name" type="text" label="Last Name" />
          </div>

          <!-- Email -->
          <div>
            <Input v-model="form.email" type="email" label="Email" />
            <ValidationError field="email" />
          </div>

          <!-- Password -->
          <div>
            <Input v-model="form.password" type="password" label="Password" />
            <ValidationError field="password" />
          </div>

          <!-- Login Status -->
          <div>
            <label class="mb-1 text-sm font-medium text-gray-800 dark:text-gray-200">Login Status</label>
            <USelect
                v-model="form.is_active"
                :items="loginStatusOptions"
                placeholder="Select Login Status"
                option-attribute="label"
                value-attribute="value"
                class="w-full bg-white dark:bg-gray-700 py-3"
            />
          </div>

          <!-- Verify Email -->
          <div>
            <label class="mb-1 text-sm font-medium text-gray-800 dark:text-gray-200">Verify Email</label>
            <USelect
                v-model="form.email_verified_at"
                :items="verifyEmailOptions"
                placeholder="Select Email Verification"
                option-attribute="label"
                value-attribute="value"
                class="w-full bg-white dark:bg-gray-700 py-3"
            />
          </div>
        </div>

        <!-- Submit Button -->
        <div class="mt-5">
          <PrimaryButton
              type="submit"
              :disabled="loading"
              :loading="loading"
          >
            Create user
          </PrimaryButton>
        </div>
      </form>
    </div>

    <!-- If user does NOT have permission -->
    <div  v-else>
      <NoPermission />

    </div>
  </MainLayout>
</template>


<script setup>
useHead({
  title: 'Dashboard - Create User',
})
import MainLayout from "~/layouts/Dashboard/MainLayout.vue";
import Input from "~/components/Common/Input.vue";
import Breadcrumb from "~/components/dashboard/Breadcrumb.vue";
import PrimaryButton from "~/components/Common/PrimaryButton.vue";
import ValidationError from "~/components/Common/ValidationError.vue";
import NoPermission from  '@/components/Common/NoPermission.vue'

import {computed} from "vue";
 const  authStore = useAuthStore();

const permissions = computed(() => authStore.user?.data?.permissions ?? []);

const userStore = useUserStore()
// All values must be valid, no empty strings
const loginStatusOptions = [
  { label: "User Can Login", value:true },
  { label: "Cannot Login", value: false},
];

const verifyEmailOptions = [
  { label: "Email Verification Required", value: "no" },
  { label: "Email Verification Not Required", value: "yes" },
];

const form = reactive({
  name: "",
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  password_confirmation: '',
  is_active: true,
  email_verified_at: "yes",
});

const loading = ref(false);
const createUser = async () => {
  loading.value = true;
  try {
    const submitData = {
      ...form,
      password_confirmation: form.password,
      name: `${form.first_name} ${form.last_name}`,
    };

    const isSuccess = await userStore.createUser(submitData);


      if (isSuccess) {
        form.name = '';
        form.first_name = '';
        form.email = '';
        form.last_name = '';
        form.password = '';
      }
  } catch (error) {
    console.error('Create user error:', error);
  } finally {
    loading.value = false;
  }
};

const breadcrumbItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Users List', to: '/users/list' },
  { label: 'Users Create', to: '/create' },

]
definePageMeta({
  middleware: ["auth"],
});
</script>
