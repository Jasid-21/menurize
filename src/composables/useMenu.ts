import { auth } from "@/connections/firebaseApp";
import { onAuthStateChanged, type User } from "firebase/auth";
import { DocumentReference, setDoc, type DocumentData } from "firebase/firestore";
import { ref } from "vue";
import { useAlert } from "./useAlert";
import router from "@/router";
import { useLoadingScreen } from "./useLoadingScreen";
import { getDocumentsByField } from "@/utils/firebaseFuncions";

export function useMenu() {
  const { fireAlert } = useAlert();
  const { setLoading } = useLoadingScreen();

  const menu = ref<string>("");
  const docRef = ref<DocumentReference<DocumentData, DocumentData>>();
  const saveMenu = async () => {
    const user = auth.currentUser;
    if (!user) return router.push({ name: 'auth' });
    if (!docRef.value) return;

    setLoading(true);

    await setDoc(docRef.value, {
      menu_text: menu.value,
      uid: user.uid,
      updated_at: Date.now()
    }, { merge: true });

    setLoading(false);
    fireAlert("Menú guardado con éxito!");
  }

  onAuthStateChanged(auth, async (user: User | null) => {
    if (!user) {
      router.push({ name: 'auth' });
      return;
    }

    const doc = (await getDocumentsByField("uid", user.uid))[0];
    if (!doc) return fireAlert("Error obteniendo los datos de tu restaurante. Por favor intenta más tarde");

    menu.value = doc.data().menu_text as string;
    docRef.value = doc.ref;
  });

  return {
    menu,
    saveMenu,
  }
}
