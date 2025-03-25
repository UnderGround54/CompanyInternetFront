class TokenService {
    setToken(token) {
        localStorage.setItem('Authorization', token);
    }

    getToken() {
        return localStorage.getItem('Authorization');
    }

    removeToken() {
        localStorage.removeItem('Authorization');
    }
}

export default new TokenService();
