<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useRoleStore } from '~/stores/role';
import { useToast } from '#imports';
import { useCommonStore } from '~/stores/common';
import MainLayout from "~/layouts/Dashboard/MainLayout.vue";
import { useAuthStore } from '~/stores/auth';
import NoPermission from '@/components/Common/NoPermission.vue';

const route = useRoute();
const id = route.params.id;
const roleStore = useRoleStore();
const commonStore = useCommonStore();
const toast = useToast();
const authStore = useAuthStore();
import LoadingSpinner from '@/components/Common/LoadingSpinner.vue';
import Breadcrumb from "~/components/dashboard/Breadcrumb.vue";

const loadingRole = ref(false);
const loadingPermissions = ref(false);

// Permission types and resources
const permissionTypes = ['list', 'create', 'read', 'update', 'delete', 'restore', 'force.delete'];
const resources = ref([]);

// Form state
const form = reactive({
  name: '',
  permissions: {}, // matrix: { USERS: { read: true, update: false, ... } }
});

// Validation errors from store
const validationErrors = computed(() => commonStore.validationError);

// Permissions from auth store
const permissions = computed(() => authStore.user?.data?.permissions ?? []);

// Parse permission string (e.g., "users.read" => { resource: "USERS", type: "read" })
const parsePermissionName = (permissionName) => {
  const [resource, ...typeParts] = permissionName.split('.');
  return {
    resource: resource.toUpperCase(),
    type: typeParts.join('.'),
  };
};

// Convert backend permission array to matrix
const convertBackendPermissions = (rolePermissions = []) => {
  const matrix = {};
  const allPermissions = roleStore.allPermissions || [];

  const uniqueResources = [...new Set(
      allPermissions.map(p => parsePermissionName(p.name).resource)
  )];
  resources.value = uniqueResources;

  uniqueResources.forEach(resource => {
    matrix[resource] = {};
    permissionTypes.forEach(type => {
      matrix[resource][type] = false;
    });
  });

  rolePermissions.forEach(permission => {
    const { resource, type } = parsePermissionName(permission.name);
    if (matrix[resource] && type in matrix[resource]) {
      matrix[resource][type] = true;
    }
  });

  return matrix;
};

// Convert matrix back to backend array
const convertMatrixToBackendPermissions = (matrix) => {
  const result = [];
  Object.entries(matrix).forEach(([resource, types]) => {
    Object.entries(types).forEach(([type, allowed]) => {
      if (allowed) {
        result.push(`${resource.toLowerCase()}.${type}`);
      }
    });
  });
  return result;
};

// Computed to check if all permissions in a row are selected
const isRowChecked = computed(() => {
  const rowStatus = {};
  resources.value.forEach(resource => {
    rowStatus[resource] = permissionTypes.every(type => form.permissions[resource]?.[type] === true);
  });
  return rowStatus;
});

// Toggle all permissions for a resource
const toggleRow = (resource) => {
  const isChecked = isRowChecked.value[resource];
  permissionTypes.forEach(type => {
    form.permissions[resource][type] = !isChecked;
  });
};

// Toggle individual permission
const handlePermissionChange = (resource, type) => {
  if (!form.permissions[resource]) {
    form.permissions[resource] = {};
  }
  form.permissions[resource][type] = !form.permissions[resource][type];
};

// Fetch role and permissions
onMounted(async () => {
  loadingRole.value = true;
  try {
    await roleStore.fetchAllPermissions();
    await roleStore.getRole(id);

    const role = roleStore.selectedRole?.data;
    if (role) {
      form.name = role.name || '';
      form.permissions = convertBackendPermissions(role.permissions || []);
    }
  } catch (error) {
    console.error('Error loading role:', error);
    toast.add({ title: 'Failed to load role data', color: 'red' });
  } finally {
    loadingRole.value = false;
  }
});

// Update role name
const updateRole = async () => {
  loadingRole.value = true;
  try {
    const isSuccess = await roleStore.updateRole(id, {
      name: form.name,
    });
    if (isSuccess) {
      toast.add({ title: 'Role name updated', color: 'green' });
    }
  } catch (error) {
    toast.add({ title: error?.response?.data?.message || 'Failed to update role name', color: 'red' });
  } finally {
    loadingRole.value = false;
  }
};

// Update permissions
const updatePermissions = async () => {
  loadingPermissions.value = true;
  try {
    const selectedPermissionNames = [];
    Object.keys(form.permissions).forEach(resource => {
      Object.keys(form.permissions[resource]).forEach(type => {
        if (form.permissions[resource][type]) {
          selectedPermissionNames.push(`${resource.toLowerCase()}.${type}`);
        }
      });
    });

    const allPermissions = roleStore.allPermissions || [];
    const permissionIds = allPermissions
        .filter(p => selectedPermissionNames.includes(p.name))
        .map(p => p.id);

    if (!form.name) {
      throw new Error("Role name is required.");
    }

    const isSuccess = await roleStore.updateRole(id, {
      name: form.name,
      permissions: permissionIds,
    });

    if (isSuccess) {
      toast.add({ title: 'Permissions updated successfully', color: 'green' });
    }
  } catch (error) {
    console.error(error);
    toast.add({
      title: error.response?.data?.message || 'Failed to update permissions',
      color: 'red',
    });
  } finally {
    loadingPermissions.value = false;
  }
};

definePageMeta({
  middleware: ["auth","admin"],
});
useHead({
  title: 'Dashboard - Edit Role',
})
const breadcrumbItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Role List', to: '/roles/list' },
  { label: 'Role Edit', to: '/edit' }
]
</script>

<template>
  <MainLayout>

    <Breadcrumb :items="breadcrumbItems" />

    <div v-if="permissions.includes('roles.update')">
      <!-- Role Name Card -->
      <div class="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl mt-6 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Update Role Name</h2>
        <form @submit.prevent="updateRole">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Role Name</label>
              <UInput
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="Enter role name"
                  class="w-full"
                  :disabled="loadingRole"
              />
              <p v-if="validationErrors?.name" class="text-sm text-red-500 mt-1">
                {{ validationErrors.name[0] }}
              </p>
            </div>
          </div>
          <UButton
              type="submit"
              color="neutral"
              size="md"
              :disabled="loadingRole"
              :loading="loadingRole"
          >
            Update Role Name
          </UButton>
        </form>
      </div>

      <!-- Permissions Card -->

<LoadingSpinner v-if="loadingRole"/>
        <div v-else class="p-6 bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 shadow-xl rounded-2xl mt-8 border border-gray-200 dark:border-gray-700 transition-all duration-300">
          <h2 class="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100 tracking-tight">Update Permissions</h2>
          <form @submit.prevent="updatePermissions">
            <div class="overflow-auto mb-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
              <div class="grid min-w-[800px] grid-cols-[50px_200px_repeat(7,minmax(90px,1fr))] gap-px bg-gray-200 dark:bg-gray-700">
                <!-- Header -->
                <div class="bg-gray-50 dark:bg-gray-600/80 p-4 font-semibold text-xs uppercase text-gray-600 dark:text-gray-200 border border-gray-200 dark:border-gray-600 sticky left-0 z-10">
                  <span class="sr-only">Select All</span>
                </div>
                <div class="bg-gray-50 dark:bg-gray-600/80 p-4 font-semibold text-xs uppercase text-gray-600 dark:text-gray-200 border border-gray-200 dark:border-gray-600 sticky left-[50px] z-10">
                  Resource
                </div>
                <div
                    v-for="type in permissionTypes"
                    :key="type"
                    class="bg-gray-50 dark:bg-gray-600/80 p-4 text-center font-semibold text-xs uppercase text-gray-600 dark:text-gray-200 border border-gray-200 dark:border-gray-600"
                >
                  {{ type }}
                </div>

                <!-- Permission Matrix Rows -->
                <template v-for="resource in resources" :key="resource">
                  <div class="bg-gray-100 dark:bg-gray-700/80 p-4 flex justify-center items-center border border-gray-200 dark:border-gray-600 transition-colors hover:bg-gray-200 dark:hover:bg-gray-600">
                    <input
                        type="checkbox"
                        :id="`row-${resource}`"
                        :checked="isRowChecked[resource]"
                        @change="toggleRow(resource)"
                        class="w-5 h-5 text-indigo-600 rounded accent-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 cursor-pointer transition-transform duration-150 hover:scale-110 disabled:opacity-50"
                        :disabled="loadingPermissions"
                        :aria-label="`Toggle all permissions for ${resource}`"
                    />
                  </div>
                  <div class="bg-gray-100 dark:bg-gray-700/80 p-4 font-medium text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 sticky left-[50px] z-10 transition-colors hover:bg-gray-200 dark:hover:bg-gray-600">
                    {{ resource }}
                  </div>
                  <div
                      v-for="type in permissionTypes"
                      :key="`${resource}-${type}`"
                      class="bg-white dark:bg-gray-800 p-4 flex justify-center items-center border border-gray-200 dark:border-gray-600 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <input
                        type="checkbox"
                        :id="`${resource}-${type}`"
                        :checked="form.permissions[resource]?.[type] || false"
                        @change="handlePermissionChange(resource, type)"
                        class="w-5 h-5 text-indigo-600 rounded accent-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 cursor-pointer transition-transform duration-150 hover:scale-110 disabled:opacity-50"
                        :disabled="loadingPermissions"
                        :aria-label="`Toggle ${type} permission for ${resource}`"
                    />
                  </div>
                </template>
              </div>
            </div>

            <p v-if="validationErrors?.permissions" class="text-sm text-red-500 dark:text-red-400 mt-2 mb-4 font-medium">
              {{ validationErrors.permissions[0] }}
            </p>

            <div class="flex justify-end">
              <UButton
                  type="submit"
                  color="indigo"
                  size="md"
                  :disabled="loadingPermissions"
                  :loading="loadingPermissions"
                  class="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                Update Permissions
              </UButton>
            </div>
          </form>
        </div>

    </div>

    <div v-else>
      <NoPermission />
    </div>
  </MainLayout>
</template>