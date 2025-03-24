import axios from 'axios';

const API_URL = '/api';

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default {
    login(credentials) {
        return axios.post(`${API_URL}/login`, credentials)
            .then((response) => {
                if (response.status === 200 && response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    return response.data;
                } else {
                    throw new Error('Invalid credentials or token not found');
                }
            })
            .catch((error) => {
                console.error('Login error:', error);
                throw error;
            });
    },
    logout() {
        localStorage.removeItem('token');
    },
    getToken() {
        return localStorage.getItem('token');
    },

    // Clients
    getClients(page = 1, limit = 10) {
        return axios.get(`${API_URL}/clients?page=${page}&limit=${limit}`);
    },
    getClient(id) {
        return axios.get(`${API_URL}/clients/${id}`);
    },
    createClient(data) {
        return axios.post(`${API_URL}/clients`, data);
    },
    updateClient(id, data) {
        return axios.put(`${API_URL}/clients/${id}`, data);
    },
    deleteClient(id) {
        return axios.delete(`${API_URL}/clients/${id}`);
    },

    // Companies
    getCompanies(page = 1, limit = 10) {
        return axios.get(`${API_URL}/companies?page=${page}&limit=${limit}`);
    },
    getCompany(id){
        return axios.get(`${API_URL}/companies/${id}`);
    }
};
