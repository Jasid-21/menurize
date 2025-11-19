import { ref } from "vue";

const loading = ref<boolean>(false);
export function useLoadingScreen() {
  const setLoading = (v: boolean) => loading.value = v;

  return {
    loading,
    setLoading,
  }
}
