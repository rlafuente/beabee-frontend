<template>
  <div
    class="fixed w-full md:w-1/2 top-2 z-50 right-1/2 transform translate-x-1/2"
  >
    <div class="mx-4 md:mx-0 space-y-2">
      <transition-group name="fade">
        <AppNotfication
          v-for="(notification, index) in notifications"
          :key="index"
          :notification="notification"
          @remove="removeItem"
        />
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { emitter } from '../../plugins/notify';
import { Notification } from './notification.interface';
import { reactive } from 'vue';
import { onBeforeMount } from '@vue/runtime-core';
import AppNotfication from './AppNotification.vue';

const notifications = reactive<Notification[]>([]);

const addItem = (notification: Notification) => {
  notifications.push(notification);
};

const removeItem = (id: number) => {
  const notificationIndex = notifications.findIndex((item) => item.id === id);
  notifications.splice(notificationIndex, 1);
};

onBeforeMount(() => {
  emitter.on('add', addItem);
});
</script>

<style scoped>
.fade-leave-active {
  @apply transition ease-linear duration-200;
}

.fade-leave-to {
  @apply opacity-0;
}
</style>
