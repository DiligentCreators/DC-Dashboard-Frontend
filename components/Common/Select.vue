<script setup>
const props = defineProps({
  modelValue: String | Number,
  type: {
    type: String,
    default: "text",
  },
  options: {
    type: Array,
  },
  label: {
    type: String,
    default: "",
  },
  selectLabel: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "medium",
  },
  onChange: {
    type: Function,
  },
});

const emit = defineEmits(["update:modelValue"]);

const paddingClasses = computed(() => {
  switch (props.size) {
    case "small":
      return "py-2 px-3";
    default:
      return "py-2 px-3 md:py-3 md:px-3";
  }
});

const textClasses = computed(() => {
  switch (props.size) {
    case "small":
      return "!text-xs";
    default:
      return "!text-sm";
  }
});
</script>

<template>
  <div class="flex flex-col">
    <label
        :for="props.id"
        v-if="props.label"
        class="mb-1 text-sm font-[500] text-gray-700"
    >{{ props.label }}</label
    >
    <select
        :placeholder="props.placeholder"
        :class="`rounded cursor-pointer appearance-none relative border bg-white border-gray-400 w-full focus:!border-red-500 focus:!outline-red-500 ${textClasses} ${paddingClasses}`"
        :value="props.modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @change="props.onChange"
    >
      <option value="" :class="`!text-gray-500 ${textClasses}`">
        {{ props.selectLabel }}
      </option>

      <option
          v-for="(option, i) in props.options"
          :key="i"
          :value="option.value"
          :class="`${textClasses}`"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>