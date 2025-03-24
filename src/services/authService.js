import axios from "axios";
const API_URL = "/api/login";
export async function login(credentials) {
    try {
        const response = await axios.post(API_URL, credentials);
        const token = response.data.token;
        localStorage.setItem("jwt_token", token);
        return token;
    } catch (error) {
        throw error.response?.data?.message || "Login failed";
    }
}

export function logout() {
    localStorage.removeltem("jwt_token");
}

export function getToken() {
    return localStorage.getItem("jwt_token");
}
