<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MainLayout from '~/layouts/Dashboard/MainLayout.vue'
import { useRoleStore } from '~/stores/role'
import { useToast } from '#imports'
import { useCommonStore } from '~/stores/common'

const route = useRoute()
const router = useRouter()
const id = route.params.id
const roleStore = useRoleStore()
const commonStore = useCommonStore()
const loadingRole = ref(false)
const loadingPermissions = ref(false)
import PrimaryButton from "~/components/Common/PrimaryButton.vue";

// Form data
const form = reactive({
  name: '',
  permissions: {}
})

// Permission options
const permissions = ref(['ALL', 'LIST', 'CREATE', 'READ', 'UPDATE', 'DELETE', 'RESTORE', 'FORCE DELETE'])
const resources = ref(['CLIENTS', 'USERS', 'ROLES', 'GLOBAL EMAIL TEMPLATES', 'EMAIL TEMPLATES', 'SETTINGS'])

// Computed validation errors
const validationErrors = computed(() => commonStore.validationError)

// Load role data
onMounted(async () => {
  try {
    await roleStore.getRole(id)
    if (roleStore.selectedRole?.data) {
      form.name = roleStore.selectedRole.data.name
      form.permissions = roleStore.selectedRole.data.permissions
          ? JSON.parse(JSON.stringify(roleStore.selectedRole.data.permissions))
          : resources.value.reduce((acc, resource) => ({
            ...acc,
            [resource]: permissions.value.reduce((permAcc, perm) => ({
              ...permAcc,
              [perm]: false
            }), {})
          }), {})
    }
  } catch (error) {
    console.error('Error loading role:', error)
  }
})

const updateRole = async () => {
  loading.value = true;
  try {
    const isSuccess = await roleStore.updateRole(id, form);
    if (isSuccess) {
    }
  } catch (error) {
    // Handle error
  } finally {
    loading.value = false;
  }
};

const updatePermissions = async () => {
  loading.value = true;
  try {
    const isSuccess = await roleStore.updateRole(id, form);
    if (isSuccess) {
    }
  } catch (error) {
    // Handle error
  } finally {
    loading.value = false;
  }
};
const handlePermissionChange = (resource, permission) => {
  if (permission === 'ALL') {
    const isChecked = !form.permissions[resource][permission]
    permissions.value.forEach(perm => {
      form.permissions[resource][perm] = isChecked
    })
  } else {
    form.permissions[resource][permission] = !form.permissions[resource][permission]
    form.permissions[resource]['ALL'] = permissions.value
        .filter(perm => perm !== 'ALL')
        .every(perm => form.permissions[resource][perm])
  }
}
</script>

<template>
  <MainLayout>
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
                class="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                :disabled="loadingRole"
            />
            <p v-if="validationErrors?.name" class="text-sm text-red-500 mt-1">{{ validationErrors.name[0] }}</p>
          </div>
        </div>

        <div class="">
          <UButton
              type="submit"
              color="neutral"
              size="md"
              :disabled="loadingRole"
              :loading="loadingRole"
          >
            Update Role Name
          </UButton>
        </div>
      </form>
    </div>

    <!-- Permissions Card -->
    <div class="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl mt-6 border border-gray-200 dark:border-gray-700">
      <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Update Permissions</h2>

      <form @submit.prevent="updatePermissions">
        <!-- Permissions Table -->
        <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
          <div class="grid grid-cols-[200px_repeat(8,1fr)] sm:grid-cols-[120px_repeat(8,1fr)] gap-px bg-gray-200 dark:bg-gray-700">
            <!-- Header Row -->
            <div class="bg-gray-100 dark:bg-gray-600 p-4 text-left font-bold text-sm uppercase text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
              Permissions
            </div>
            <div
                v-for="permission in permissions"
                :key="permission"
                class="bg-gray-100 dark:bg-gray-600 p-4 text-center font-bold text-sm uppercase text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
            >
              {{ permission }}
            </div>

            <!-- Data Rows -->
            <template v-for="resource in resources" :key="resource">
              <div class="bg-gray-100 dark:bg-gray-600 p-4 text-left font-medium text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 flex items-center">
                {{ resource }}
              </div>
              <div
                  v-for="permission in permissions"
                  :key="`${resource}-${permission}`"
                  class="bg-white dark:bg-gray-800 p-4 flex justify-center items-center border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <input
                    type="checkbox"
                    :id="`${resource}-${permission}`"
                    :checked="form.permissions[resource]?.[permission] || false"
                    @change="handlePermissionChange(resource, permission)"
                    class="w-5 h-5 text-blue-600 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded accent-blue-600 hover:accent-blue-500 cursor-pointer focus:ring-2 focus:ring-blue-500"
                    :disabled="loadingPermissions"
                />
              </div>
            </template>
          </div>
        </div>

        <p v-if="validationErrors?.permissions" class="text-sm text-red-500 mt-2 mb-6">{{ validationErrors.permissions[0] }}</p>

        <div class="flex justify-end">
          <UButton
              type="submit"
              color="neutral"
              size="md"
              :disabled="loadingPermissions"
              :loading="loadingPermissions"
          >
            Add/Remove Permissions
          </UButton>
        </div>
      </form>
    </div>
  </MainLayout>
</template>
