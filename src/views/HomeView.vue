<template>
  <div class="container card">
    <h1>Bonjour, {{ userName }}</h1>
  </div>
</template>

<script>
import AuthService from '../services/AuthService';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const router = useRouter();
    const userName = ref('');

    onMounted(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.username) {
        userName.value = user.username;
      }
    });

    const logout = () => {
      AuthService.logout();
      router.push('/login');
    };

    return { userName, logout };
  }
};
</script>

<style scoped>
</style>
