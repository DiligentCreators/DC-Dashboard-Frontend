<template>
  <div class="p-6 space-y-6">

    <!-- Page Header -->
    <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Email Templates</h1>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Manage all your system email templates here. You can add, search, or customize templates like Welcome Emails,
        </p>
      </div>
      <div class="flex items-center gap-3 w-full md:w-auto">
        <input
            type="text"
            v-model="search"
            placeholder="Search by template name..."
            class="w-full md:w-64 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white"
        />
        <NuxtLink
            to="/email/create"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm inline-block"
        >
          + Add New
        </NuxtLink>

      </div>
    </div>

    <!-- Templates Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
          v-for="template in filteredTemplates"
          :key="template.key"
          class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow rounded-xl p-6"
      >
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {{ template.name }}
        </h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
          <strong>Subject:</strong> {{ template.subject }}
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
          <strong>Email Body:</strong> {{ template.body }}
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
          <strong>Custom Header:</strong>
          <span :class="template.customHeader ? 'text-green-500' : 'text-red-500'">
            {{ template.customHeader ? 'Enabled' : 'Default' }}
          </span>
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
          <strong>Custom Footer:</strong>
          <span :class="template.customFooter ? 'text-green-500' : 'text-red-500'">
            {{ template.customFooter ? 'Enabled' : 'Default' }}
          </span>
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
          <strong>Template Key:</strong> {{ template.key }}
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          <strong>Placeholders:</strong> {{ template.placeholders }}
        </p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const search = ref('')

const templates = ref([
  {
    name: 'Welcome Email',
    subject: 'Welcome to Our Platform!',
    body: 'Hi {{name}}, we’re glad to have you.',
    customHeader: true,
    customFooter: false,
    key: 'welcome_email',
    placeholders: 'name,email',
  },
  {
    name: 'Password Reset',
    subject: 'Reset Your Password',
    body: 'Hi {{name}}, click the link to reset your password.',
    customHeader: false,
    customFooter: true,
    key: 'password_reset',
    placeholders: 'name,email,reset_link',
  },
  {
    name: 'Subscription Confirmation',
    subject: 'Thanks for Subscribing!',
    body: 'Hi {{name}}, your subscription is now active.',
    customHeader: true,
    customFooter: true,
    key: 'subscription_confirmation',
    placeholders: 'name,email,subscription_type',
  },
])

const filteredTemplates = computed(() =>
    templates.value.filter((template) =>
        template.name.toLowerCase().includes(search.value.toLowerCase())
    )
)
</script>
