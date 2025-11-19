<template>
  <div class="modals-container" :class="{ active: modals.length }">
    <transition-group>
      <MessagesModal v-for="modal in modals" :key="modal.id" :id="modal.id" :msg="modal.msg">
      </MessagesModal>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { useAlert } from '@/composables/useAlert';
import MessagesModal from './MessagesModal.vue';

const { modals } = useAlert();
</script>

<style scoped>
.v-enter-from,
.v-leave-to {
  opacity: 0;
  scale: 1.2;
}

.v-enter-to,
.v-leave-from {
  opacity: 1;
  scale: 1;
}

.v-enter-active,
.v-leave-active {
  transition: all 180ms ease;
}
</style>
