<template>

  <MainLayout>

    <Breadcrumb :items="breadcrumbItems" />
    <div class="p-6 bg-white dark:bg-gray-800 shadow-md rounded-xl mt-5">
      <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Update Role</h2>

      <form @submit.prevent="createClient">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- First Name -->
          <div>
            <Input v-model="form.first_name" type="text" required label="Role Name" />
          </div>

        </div>

        <!-- Submit Button -->
        <UButton color="neutral" size="md" class="mt-6" type="submit">
          Update Role
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
  { label: 'Roles List', to: 'list' },
  { label: 'Roles Create', to: '/roles/create' },

]
</script>
