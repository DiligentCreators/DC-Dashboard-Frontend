<script setup>
import SecondaryButton from "@/components/Common/SecondaryButton.vue";

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  module: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  ids: {
    type: Array,
    required: true,
  },
  data: {
    type: Object | null,
  },
});

const exportStore = useExportStore();

const loading = ref(false);

const startExporting = async () => {
  if (props.ids && !props.ids.length) {
    return useNuxtApp().$toast.warn("Select items first");
  }

  loading.value = true;

  await exportStore.exportData(
      props.module,
      props.type,
      props.ids,
      props.data
  );

  loading.value = false;
};
</script>
<template>
  <SecondaryButton
      size="small"
      :icon="props.icon"
      :title="`Export to ${props.label}`"
      @click="startExporting"
  />
</template>