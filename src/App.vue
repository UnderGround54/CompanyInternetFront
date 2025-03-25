<template>
  <div>
    <Navbar v-if="showNavbar" />
    <router-view />
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import Navbar from './components/Navbar.vue';
import { computed } from 'vue';

export default {
  components: { Navbar },
  setup() {
    const route = useRoute();
    const showNavbar = computed(() => route.path !== '/login');

    return { showNavbar };
  },
};
</script>
