<template>
  <div class="flex rounded h-12" :class="type">
    <div
      class="
        flex
        items-center
        justify-center
        flex-shrink-0
        w-12
        text-white
        icon-container
      "
    >
      <font-awesome-icon :icon="['fas', icon]" />
    </div>

    <div class="flex items-center flex-grow px-2 text-xs content-container">
      <slot>{{ t('form.errors.aggregator') }}</slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { computed } from '@vue/reactivity';

const { t } = useI18n();

const props = defineProps({
  type: {
    type: String,
    default: 'error',
    validator(value: string) {
      return ['error', 'success', 'warning'].includes(value);
    },
  },
});

const icon = computed(() =>
  props.type === 'success' ? 'check' : 'exclamation'
);
</script>

<style scoped>
.success .icon-container {
  @apply bg-success-30;
}

.success .content-container {
  @apply bg-success-10 text-success;
}

.error .icon-container {
  @apply bg-danger-30;
}

.error .content-container {
  @apply bg-danger-10 text-danger;
}

.warning .icon-container {
  @apply bg-warning-70;
}

.warning .content-container {
  @apply bg-warning-10 text-primary-80;
}
</style>
