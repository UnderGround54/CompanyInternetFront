<template>
  <div class="modal fade show" tabindex="-1" style="display: block; background-color: rgba(0, 0, 0, 0.5);">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ clientData ? "Modifier le client" : "Ajouter un client" }}</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveClient">
            <div class="mb-3">
              <label class="form-label">Nom :</label>
              <input v-model="client.name" type="text" class="form-control" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Email :</label>
              <input v-model="client.email" type="email" class="form-control" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Mot de passe :</label>
              <input v-model="client.password" type="password" class="form-control" :placeholder="clientData ? 'Laisser vide pour ne pas modifier' : ''" />
            </div>
            <div class="mb-3">
              <label class="form-label">Company ID :</label>
              <input v-model="client.companyId" type="number" class="form-control" required />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="$emit('close')">Annuler</button>
              <button type="submit" class="btn btn-primary">{{ clientData ? "Modifier" : "Créer" }}</button>
            </div>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect, defineProps, defineEmits } from 'vue';
import axios from 'axios';
import TokenService from '../services/TokenService';
import Swal from 'sweetalert2';

const props = defineProps({
  clientData: Object
});

const emit = defineEmits(['close', 'refresh']);

const client = ref({
  name: '',
  email: '',
  password: '',
  companyId: null
});

watchEffect(() => {
  if (props.clientData) {
    client.value = {
      name: props.clientData.name,
      email: props.clientData.email,
      password: '',
      companyId: props.clientData.companyId
    };
  }
});

const saveClient = async () => {
  try {
    if (props.clientData) {
      await axios.put(`/api/clients/${props.clientData.id}`, client.value, {
        headers: { Authorization: `Bearer ${TokenService.getToken()}` }
      });
      await Swal.fire("Succès", "Client modifié avec succès", "success");
    } else {
      await axios.post('/api/clients', client.value, {
        headers: { Authorization: `Bearer ${TokenService.getToken()}` }
      });
      await Swal.fire("Succès", "Client créé avec succès", "success");
    }
    emit('refresh');
    emit('close');
  } catch (error) {
    console.error("Erreur :", error);
    await Swal.fire("Erreur", "Une erreur est survenue", "error");
  }
};
</script>
