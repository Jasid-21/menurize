<template>
  <div class="home-view">
    <div class="content-container">
      <div class="share-section" v-if="mode === 'share'">
        <QRCode :text="link"></QRCode>
        <div class="share-link-container">
          <div class="link">{{ link }}</div>
          <div class="copy-btn bg-color-transition" @click="copyLink">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div class="text-section" v-else>
        <textarea v-model="menu"></textarea>

        <div class="save-btn bg-color-transition" @click="saveMenu">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
              <path
                d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
              <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7M7 3v4a1 1 0 0 0 1 1h7" />
            </g>
          </svg>
        </div>
      </div>
    </div>

    <div class="tabs-container">
      <div class="tab share-tab bg-color-transition" :class="{ active: mode === 'share' }" @click="setMode('share')">
        Compartir
      </div>
      <div class="tab edit-tab bg-color-transition" :class="{ active: mode === 'edit' }" @click="setMode('edit')">
        Editar
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { homeViewMode } from '@/types/globalTypes';
import { computed, onMounted, ref } from 'vue';
import { useAlert } from '@/composables/useAlert';
import { useMenu } from '@/composables/useMenu';
import { useRestaurant } from '@/composables/useRestaurant';
import router from '@/router';
import QRCode from '@/components/QRCode.vue';

const { fireAlert } = useAlert();

const mode = ref<homeViewMode>('edit');
const setMode = (v: homeViewMode) => mode.value = v;

const { restaurant } = useRestaurant();
const domain = import.meta.env.VITE_DOMAIN;
const link = computed(() => `${ domain }/${ restaurant.value }`);
const copyLink = () => {
  navigator.clipboard.writeText(link.value);

  fireAlert("Link del menú copiado correctamente!");
}

const { menu, saveMenu } = useMenu();

onMounted(() => {
  if (!restaurant.value) router.push({ name: "check" });
});
</script>

<style scoped>
.home-view {
  padding: 1rem;
  height: 100vh;

  display: grid;
  grid-template-rows: 1fr auto;
  gap: 1rem;
  justify-items: center;
}

.content-container {
  width: 100rem;
  max-width: 100vw;
  height: 100%;

  box-shadow: 0 0 0.5rem var(--primary);
  border-radius: 1rem;
}

.content-container .share-section {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

.content-container .share-section .share-link-container {
  width: 50rem;
  border: 1px solid var(--dark-primary);
  border-radius: 0.5rem;
  padding: 0.5rem;

  display: grid;
  grid-template-columns: 1fr 5rem;
  gap: 1rem;
}

.content-container .share-section .share-link-container .link {
  color: var(--dark-primary);
  font-size: 2.5rem;
  text-wrap: nowrap;
  width: 100%;

  overflow: hidden;
  text-overflow: ellipsis;
}

.content-container .share-section .share-link-container .copy-btn {
  border-radius: 0 0.5rem 0.5rem 0;
  border-left: 1px solid var(--dark-primary);
  padding: 0.5rem 0.75rem;
  color: var(--dark-primary);
}

.content-container .share-section .share-link-container .copy-btn:hover {
  background-color: var(--primary);
  color: #fff;
}

.content-container .text-section {
  height: 100%;
  padding: 1rem;
  position: relative;
}

.content-container .text-section textarea {
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  resize: none;
  color: var(--dark-primary);
}

.content-container .text-section .save-btn {
  position: absolute;
  bottom: 3rem; right: 3rem;
  border: 2px solid var(--dark-primary);
  border-radius: 50%;
  color: var(--dark-primary);

  width: 5rem;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.content-container .text-section .save-btn:hover {
  color: #fff;
  background-color: var(--dark-primary);
}

.tabs-container {
  display: flex;
  align-items: center;
}

.tabs-container .tab {
  color: color-mix(in srgb, var(--primary), #000 40%);
  background-color: rgba(from var(--primary) r g b / 0.4);
  border: 2px solid var(--primary);
  padding: 1rem 1.5rem;
}

.tabs-container .tab.active {
  background-color: rgba(from var(--primary) r g b / 0.8);
  color: #fff;
}

.tabs-container .tab:hover {
  background-color: var(--primary);
  color: #fff;
  cursor: pointer;
}

.tabs-container .share-tab {
  border-radius: 1rem 0 0 1rem;
}

.tabs-container .edit-tab {
  border-radius: 0 1rem 1rem 0;
  border-left-width: 0;
}
</style>
