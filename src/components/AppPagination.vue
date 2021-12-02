<template>
  <ul>
    <li
      v-for="(page, index) in pages"
      :key="index"
      :class="{ 'text-secondary': page === currentPage }"
    >
      {{ page }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
});

// doesn't work properly if currentPage is first + 2 and last - 2
// and it's not a good solution
const pages = computed(() => {
  const res = [];
  for (let i = 1; i <= props.totalPages; i++) {
    if (i === 1) {
      res.push(1);
      continue;
    }
    if (i === props.currentPage - 1) {
      res.push('...');
      res.push(i);
    }
    if (i === props.currentPage) {
      res.push(i);
    }
    if (i === props.currentPage + 1) {
      res.push(i);
      res.push('...');
    }
    if (i === props.totalPages) res.push(i);
  }
  return res;
});
</script>
