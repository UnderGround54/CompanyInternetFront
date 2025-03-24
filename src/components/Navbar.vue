<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/clients">Gestion Clients</router-link>
      <button v-if="apiService.getToken()" class="btn btn-danger" @click="logout">Déconnexion</button>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';
import apiService from '../services/apiService.js';
import Swal from 'sweetalert2';

const router = useRouter();

const logout = () => {
  apiService.logout();
  Swal.fire("Déconnexion", "Vous avez été déconnecté.", "success").then(() => {
    router.push('/login');
  });
};
</script>
