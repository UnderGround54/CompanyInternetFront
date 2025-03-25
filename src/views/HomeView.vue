<template>
  <div class="home-container">
    <h1>Bonjour</h1>
  </div>
</template>

<script>
import AuthService from '../services/AuthService';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    const logout = () => {
      AuthService.logout();
      router.push('/login');
    };

    return { logout };
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
