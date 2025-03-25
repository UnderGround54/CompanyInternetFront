import axios from 'axios';
import TokenService from './TokenService';

const API_URL = '/api/login';

class AuthService {
    async login(email, password) {
        try {
            const response = await axios.post(API_URL, { email, password });
            const token = response.data.token;

            TokenService.setToken(token);

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "Erreur d'authentification");
        }
    }

    logout() {
        TokenService.removeToken();
        localStorage.removeItem('user');
    }

    isAuthenticated() {
        return TokenService.getToken() !== null;
    }
}

export default new AuthService();
