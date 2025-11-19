<template>
  <div class="qr-container">
    <img v-if="qr" :src="qr" alt="QR" />

    <div class="share-btn bg-color-transition" @click="downloadQr">
      <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <path d="M12 15V3m9 12v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <path d="m7 10l5 5l5-5" />
        </g>
      </svg>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import QRCode from "qrcode";

const props = defineProps<{
  text: string;
}>();
const qr = ref<string>("");
watch(() => props.text, v => generateQR(v));

const generateQR = async (text: string) => {
  qr.value = await QRCode.toDataURL(text);
};

const downloadQr = () => {
  const a = document.createElement("a");

  a.href = qr.value;
  a.download = "qr.png";
  document.body.appendChild(a);

  a.click();

  document.body.removeChild(a);
};

onMounted(() => generateQR(props.text));
</script>

<style scoped>
.qr-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.share-btn {
  width: 4rem;
  aspect-ratio: 1;

  border-radius: 50%;
  border: 1px solid var(--dark-primary);
  box-shadow: 0 0 0.25rem var(--dark-primary);
  color: var(--dark-primary);

  display: flex;
  justify-content: center;
  align-items: center;
}

.share-btn:hover {
  color: #fff;
  background-color: var(--dark-primary);
  cursor: pointer;
}
</style>
