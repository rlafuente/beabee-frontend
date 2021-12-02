<template>
  <ul>
    <li v-for="(page, index) in pages" :key="index">{{ page }}</li>
  </ul>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

// three conditions
// 0. you always have first and last
// 1. is close to first item if it
// 2. is closed to last item
// 3. is middle

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

const isFirstPage = computed(() => {
  return props.currentPage === 1;
});
const isLastPage = computed(() => {
  return props.currentPage === totalPages;
});

const pages = computed(() => {
  const res = [];
  // const isCloseToBeginning = props.currentPage < 3;
  //const isCloseToEnd = props.currentPage < props.totalPages + 3;
  for (let i = 1; i <= props.totalPages; i++) {
    if (i < 3) {
      res.push(i);
    }
  }
  return res;
});
</script>
