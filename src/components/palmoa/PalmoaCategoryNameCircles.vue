<template>
  <div class="category-name-circles" :class="{ reverse }"
    :style="{ '--factor': factor }">
    <div class="circle" :style="{ '--idx': 1 }"></div>
    <div class="circle" :style="{ '--idx': 1.2 }"></div>
    <div class="circle" :style="{ '--idx': 1.5 }"></div>
    <div class="circle" :style="{ '--idx': 2 }"></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  reverse?: boolean;
}>();

const factor = 1;
</script>

<style scoped>
.category-name-circles {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.category-name-circles.reverse {
  flex-direction: row-reverse;
}

.circle {
  width: calc(12px / var(--idx) * var(--factor));
  aspect-ratio: 1;
  background-color: #11748e;
  border-radius: 50%;
}

@media (max-width: 400px) {
  .category-name-circles {
    gap: 0.25rem;
  }

  .circle {
    width: calc(12px / (var(--idx) * var(--factor) * 1.2));
  }

  .circle:last-child {
    display: none;
  }
}
</style>
