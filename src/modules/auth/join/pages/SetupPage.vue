<template>
  <AuthBox>
    <form @submit.prevent>
      <JoinHeader
        class="mb-6"
        :title="
          t('joinSetup.welcome', {
            firstName: memberData.firstName,
            lastName: memberData.lastName,
          })
        "
        :sub-title="setupContent.welcome"
        :description="t('joinSetup.confirmDetails')"
      />

      <div class="mb-3">
        <AppInput
          v-model="memberData.email"
          input-type="email"
          required
          :label="t('form.email')"
          :error-message="errorGenerator(setupValidation, 'email')"
          @blur="setupValidation.email.$touch"
        />
      </div>

      <div class="mb-3">
        <AppInput
          v-model="memberData.firstName"
          required
          :label="t('form.firstName')"
          :error-message="errorGenerator(setupValidation, 'firstName')"
          @blur="setupValidation.firstName.$touch"
        />
      </div>

      <div class="mb-5">
        <AppInput
          v-model="memberData.lastName"
          required
          :label="t('form.lastName')"
          :error-message="errorGenerator(setupValidation, 'lastName')"
          @blur="setupValidation.lastName.$touch"
        />
      </div>

      <template v-if="setupContent.showMailOptIn">
        <p class="text-lg mb-1">
          {{ setupContent.mailTitle }}
        </p>

        <p class="mb-4 text-sm">
          {{ setupContent.mailText }}
        </p>

        <div class="mb-4">
          <input
            id="deliveryOptIn"
            v-model="memberData.profile.deliveryOptIn"
            type="checkbox"
            name="updates"
          />

          <label for="deliveryOptIn" class="font-bold ml-1">
            {{ setupContent.mailOptIn }}
          </label>
        </div>

        <AppAddress
          v-model:line1="memberData.addressLine1"
          v-model:line2="memberData.addressLine2"
          v-model:postCode="memberData.postCode"
          v-model:cityOrTown="memberData.cityOrTown"
          v-model:addressValidation="addressValidation"
          :is-address-required="memberData.profile.deliveryOptIn"
        />
      </template>

      <template v-if="setupContent.showNewsletterOptIn">
        <p class="text-lg mb-1">
          {{ setupContent.newsletterTitle }}
        </p>

        <p class="mb-4 text-sm">
          {{ setupContent.newsletterText }}
        </p>

        <div class="mb-4">
          <input
            id="newsletterOptIn"
            v-model="memberData.profile.newsletterOptIn"
            type="checkbox"
            name="updates"
          />

          <label for="newsletterOptIn" class="font-bold ml-1">
            {{ setupContent.newsletterOptIn }}
          </label>
        </div>
      </template>

      <MessageBox v-if="hasSetupError" class="mb-4" />

      <AppButton
        variant="link"
        type="submit"
        :loading="loading"
        :disabled="hasSetupError"
        class="w-full"
        @click="completeSetup(router)"
      >
        {{ t('joinSetup.continue') }}
      </AppButton>
    </form>
  </AuthBox>
</template>

<script lang="ts" setup>
import AuthBox from '../../AuthBox.vue';
import JoinHeader from '../components/JoinHeader.vue';
import AppInput from '../../../../components/forms/AppInput.vue';
import AppAddress from '../../../../components/AppAddress.vue';
import { useJoin } from '../use-join';
import { errorGenerator } from '../../../../utils/form-error-generator';
import AppButton from '../../../../components/forms/AppButton.vue';
import MessageBox from '../../../../components/MessageBox.vue';
import { onBeforeMount } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const router = useRouter();

const {
  setMemberData,
  memberData,
  setSetupContent,
  setupContent,
  setupValidation,
  hasSetupError,
  addressValidation,
  loading,
  completeSetup,
} = useJoin();

onBeforeMount(() => {
  setMemberData();
  setSetupContent();
});
</script>
