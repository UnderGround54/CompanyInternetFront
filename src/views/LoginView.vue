<template>
  <div class="container d-flex justify-content-center align-items-center" style="min-height: 100vh;">
    <div class="card p-4" style="max-width: 400px;">
      <h2 class="text-center mb-4">Se connecter</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <input type="email" v-model="email" id="email" class="form-control" placeholder="Email" required />
        </div>
        <div class="mb-3">
          <input type="password" v-model="password" id="password" class="form-control" placeholder="Mot de passe" required />
        </div>
        <button type="submit" class="btn btn-primary w-100">Se connecter</button>
        <p v-if="errorMessage" class="text-danger mt-3 text-center">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import AuthService from '../services/AuthService';
import { useRouter } from 'vue-router';
import {ref} from "vue";

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');
    const router = useRouter();

    const handleLogin = async () => {
      try {
        await AuthService.login(email.value, password.value);
        await router.push('/home');
      } catch (error) {
        errorMessage.value = error.message;
      }
    };

    return { email, password, errorMessage, handleLogin };
  }
};
</script>
