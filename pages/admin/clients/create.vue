<template>

  <MainLayout>

    <Breadcrumb :items="breadcrumbItems" />
    <div class="p-6 bg-white dark:bg-gray-800 shadow-md rounded-xl mt-5">
      <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Create New Client</h2>

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
        </div>

        <!-- Submit Button -->
        <UButton color="neutral" size="md" class="mt-6" type="submit">
          Create Client
        </UButton>
      </form>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from "~/layouts/Dashboard/MainLayout.vue";
import Input from "~/components/Common/Input.vue";
import Breadcrumb from "~/components/dashboard/Breadcrumb.vue";
import {useClientStore} from "~/stores/client.js";

const clientStore = useClientStore()
// All values must be valid, no empty strings
const loginStatusOptions = [
  { label: "User Can Login", value:true },
  { label: "Cannot Login", value: false},
];

const verifyEmailOptions = [
  { label: "Email Verification Required", value: "yes" },
  { label: "Email Verification Not Required", value: "no" },
];

const form = reactive({
  name: "",
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  password_confirmation: '',
  is_active: true,
  verify_email: "yes",
});

const createClient = async () => {
  const submitData = {
    ...form,
    password_confirmation: form.password,
    name: form.first_name, '==': form.last_name,

  }
  await clientStore.createClient(submitData)
};
const breadcrumbItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Client List', to: '/admin/client' },
  { label: 'Client Create', to: '/clients/create' },

]
</script>
