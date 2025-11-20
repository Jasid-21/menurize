<template>
  <div class="palmoa-menu-item">
    <div class="item-name" :class="{ highlight: item.highlight }">{{ item.name }}</div>
    <div class="item-price">{{ item.price }}</div>
    <div class="item-description">{{ item.description }}</div>
  </div>
</template>

<script setup lang="ts">
import type { IMenuItem } from '@/types/globalInterfaces';

defineProps<{
  item: IMenuItem;
}>();
</script>

<style scoped>
.palmoa-menu-item {
  color: #483122;
  margin-bottom: 2rem;

  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
}

.item-name, .item-price {
  font-weight: 600;
  font-size: 2.5rem;
}

.item-name.highlight {
  color: #c79847;
}

@media (max-width: 400px) {
  .item-description {
    grid-column: 1 / 3;
  }
}
</style>
