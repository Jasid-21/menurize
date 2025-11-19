<template>
  <div class="modal-backdrop" @click.stop="closeModal(id)">
    <div class="messages-modal">
      <div class="message-container">
        {{ msg }}
      </div>

      <div class="buttons-container">
        <button @click="closeModal(id)">Ok</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAlert } from '@/composables/useAlert';

const { closeModal } = useAlert();

defineProps<{
  id: string;
  msg: string;
}>();
</script>

<style scoped>
.modal-backdrop {
  background-color: rgba(212, 212, 212, 0.6);
  position: fixed;
  isolation: isolate;
  z-index: 900;

  top: 0; left: 0;
  right: 0; bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;
}

.messages-modal {
  min-width: 20rem;
  max-width: 50rem;
  box-shadow: 0 0 0.5rem gray;
  background-color: #fff;
  padding: 2rem;
  border-radius: 2rem;
  border: 1px solid gray;
  color: var(--dark-primary);

  text-align: center;
  position: absolute;
}

.buttons-container {
  margin-top: 1rem;
}

button {
  width: 10rem;
  height: 4.22rem;
  border-radius: 1rem;
  border: 2px solid var(--dark-primary);
  background-color: rgba(from var(--dark-primary) r g b / 0.3);
  color: var(--dark-primary);
}
</style>
