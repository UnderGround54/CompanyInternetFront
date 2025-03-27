<template>
  <div class="container card">
    <h1>Bonjour, {{ user.username }}</h1>
    <p v-if="user && user.roles[0] === 'ROLE_ADMIN'">Vous êtes un administrateur</p>
    <p v-else>Vous êtes un utilisateur standard</p>
  </div>
</template>

<script>
import AuthService from '../services/AuthService';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const router = useRouter();
    const user = ref('');

    onMounted(() => {
      const userVar = JSON.parse(localStorage.getItem('user'));
      if (user && userVar.username) {
        user.value = userVar;
      }
    });

    const logout = () => {
      AuthService.logout();
      router.push('/login');
    };

    return { user, logout };
  }
};
</script>

<style scoped>
</style>
