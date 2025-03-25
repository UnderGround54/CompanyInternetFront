import axios from 'axios';
import TokenService from './TokenService';
import {jwtDecode} from "jwt-decode";

const API_URL = '/api/login';

class AuthService {
    static async login(email, password) {
        try {
            const response = await axios.post(API_URL, { email, password });
            const token = response.data.token;

            TokenService.setToken(token);

            const decodedToken = jwtDecode(token);

            localStorage.setItem('user', JSON.stringify(decodedToken.username));

            return response.data;
        } catch (error) {
            let errorMessage = "Erreur d'authentification";
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }
            throw new Error(errorMessage);
        }
    }

    static logout() {
        TokenService.removeToken();
        localStorage.removeItem('user');
        localStorage.setItem('logout', Date.now());
        AuthService.redirectToLogin();
    }

    static isAuthenticated() {
        const token = TokenService.getToken();
        const user = localStorage.getItem('user');
        return token !== null && user !== null;
    }

    static redirectToLogin() {
        window.location.href = '/login';
    }

    static handle401Error(error) {
        if (error.response && error.response.status === 401) {
            AuthService.logout();
            AuthService.redirectToLogin();
        }
        return Promise.reject(error);
    }
}

export default AuthService;
