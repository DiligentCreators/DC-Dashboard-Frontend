<script setup>
const props = defineProps({
  modelValue: [String, Number, Date],
  type: {
    type: String,
    default: "text",
  },
  id: {
    type: String,
    default: undefined,
  },
  placeholder: String,
  label: {
    type: String,
    default: "",
  },
  required: Boolean,
  size: {
    type: String,
    default: "medium", // small | medium
  },
  currency: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const paddingClasses = computed(() => {
  return props.size === "small"
      ? "py-2 px-3"
      : "py-2 px-3 md:py-3 md:px-3";
});

const textClasses = computed(() => {
  return props.size === "small"
      ? "text-xs placeholder:text-xs"
      : "text-sm placeholder:text-sm";
});

const isColor = computed(() => props.type === "color");
</script>

<template>
  <div class="flex flex-col w-full">
    <label
        v-if="label"
        :for="id"
        class="mb-1 text-[.82rem] font-medium text-gray-800 dark:text-gray-200"
    >
      {{ label }}
    </label>

    <div class="flex w-full relative">
      <!-- Currency Prefix -->
      <div
          v-if="currency"
          class="flex items-center px-3 rounded-l border border-r-0 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 text-sm"
      >
        PKR
      </div>

      <input
          :id="id"
          :type="type"
          :placeholder="placeholder"
          :required="required"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          :class="[
          'w-full border rounded appearance-none transition duration-150 ease-in-out',
          'bg-white dark:bg-gray-700',
          'text-gray-900 dark:text-white',
          'border-gray-300 dark:border-gray-600',
          'focus:ring-2 focus:ring-gray-500 focus:outline-none',
          paddingClasses,
          textClasses,
          isColor ? 'h-11' : '',
          currency ? 'rounded-l-none' : ''
        ]"
      />
    </div>
  </div>
</template>
