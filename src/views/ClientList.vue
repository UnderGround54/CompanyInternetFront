<template>
  <div class="container mt-4">
    <h2>Liste des clients</h2>
    <router-link to="/client" class="btn btn-primary mb-3">Ajouter un client</router-link>

    <table class="table">
      <thead>
      <tr>
        <th>Nom</th>
        <th>Email</th>
        <th>Age</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="client in clients" :key="client.id">
        <td>{{ client.firstName }} {{ client.lastName }}</td>
        <td>{{ client.email }}</td>
        <td>{{ client.age }}</td>
        <td>
          <router-link :to="`/client/${client.id}`" class="btn btn-warning btn-sm">Modifier</router-link>
          <button class="btn btn-danger btn-sm" @click="confirmDelete(client.id)">Supprimer</button>
        </td>
      </tr>
      </tbody>
    </table>

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
    await apiService.deleteClient(id);
    await fetchClients();
    await Swal.fire('Supprimé', 'Client a été supprimé.', 'success');
  }
};

onMounted(fetchClients);
</script>
