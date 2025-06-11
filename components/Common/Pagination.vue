<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const totalPages = computed(() =>
    [...Array(Math.ceil(props.data.total / props.data.per_page)).keys()].map(
        (num) => num + 1
    )
);
</script>

<template>
  <nav aria-label="navigation">
    <ul class="inline-flex -space-x-px text-sm">
      <li>
        <a
            href="#"
            @click.prevent="$emit('page-change', props.data.current_page - 1)"
            class="flex items-center justify-center px-4 h-9 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
            :class="{
            '!pointer-events-none !opacity-50': props.data.current_page === 1,
          }"
        >Previous</a
        >
      </li>
      <li v-for="page in totalPages" :key="page">
        <a
            href="#"
            @click.prevent="$emit('page-change', page)"
            class="flex items-center justify-center px-4 h-9 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            :class="{
            '!bg-red-500 !text-white': props.data.current_page === page,
          }"
        >{{ page }}</a
        >
      </li>
      <li>
        <a
            href="#"
            @click.prevent="$emit('page-change', props.data.current_page + 1)"
            class="flex items-center justify-center px-4 h-9 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
            :class="{
            '!pointer-events-none !opacity-50':
              props.data.current_page === totalPages.length,
          }"
        >Next</a
        >
      </li>
    </ul>
  </nav>
</template>