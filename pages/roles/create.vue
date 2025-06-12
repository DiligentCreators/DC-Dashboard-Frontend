<template>

  <MainLayout>

    <Breadcrumb :items="breadcrumbItems" />
    <div class="p-6 bg-white dark:bg-gray-800 shadow-md rounded-xl mt-5">
      <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Create New Role</h2>

      <form @submit.prevent="createClient">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- First Name -->
          <div>
            <Input v-model="form.name" type="text" required label="Role Name" />
          </div>


        </div>

        <PrimaryButton type="submit" :disabled="loading" :loading="loading" class="mt-5">
          create role
        </PrimaryButton>
      </form>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from "~/layouts/Dashboard/MainLayout.vue";
import Input from "~/components/Common/Input.vue";
import Breadcrumb from "~/components/dashboard/Breadcrumb.vue";
import {useRoleStore} from "~/stores/role.js";
import PrimaryButton from "~/components/Common/PrimaryButton.vue";


const roleStore = useRoleStore()
const loading = ref(false);


const form = reactive({
  name: ''
});

const createClient = async () => {
  loading.value = true
  try {
    const isSuccess = await roleStore.createRole(form);
    if (isSuccess) {
      form.name = '';
    }
  } catch (error) {
  } finally {
    loading.value = false;
  }
};

const breadcrumbItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Roles List', to: 'list' },
  { label: 'Roles Create', to: '/roles/create' },

]
</script>
