<template>
  <nav class="navbar">
    <div class="navbar-left">
      <router-link to="/home" class="logo">Acceuill</router-link>
    </div>

    <div class="navbar-right">
      <div class="dropdown">
        <button @click="toggleCompanyDropdown" class="dropdown-btn dropdown-toggle">
          Company
        </button>
        <ul v-if="showCompanyDropdown" class="dropdown-menu">
          <li v-for="company in companies" :key="company.id" @click="goToClients(company.id)">
            {{ company.label }}
          </li>
        </ul>
      </div>
      <button @click="logout" class="logout-btn">Déconnexion</button>
    </div>
  </nav>
</template>

<script>
import { ref } from 'vue';
import axios from '../axios-interceptors'
import AuthService from '../services/AuthService';
import TokenService from '../services/TokenService';
import { useRouter } from 'vue-router';

export default {
  name: 'Navbar',
  setup() {
    const router = useRouter();
    const companies = ref([]);
    const showDropdown = ref(false);
    const showCompanyDropdown = ref(false);

    const fetchCompanies = async () => {
      try {
        const token = TokenService.getToken();

        const response = await axios.get('/api/companies', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.data && response.data.data.items) {
          companies.value = response.data.data.items.map(item => ({
            id: item.id,
            label: item.label,
          }));

        } else {
          console.error("Les données des entreprises sont invalides ou manquantes.");
          companies.value = [];
        }
      } catch (error) {
        console.error("Erreur lors du chargement des entreprises :", error);
        companies.value = [];
      }
    };

    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value;
    };

    const toggleCompanyDropdown = () => {
      showCompanyDropdown.value = !showCompanyDropdown.value;
      if (showCompanyDropdown.value && companies.value.length === 0) {
        fetchCompanies();
      }
    };

    const goToClients = (companyId) => {
      router.push(`/clients/company/${companyId}`);
    };

    const logout = () => {
      AuthService.logout();
      router.push('/login');
    };

    return {
      companies,
      showDropdown,
      showCompanyDropdown,
      toggleDropdown,
      toggleCompanyDropdown,
      goToClients,
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

.dropdown-btn, .btn {
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
  display: none;
}

.dropdown-menu a, .dropdown-menu li {
  padding: 5px 10px;
  cursor: pointer;
}

.dropdown-menu a:hover, .dropdown-menu li:hover {
  background: #ddd;
}

/* Afficher le dropdown quand la variable Vue est activée */
.dropdown .dropdown-menu {
  display: block;
}
</style>
