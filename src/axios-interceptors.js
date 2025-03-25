import axios from 'axios';
import AuthService from './services/AuthService';

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return AuthService.handle401Error(error);
    }
);

export default axios;
