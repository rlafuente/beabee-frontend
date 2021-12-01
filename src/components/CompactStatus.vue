<template>
  <!-- TODO: improve accessibilty -->
  <span class="w-2 h-2 inline-block rounded-full" :class="bgClass" />
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  status: {
    type: String,
    default: 'active',
    validator(value) {
      return ['active', 'expired', 'primary', 'empty'].includes(value);
    },
  },
});

const bgClass = computed(() => {
  switch (props.status) {
    case 'primary':
      return 'bg-primary';
      break;

    case 'expired':
      return 'bg-danger';
      break;

    case 'empty':
      return 'border border-primary-80';
      break;

    default:
      return 'bg-success';
  }
});
</script>
