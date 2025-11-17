<template>
  <div class="palmoa-menu-category">
    <div class="category-name-container">
      <PalmoaCategoryNameCircles :reverse="true" />
      <div class="category-name">
        {{ category.name }}
      </div>
      <PalmoaCategoryNameCircles />
    </div>
    <PalmoaMenuItem v-for="(item, idx) in category.items" :key="idx" :item></PalmoaMenuItem>
  </div>
</template>

<script setup lang="ts">
import type { IMenuCategory } from '@/types/globalInterfaces';
import PalmoaMenuItem from './PalmoaMenuItem.vue';
import PalmoaCategoryNameCircles from './PalmoaCategoryNameCircles.vue';

defineProps<{
  category: IMenuCategory;
}>();
</script>

<style scoped>
.palmoa-menu-category {
  margin-bottom: 4rem;

  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.category-name-container {
  display: flex;
  gap: 1rem;
}

.category-name-container .category-name {
  color: #11748e;
  font-weight: 600;
  font-size: 3.25rem;
}
</style>
