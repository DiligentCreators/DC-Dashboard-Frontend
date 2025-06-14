<template>
  <div class="flex flex-col items-center justify-center p-8 text-center">
    <!-- Container with subtle shadow and border -->
    <div class="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <!-- Icon Header -->
      <div class="bg-red-50 dark:bg-red-900/20 p-6">
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30">
          <svg class="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
        </div>
      </div>

      <!-- Content Area -->
      <div class="px-6 py-4">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Access Restricted</h3>
        <p class="text-gray-600 dark:text-gray-300 mb-4">
          You don't have the necessary permissions to view this content.
        </p>

        <!-- Additional Help Text -->
        <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-sm text-gray-500 dark:text-gray-400">
          <p>Please contact your administrator if you believe this is an error.</p>
        </div>

        <!-- Action Button -->
        <div class="mt-6 pb-4">
          <button
              @click="$router.push('/dashboard')"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
            </svg>
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>

    <!-- Alternative Content Suggestion -->
  </div>
</template>

<script>
export default {
  name: 'PermissionDenied',
  methods: {
    // You can add methods here if needed
  }
}
</script>