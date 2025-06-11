<script setup>
import { useCommonStore } from "~/stores/common";

const commonStore = useCommonStore();

const props = defineProps({
  field: String,
});
</script>

<template>
  <div class="flex h-2 text-xs py-1 text-red-500 font-[500]">
    <span
        v-if="
        commonStore.validationError &&
        commonStore.validationError[props.field]
      "
    >
      {{ commonStore.validationError[props.field][0] }}</span
    >
  </div>
</template>