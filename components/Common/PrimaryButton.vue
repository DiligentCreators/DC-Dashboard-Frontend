<script setup>
defineProps({
  type: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button
      :type="type"
      :disabled="disabled || loading"
      :class="[
      'inline-flex items-center gap-2 rounded-md border border-transparent bg-gray-900 hover:bg-black px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out focus:bg-indigo-800 focus:outline-none active:bg-indigo-900',
      (disabled || loading) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
    ]"
  >
    <!-- Spinner -->
    <svg
        v-if="loading"
        class="animate-spin h-4 w-4 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
    >
      <circle
          class="opacity-25"
          cx="12" cy="12" r="10"
          stroke="currentColor"
          stroke-width="4"
      ></circle>
      <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>

    <slot />
  </button>
</template>
