<template>
  <div class="container">
    <h1>Gestion des clients</h1>
    <button v-if="apiService.getToken()" @click="logout">Deconnexion</button>
    <RouterView />
  </div>
</template>

<script setup>
  import { RouterView } from 'vue-router';
  import { useRouter } from 'vue-router';
  import apiService from "./services/apiService.js";

  const router = useRouter();

  function logout(){
    apiService.logout();
    router.push('/login');
  }

</script>

<style scoped>
</style>
