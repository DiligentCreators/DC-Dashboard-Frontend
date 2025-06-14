<template>
  <div class="p-6 space-y-8">

    <!-- Page Header -->
    <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-extrabold text-gray-900 dark:text-white">📧 Email Templates</h1>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1 max-w-lg">
          Manage and customize system-generated emails such as Welcome, Verification, and Password Reset emails.
        </p>
      </div>
      <div class="flex items-center gap-3 w-full md:w-auto">
        <input
            type="text"
            v-model="search"
            placeholder="🔍 Search templates..."
            class="w-full md:w-64 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <NuxtLink
            to="/email/create"
            class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow"
        >
          <NuxtIcon name="heroicons-plus" filled />
          Add New
        </NuxtLink>
      </div>
    </div>

    <!-- Templates Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
          v-for="template in filteredTemplates"
          :key="template.key"
          class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition rounded-xl flex flex-col justify-between"
      >
        <!-- Card Body -->
        <div class="p-5 space-y-2">
          <div class="flex justify-between items-start mb-2">
            <div>
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white">{{ template.name }}</h2>
              <p class="text-xs text-gray-500 dark:text-gray-400">{{ template.key }}</p>
            </div>
          </div>

          <div class="text-sm text-gray-700 dark:text-gray-300 space-y-1">
            <p><strong>Subject:</strong> {{ template.subject }}</p>
            <p><strong>Body:</strong> {{ template.body }}</p>
            <p>
              <strong>Header:</strong>
              <span :class="template.customHeader ? 'text-green-500' : 'text-red-500'">
                {{ template.customHeader ? 'Enabled' : 'Default' }}
              </span>
            </p>
            <p>
              <strong>Footer:</strong>
              <span :class="template.customFooter ? 'text-green-500' : 'text-red-500'">
                {{ template.customFooter ? 'Enabled' : 'Default' }}
              </span>
            </p>
            <p><strong>Placeholders:</strong> {{ template.placeholders }}</p>
          </div>
        </div>

        <!-- Card Footer Actions -->
        <div class="flex justify-between items-center border-t border-gray-100 dark:border-gray-700 px-5 py-3 bg-gray-50 dark:bg-gray-800 rounded-b-xl">

          <!-- Edit Button -->
          <NuxtLink
              :to="`/email/edit/${template.id}`"
              class="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            <Icon name="i-lucide-pencil-line" class="w-4 h-4" />
            Edit
          </NuxtLink>

          <!-- Delete Button -->
          <UButton
              icon="i-lucide-trash-2"
              variant="ghost"
              size="sm"
              color="red"
              @click="deleteTemplate(template.id)"
              label="Delete"
          />
        </div>

      </div>
    </div>

  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'

const emailStore = useEmailTemplateStore()
const toast = useToast()
const search = ref('')

onMounted(() => {
  emailStore.getTemplates()
})

// Transform backend data
const templates = computed(() => {
  return emailStore.templates.map(template => ({
    id: template.id,
    name: template.name,
    subject: template.subject,
    body: template.body,
    customHeader: template.header === 1,
    customFooter: template.footer === 1,
    key: template.key,
    placeholders: JSON.parse(template.placeholders).join(', ')
  }))
})

// Filter templates
const filteredTemplates = computed(() =>
    templates.value.filter(template =>
        template.name.toLowerCase().includes(search.value.toLowerCase())
    )
)
const  loading = ref(false)

const { confirmDelete } = useDelete()


const deleteTemplate = async (id) => {
  loading.value = id
  try {
    await confirmDelete(() => emailStore.forceDeleteTemplate(id))
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}
</script>

