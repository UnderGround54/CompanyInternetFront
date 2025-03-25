<template>
  <div>
    <h2>Liste des Clients</h2>
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Nom</th>
        <th>Email</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="client in clients" :key="client.id">
        <td>{{ client.id }}</td>
        <td>{{ client.name }}</td>
        <td>{{ client.email }}</td>
        <td>
          <button @click="deleteClient(client.id)" class="btn-delete">Supprimer</button>
        </td>
      </tr>
      </tbody>
    </table>

    <Pagination :page="page" :totalPages="totalPages" @changePage="fetchClients" />
  </div>
</template>

<script setup>
  import { ref, watchEffect } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  import TokenService from '../services/TokenService';
  import Pagination from '../components/Pagination.vue';
  import Swal from 'sweetalert2';

  const route = useRoute();
  const clients = ref([]);
  const page = ref(1);
  const totalPages = ref(1);

  const fetchClients = async (newPage = 1) => {
    const companyId = route.params.companyId;
    if (!companyId) return;

    try {
      const response = await axios.get(`/api/clients/company/${companyId}`, {
        headers: { Authorization: `Bearer ${TokenService.getToken()}` },
        params: { page: newPage }
      });

      clients.value = response.data.data.items;
      page.value = response.data.data.page;
      totalPages.value = response.data.data.totalPages;
    } catch (error) {
      console.error("Erreur lors du chargement des clients :", error);
    }
  };

  const deleteClient = async (id) => {
    const confirmation = await Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Cette action est irréversible !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer !",
      cancelButtonText: "Annuler"
    });

    if (confirmation.isConfirmed) {
      try {
        await axios.delete(`/api/clients/${id}`, {
          headers: { Authorization: `Bearer ${TokenService.getToken()}` }
        });

        await Swal.fire("Supprimé !", "Le client a été supprimé avec succès.", "success");
        await fetchClients();
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        await Swal.fire("Erreur", "Impossible de supprimer le client.", "error");
      }
    }
  };

  watchEffect(() => {
    fetchClients();
  });
</script>

<style scoped>
.btn-delete {
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
}

.btn-delete:hover {
  background-color: darkred;
}
</style>
