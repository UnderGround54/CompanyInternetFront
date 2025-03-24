<template>
  <nav>
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: page <= 1 }">
        <button class="page-link" @click="$emit('changePage', page - 1)">Précédent</button>
      </li>
      <li class="page-item" v-for="p in totalPages" :key="p" :class="{ active: p === page }">
        <button class="page-link" @click="$emit('changePage', p)">{{ p }}</button>
      </li>
      <li class="page-item" :class="{ disabled: page >= totalPages }">
        <button class="page-link" @click="$emit('changePage', page + 1)">Suivant</button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
defineProps(['page', 'totalPages']);
</script>
