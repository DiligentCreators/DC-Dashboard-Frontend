<script setup>
import { ref, onMounted, defineProps, defineEmits, defineExpose } from 'vue';

const props = defineProps({
  modelValue: [String, Number],
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  label: { type: String, default: '' },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  autofocus: { type: Boolean, default: false },
});

const emit = defineEmits(['update:modelValue']);
const input = ref(null);

onMounted(() => {
  if (props.autofocus && input.value) input.value.focus();
});

defineExpose({
  focus: () => input.value?.focus(),
});

// Method to update the modelValue when the input changes
const updateModelValue = (value) => {
  emit('update:modelValue', value);
};
</script>

<template>
  <div class="flex flex-col w-full">
    <label
        v-if="props.label"
        :for="props.id"
        class="block text-sm font-medium text-gray-700" >
      {{ props.label }}
      <span v-if="props.required" class="text-red-500">*</span>
    </label>

    <div class="relative">
      <input
          :value="props.modelValue"
          @input="updateModelValue($event.target.value)"
          :type="props.type"
          :placeholder="props.placeholder"
          :required="props.required"
          :disabled="props.disabled"
          ref="input"
          class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  </div>
</template>