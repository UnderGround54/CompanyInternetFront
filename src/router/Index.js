// src/router/Index.js
import { createRouter, createWebHistory } from 'vue-router';
import ClientList from '../views/ClientList.vue';
import ClientForm from '../views/ClientForm.vue';
import Login from '../views/Login.vue';
import apiService from '../services/apiService.js';

const routes = [
    { path: '/login', component: Login },
    { path: '/clients', component: ClientList, meta: { requiresAuth: true } },
    { path: '/clients/:id?', component: ClientForm, props: true, meta: { requiresAuth: true } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !apiService.getToken()) {
        next('/login');
    } else {
        next();
    }
});

export default router;
