<template>
  <RouterView></RouterView>

  <ModalsContainer></ModalsContainer>

  <div class="loading-screen" v-if="loading">
    <svg xmlns="http://www.w3.org/2000/svg" width="10rem" height="10rem" viewBox="0 0 24 24">
      <path fill="none" stroke="currentColor" stroke-dasharray="16" stroke-dashoffset="16" stroke-linecap="round"
        stroke-linejoin="round" stroke-width="2" d="M12 3c4.97 0 9 4.03 9 9">
        <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="16;0" />
        <animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate"
          values="0 12 12;360 12 12" />
      </path>
    </svg>
  </div>
</template>

<script setup lang="ts">
import ModalsContainer from './components/modals/ModalsContainer.vue';
import { useLoadingScreen } from './composables/useLoadingScreen';

const { loading } = useLoadingScreen();
</script>

<style>
@import "./styles/common.css";

.loading-screen {
  width: 100vw;
  isolation: isolate;
  z-index: 1000;

  position: fixed;
  top: 0; left: 0;
  right: 0; bottom: 0;

  background-color: rgba(212, 212, 212, 0.4);
  color: var(--primary);

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
