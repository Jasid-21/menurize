<template>
  <div class="login-view">
    <div class="login-form">
      <button class="login-btn bg-color-transition" @click="redirectToLoginWindow">
        <div class="google-logo-container">
          <svg xmlns="http://www.w3.org/2000/svg" width="3rem" height="3rem" viewBox="0 0 512 512">
            <path fill="currentColor"
              d="M500 261.8C500 403.3 403.1 504 260 504C122.8 504 12 393.2 12 256S122.8 8 260 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C270.5 52.6 106.3 116.6 106.3 256c0 86.5 69.1 156.6 153.7 156.6c98.2 0 135-70.4 140.8-106.9H260v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4" />
          </svg>
        </div>

        <span>Entrar con google</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/connections/firebaseApp';
import { GoogleAuthProvider } from 'firebase/auth/web-extension';
import { useAlert } from '@/composables/useAlert';
import router from '@/router';
import { useLoadingScreen } from '@/composables/useLoadingScreen';
import { setDoc } from 'firebase/firestore';
import { getDocumentsByField } from '@/utils/firebaseFuncions';

const restaurantName = router.currentRoute.value.params.restaurant_name;

const { fireAlert } = useAlert();
const { setLoading } = useLoadingScreen();
const redirectToLoginWindow = async () => {
  const result = await signInWithPopup(auth, provider);
  try {
    if (!result) {
      throw new Error("Error accediendo a tu cuenta :( Por favor, intenta más tarde");
    }

    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential) {
      throw new Error("Error accediendo a tu cuenta :( Por favor, intenta más tarde");
    }

    if (restaurantName) {
      //Actualizar el id del usuario propietario del menú
      const user = auth.currentUser;
      if (!user) throw new Error("Error accediendo a tu cuenta :( Por favor, intenta más tarde");

      const doc = (await getDocumentsByField("restaurant", restaurantName as string))[0];
      if (!doc) throw new Error("No hay un restaurante registrdo con este link");

      if (!doc?.data().uid) {
        const ref = doc.ref;

        setLoading(true);
        await setDoc(ref, {
          uid: user.uid,
          updated_at: Date.now(),
        }, { merge: true });

        setLoading(false);
      }
    }

    //Redirigir al home
    router.push({ name: 'home' });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error);
    const errorMessage = error.message;

    fireAlert(errorMessage);
  }
}
</script>

<style scoped>
.login-view {
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
}

.login-view .login-form {
  height: 15rem;
  padding: 2rem;
  border-radius: 1rem;

  display: flex;
  place-items: center;
}

.login-btn {
  padding: 1rem;
  border-radius: 1rem;
  border: 2px solid var(--dark-primary);
  background-color: rgba(from var(--primary) r g b / 0.1);
  color: var(--dark-primary);
  outline: none;

  display: flex;
  align-items: center;
  gap: 1rem;
}

.login-btn:hover {
  cursor: pointer;
  background-color: var(--dark-primary);
  color: #fff;
}

.login-btn span {
  text-wrap: nowrap;
  font-weight: 600;
}
</style>
