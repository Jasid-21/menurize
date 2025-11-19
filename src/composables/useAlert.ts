import type { IMessageModal } from "@/types/globalInterfaces";
import { getRandomCode } from "@/utils/globalUtils";
import { ref } from "vue";

const modals = ref<IMessageModal[]>([]);

export function useAlert() {
  const fireAlert = async (msg: string) => {
    return new Promise<void>((resolver) => {
      const modal: IMessageModal = {
        id: getRandomCode(),
        type: 'basic',
        msg,
        resolver,
      }

      modals.value.push(modal);
    });
  }

  const closeModal = (id: string) => {
    const modal = modals.value.find(m => m.id === id);
    if (!modal) return;

    modal.resolver();
    modals.value = modals.value.filter(m => m.id != id);
  }

  return {
    modals,
    fireAlert,
    closeModal,
  }
}
