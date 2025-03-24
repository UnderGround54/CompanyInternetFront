<template>
  <div class="container mt-4">
    <h2>{{ id ? 'Modifier' : 'Ajouter' }} un Client</h2>
    <form @submit.prevent="saveClient">
      <div class="mb-3">
        <label class="form-label">Prénom</label>
        <input type="text" class="form-control" v-model="client.firstName" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Nom</label>
        <input type="text" class="form-control" v-model="client.lastName" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input type="email" class="form-control" v-model="client.email" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Age</label>
        <input type="number" class="form-control" v-model="client.age" required />
      </div>
      <button type="submit" class="btn btn-success">{{ id ? 'Modifier' : 'Ajouter' }}</button>
      <router-link to="/" class="btn btn-secondary">Annuler</router-link>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import apiService from "../services/apiService.js";

const route = useRoute();
const router = useRouter();
const id = route.params.id;
const client = ref({ firstName: '', lastName: '', email: '', age:'' });

const fetchClient = async () => {
  if (id) {
    const response = await apiService.getClient(id);
    client.value = response.data.data;
  }
};

const saveClient = async () => {
  try {
    if (id) {
      await apiService.updateClient(id, client.value);
    } else {
      await apiService.createClient(client.value);
    }
    await Swal.fire('Succès', 'Étudiant enregistré avec succès', 'success');
    await router.push('/');
  } catch (error) {
    await Swal.fire('Erreur', 'Impossible d\'enregistrer l\'étudiant', 'error');
  }
};

onMounted(fetchClient);
</script>
