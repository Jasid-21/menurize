<template>
  <div class="palmoa-menu-category">
    <div class="category-header" @click.stop="toggleDisply">
      <div class="category-name-container">
        <PalmoaCategoryNameCircles :reverse="true" />
        <div class="category-name">
          {{ category.name }}
        </div>
        <PalmoaCategoryNameCircles />
        <div></div>
      </div>

      <div class="bottom-dash"></div>

      <div class="dropdown-btn">
        <Transition name="chevron">
          <svg v-if="!display" xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m6 9l6 6l6-6" />
          </svg>
        </Transition>

        <Transition name="chevron">
          <svg v-if="display" xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m18 15l-6-6l-6 6" />
          </svg>
        </Transition>
      </div>
    </div>

    <Transition>
      <div class="items-container" v-if="display">
        <PalmoaMenuItem v-for="(item, idx) in category.items" :key="idx" :item>
        </PalmoaMenuItem>
      </div>
    </Transition>

  </div>
</template>

<script setup lang="ts">
import type { IMenuCategory } from '@/types/globalInterfaces';
import PalmoaMenuItem from './PalmoaMenuItem.vue';
import PalmoaCategoryNameCircles from './PalmoaCategoryNameCircles.vue';
import { ref } from 'vue';

defineProps<{
  category: IMenuCategory;
}>();

const display = ref<boolean>(false);
const toggleDisply = () => display.value = !display.value;
</script>

<style scoped>
.palmoa-menu-category {
  margin-bottom: 4rem;

  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.category-header {
  color: #11748e;

  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1rem;
}

.bottom-dash {
  border-bottom: 2px dotted var(--dark-primary);
  width: 100%;
  height: 2px;
  align-self: flex-end;
}

@media (max-width: 600px) {
  .bottom-dash {
    border: none;
  }
}

.category-name-container {
  display: grid;
  grid-template-columns: auto auto auto 1fr;
  gap: 1rem;
}

.category-name-container .category-name {
  font-weight: 600;
  font-size: 3rem;
}

@media (min-width: 400px) {
  .category-name-container .category-name {
    text-wrap: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.dropdown-btn {
  position: relative;
  width: 2.5rem;
  aspect-ratio: 1;
}

.dropdown-btn svg {
  position: absolute;
  top: 50%; left: 50%;
  translate: -50% -50%;
}

.items-container {
  overflow: hidden;
}

.v-enter-from,
.v-leave-to {
  max-height: 0;
}

.v-enter-to,
.v-leave-from {
  max-height: 100vh;
}

.v-enter-active,
.v-leave-active {
  transition: max-height 250ms ease;
}

.chevron-enter-from,
.chevron-leave-to {
  opacity: 0;
  rotate: 180deg;
}

.chevron-enter-to,
.chevron-leave-from {
  opacity: 1;
  rotate: 0;
}

.chevron-enter-active,
.chevron-leave-active {
  transition: all 250ms ease;
}
</style>
