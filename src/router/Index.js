import { createRouter, createWebHistory } from 'vue-router';
import ClientList from "../views/ClientList.vue";
import ClientForm from "../views/ClientForm.vue";

const routes = [
    { path: '/', component: ClientList },
    { path: '/client/:id?', component: ClientForm, props: true }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
