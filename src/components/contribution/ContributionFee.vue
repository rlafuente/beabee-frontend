<template>
  <section class="mb-6">
    <p class="leading-normal mb-4 text-sm">
      {{ t('join.absorbFeeText', { fee: n(fee, 'currency') }) }}
    </p>

    <label class="mb-4">
      <input v-model="payFee" type="checkbox" :disabled="force" />

      {{
        t(force ? 'join.absorbFeeForce' : 'join.absorbFeeOptIn', {
          fee: n(fee, 'currency'),
          amount: n(amount, 'currency'),
        })
      }}
    </label>
  </section>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { computed } from '@vue/reactivity';

const { t, n } = useI18n();

const emits = defineEmits(['update:modelValue']);

const props = defineProps({
  amount: {
    type: Number,
    default: 0,
  },
  fee: {
    type: Number,
    default: 0,
  },
  force: {
    type: Boolean,
    required: true,
  },
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const payFee = computed<boolean>({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits('update:modelValue', value);
  },
});
</script>
