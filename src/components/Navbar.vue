<template>
  <nav class="navbar">
    <div class="navbar-left">
      <router-link to="/" class="logo">MonApp</router-link>
    </div>

    <div class="navbar-right">
      <div class="dropdown">
        <button @click="toggleDropdown" class="dropdown-btn">
          Entreprises
        </button>
        <ul v-if="showDropdown" class="dropdown-menu">
          <li v-for="company in companies" :key="company.id">
            {{ company.label }}
          </li>
        </ul>
      </div>

      <button @click="logout" class="logout-btn">Déconnexion</button>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import AuthService from '../services/AuthService';
import TokenService from '../services/TokenService';
import { useRouter } from 'vue-router';

export default {
  name: 'Navbar',
  setup() {
    const router = useRouter();
    const companies = ref([]);
    const showDropdown = ref(false);

    const fetchCompanies = async () => {
      try {
        const token = TokenService.getToken();
        console.log("Token utilisé :", token);

        const response = await axios.get('/api/companies/1', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Réponse API :", response.data);
        companies.value = response.data.data.items;
      } catch (error) {
        console.error("Erreur lors du chargement des entreprises :", error);
      }
    };


    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value;
      if (showDropdown.value) {
        fetchCompanies();
      }
    };

    const logout = () => {
      AuthService.logout();
      router.push('/login');
    };

    return {
      companies,
      showDropdown,
      toggleDropdown,
      logout,
    };
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #333;
  color: white;
}

.logo {
  font-size: 20px;
  text-decoration: none;
  color: white;
}

.navbar-right {
  display: flex;
  align-items: center;
}

.dropdown {
  position: relative;
  margin-right: 20px;
}

.dropdown-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  color: black;
  list-style: none;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.dropdown-menu li {
  padding: 5px 10px;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background: #ddd;
}

.logout-btn {
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
