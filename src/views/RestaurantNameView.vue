<template>
  <div class="restaurant-name-view">
    <div class="loading-screen">
      <svg xmlns="http://www.w3.org/2000/svg" width="10rem" height="10rem" viewBox="0 0 24 24">
        <path fill="none" stroke="currentColor" stroke-dasharray="16" stroke-dashoffset="16" stroke-linecap="round"
          stroke-linejoin="round" stroke-width="2" d="M12 3c4.97 0 9 4.03 9 9">
          <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="16;0" />
          <animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate"
            values="0 12 12;360 12 12" />
        </path>
      </svg>

      <span>Obteniendo los datos de tu restaurante...</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRestaurant } from '@/composables/useRestaurant';
import router from '@/router';
import { watch } from 'vue';

const { restaurant } = useRestaurant();
watch(restaurant, (v) => {
  if (typeof v === 'string') return router.push({ name: 'home' });
  router.push({ name: 'auth' });
});
</script>

<style scoped>
.restaurant-name-view {
  height: 100vh;
  color: var(--dark-primary);

  display: flex;
  justify-content: center;
  align-items: center;
}

.restaurant-name-view .loading-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.restaurant-name-view .restaurant-name-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.restaurant-name-view .restaurant-name-screen span {
  font-weight: 600;
}

.restaurant-name-view .restaurant-name-screen input {
  width: 50rem;
  height: 4.25rem;

  border: 2px solid var(--primary);
  border-radius: 1rem;
  padding: 0.5rem;
  outline: none;
  text-align: center;
}

.restaurant-name-view .restaurant-name-screen input[type="submit"] {
  width: 15rem;
  height: 4.25rem;
  padding: 0.5rem;

  background-color: rgba(from var(--dark-primary) r g b / 0.3);
  color: var(--dark-primary);
  font-weight: 600;

  border:  2px solid var(--dark-primary);
  border-radius: 1rem;
}

.restaurant-name-view .restaurant-name-screen input[type="submit"]:hover {
  background-color: var(--dark-primary);
  color: #fff;
}
</style>
