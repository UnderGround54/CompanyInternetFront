<template>
  <div class="container mt-4">
    <h2>Bonjour, voici vos clients</h2>
    <router-link to="/clients" class="btn btn-primary mb-3">Ajouter un client</router-link>

    <table class="table" v-if="clients.length > 0">
      <thead>
      <tr>
        <th>Nom</th>
        <th>Email</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="client in clients" :key="client.id">
        <td>{{ client.name }}</td>
        <td>{{ client.email }}</td>
        <td>
          <router-link :to="`/client/${client.id}`" class="btn btn-warning btn-sm">Modifier</router-link>
          <button class="btn btn-danger btn-sm" @click="confirmDelete(client.id)">Supprimer</button>
        </td>
      </tr>
      </tbody>
    </table>
    <p v-else>Aucun client trouvé.</p>

    <Pagination :page="page" :totalPages="totalPages" @changePage="fetchClients" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';
import Pagination from "../components/Pagination.vue";
import apiService from "../services/apiService.js";

const clients = ref([]);
const page = ref(1);
const totalPages = ref(1);

const fetchClients = async (newPage = 1) => {
  try {
    page.value = newPage;
    const response = await apiService.getClients(page.value);
    console.log(response.data.data.items)
    clients.value = response.data.data.items;
    totalPages.value = response.data.data.totalPages;
  } catch (error) {
    await Swal.fire('Erreur', 'Impossible de charger les clients', 'error');
  }
};

const confirmDelete = async (id) => {
  const result = await Swal.fire({
    title: 'Supprimer cet client ?',
    showCancelButton: true,
    confirmButtonText: 'Oui',
  });
  if (result.isConfirmed) {
    try {
      await apiService.deleteClient(id);
      await fetchClients();
      await Swal.fire('Supprimé', 'Client a été supprimé.', 'success');
    } catch (error) {
      await Swal.fire('Erreur', 'Impossible de supprimer le client', 'error');
    }
  }
};

onMounted(fetchClients);
</script>
