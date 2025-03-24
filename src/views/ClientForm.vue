<template>
  <div class="container mt-4">
    <h2>{{ id ? 'Modifier' : 'Ajouter' }} un Client</h2>
    <form @submit.prevent="saveClient">
      <div class="mb-3">
        <label class="form-label">Nom</label>
        <input type="text" class="form-control" v-model="client.name" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input type="email" class="form-control" v-model="client.email" required />
      </div>
      <button type="submit" class="btn btn-success">{{ id ? 'Modifier' : 'Ajouter' }}</button>
      <router-link to="/clients" class="btn btn-secondary">Annuler</router-link>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import apiService from '../services/apiService.js';
import Swal from 'sweetalert2';

const router = useRouter();
const route = useRoute();

const form = ref({
  id: null,
  name: '',
  email: '',
});

const saveClient = async () => {
  try {
    if (form.value.id) {
      await apiService.updateClient(form.value.id, form.value);
      await Swal.fire('Succès', 'Client mis à jour.', 'success');
    } else {
      await apiService.createClient(form.value);
      await Swal.fire('Succès', 'Client créé.', 'success');
    }
    await router.push('/clients');
  } catch (error) {
    await Swal.fire('Erreur', 'Impossible de sauvegarder le client.', 'error');
  }
};

onMounted(async () => {
  if (route.params.id) {
    try {
      const response = await apiService.getClient(route.params.id);
      form.value = response.data.data;
    } catch (error) {
      await Swal.fire('Erreur', 'Impossible de charger les détails du client.', 'error');
    }
  }
});
</script>
