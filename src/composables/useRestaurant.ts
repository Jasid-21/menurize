import { auth, db } from "@/connections/firebaseApp";
import router from "@/router";
import { getDocumentsByField } from "@/utils/firebaseFuncions";
import { onAuthStateChanged, type User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, watch } from "vue";

const restaurant = ref<string | null>("");
watch(restaurant, v => console.log(v));
export function useRestaurant() {

  const getRestaurantName = async (user: User | null) => {
    if (!user) return router.push({ name: 'auth' });

    const doc = (await getDocumentsByField("uid", user.uid))[0];
    if (!doc) return restaurant.value = null;

    restaurant.value = doc.data().restaurant;
  }

  const saveRestaurantName = async () => {
    const user = auth.currentUser;
    if (!user) throw new Error("Not authenticated");

    const ref = doc(db, "menus", user.uid);

    await setDoc(ref, {
      restaurant: restaurant.value,
      uid: user.uid,
      updated_at: Date.now()
    }, { merge: true });
  }

  onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      await getRestaurantName(user);
    } else {
      router.push({ name: "auth" });
    }
  });

  return {
    restaurant,
    getRestaurantName,
    saveRestaurantName,
  }
}
