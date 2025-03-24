import axios from 'axios';

const API_URL = '/api/clients';

export default {
    getClients(page = 1, limit = 10) {
        return axios.get(`${API_URL}?page=${page}&limit=${limit}`)
    },
    getClient(id) {
        return axios.get(`${API_URL}/${id}`);
    },
    createClient(data) {
        return axios.post(API_URL, data);
    },
    updateClient(id, data) {
        return axios.put(`${API_URL}/${id}`, data);
    },
    deleteClient(id) {
        return axios.delete(`${API_URL}/${id}`);
    }
};
