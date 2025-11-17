<template>
  <div class="palmoa-view">
    <div class="palmoa-name">
      <img src="../../public/palmoa_name.png" alt="">
    </div>
    <PalmoaMenuCategory v-for="(category, idx) in categories" :key="idx" :category>
    </PalmoaMenuCategory>
  </div>
</template>

<script setup lang="ts">
import PalmoaMenuCategory from '@/components/palmoa/PalmoaMenuCategory.vue';
import type { IMenuCategory } from '@/types/globalInterfaces';
import { getMenuObject } from '@/utils/GetMenuObject';
import { setupMenuGlobals } from '@/utils/globalUtils';
import { onMounted, ref } from 'vue';

const categories = ref<IMenuCategory[]>([]);

onMounted(async () => {
  setupMenuGlobals("Palmoa Gastrobar - Sincelejo", "./palmoa.ico");
  const menu = await getMenuObject(
    "palmoa",
    "file:///home/sef21/Downloads/Men%C3%BA%20Digital%20Palmoa.pdf"
  );

  categories.value = menu;
});
</script>

<style scoped>
.palmoa-view {
  background: url('../../public/palmoa_background.png');
  padding: 2px var(--x-padding);
}

.palmoa-name {
  display: flex;
  justify-content: center;
}

.palmoa-name img {
  width: 100%;
  max-width: 40rem;
  object-fit: contain;
}
</style>
