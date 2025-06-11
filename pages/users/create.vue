<template>

  <MainLayout>

    <Breadcrumb :items="breadcrumbItems" />
    <div class="p-6 bg-white dark:bg-gray-800 shadow-md rounded-xl mt-5">
      <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Create New User</h2>

      <form @submit.prevent="createClient">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- First Name -->
          <div>
            <Input v-model="form.first_name" type="text" required label="First Name" />
          </div>

          <!-- Last Name -->
          <div>
            <Input v-model="form.last_name" type="text" required label="Last Name" />
          </div>

          <!-- Email -->
          <div>
            <Input v-model="form.email" type="email" required label="Email" />
          </div>

          <!-- Password -->
          <div>
            <Input v-model="form.password" type="password" required label="Password" />
          </div>

          <!-- Login Status -->
          <div>
            <label class="mb-1 text-[.82rem] font-medium text-gray-800 dark:text-gray-200">Login Status</label>
            <USelect
                v-model="form.login_status"
                :items="loginStatusOptions"
                placeholder="Select Login Status"
                option-attribute="label"
                value-attribute="value"
                class="w-full bg-white dark:bg-gray-700 py-3"
            />
          </div>

          <!-- Verify Email -->
          <div>
            <label class="mb-1 text-[.82rem] font-medium text-gray-800 dark:text-gray-200">Verify Email</label>
            <USelect
                v-model="form.verify_email"
                :items="verifyEmailOptions"
                placeholder="Select Email Verification"
                option-attribute="label"
                value-attribute="value"
                class="w-full bg-white dark:bg-gray-700 py-3"
            />
          </div>
          <div>
            <label class="mb-1 text-[.82rem] font-medium text-gray-800 dark:text-gray-200">Verify Email</label>
            <USelect
                v-model="form.role"
                :items="Roles"
                placeholder="Select Email Verification"
                option-attribute="label"
                value-attribute="value"
                class="w-full bg-white dark:bg-gray-700 py-3"
            />
          </div>
        </div>

        <!-- Submit Button -->
        <UButton color="neutral" size="md" class="mt-6" type="submit">
          Create User
        </UButton>
      </form>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from "~/layouts/Dashboard/MainLayout.vue";
import Input from "~/components/Common/Input.vue";
import Breadcrumb from "~/components/dashboard/Breadcrumb.vue";

const toast = useToast();

// All values must be valid, no empty strings
const loginStatusOptions = [
  { label: "User Can Login", value: "active" },
  { label: "Cannot Login", value: "inactive" },
];

const verifyEmailOptions = [
  { label: "Email Verification Required", value: true },
  { label: "Email Verification Not Required", value: false },
];
const Roles = [
  { label: "Admin", value: 'admin' },
  { label: "Client", value: 'client' },
  { label: "Developer", value: 'developer' },

];

const form = reactive({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  login_status: null,
  verify_email: null,
  role: ''
});

const createClient = async () => {
  console.log(form)
  toast.add({
    title: `created successfully!`,
    color: 'success',
    icon: 'i-lucide-check-circle'
  });
};
const breadcrumbItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Client List', to: '/admin/client' },
  { label: 'Client Create', to: '/clients/create' },

]
</script>
