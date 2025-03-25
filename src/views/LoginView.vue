<!-- src/views/LoginView.vue -->
<template>
  <div class="login-container">
    <h2>Connexion</h2>
    <form @submit.prevent="handleLogin">
      <input type="text" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Mot de passe" required />
      <button type="submit">Se connecter</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
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

<style scoped>
.login-container {
  max-width: 300px;
  margin: auto;
  text-align: center;
}
input {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 8px;
}
button {
  padding: 8px;
  background: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}
.error {
  color: red;
}
</style>
