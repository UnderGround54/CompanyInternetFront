<template>
  <div class="home-container">
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
.home-container {
  text-align: center;
  margin-top: 50px;
}
button {
  padding: 8px;
  background: #d9534f;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
