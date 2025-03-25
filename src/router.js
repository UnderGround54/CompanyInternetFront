import { createRouter, createWebHistory } from 'vue-router';
import LoginView from './views/LoginView.vue';
import HomeView from './views/HomeView.vue';
import AuthService from './services/AuthService';
import ClientsVue from "./components/ClientsVue.vue";

const routes = [
    { path: '/login', component: LoginView },
    {
        path: '/home',
        component: HomeView,
        beforeEnter: (to, from, next) => {
            if (!AuthService.isAuthenticated()) {
                next('/login');
            } else {
                next();
            }
        }
    },
    { path: '/', redirect: '/login' },
    { path: '/clients/company/:companyId', component: ClientsVue, props: true },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
