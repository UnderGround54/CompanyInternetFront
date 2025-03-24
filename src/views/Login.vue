<template>
  <div class="container mt-5">
    <h2>Connexion</h2>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
    <form @submit.prevent="login">
      <div class="mb-3">
        <label for="email" class="form-label">Nom d'utilisateur</label>
        <input type="text" id="email" v-model="credentials.email" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Mot de passe</label>
        <input type="password" id="password" v-model="credentials.password" class="form-control" />
      </div>
      <button type="submit" class="btn btn-primary">Se connecter</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import apiService from '../services/apiService.js';

const credentials = ref({
  email: '',
  password: '',
});
const router = useRouter();
const error = ref(null);

const login = async () => {
  error.value = null;
  try {
    await apiService.login(credentials.value);
    await router.push('/clients');
  } catch (err) {
    error.value = 'Informations d\'identification invalides.'; // Affiche un message d'erreur
  }
};
</script>
