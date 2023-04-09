import axios from "axios";
import { API_URL } from "config";

const api = {
    getUsers : () => {
        return axios.get(`${API_URL}/api/users`);
    },

    getUserById: (userId) => {
        return axios.get(`${API_URL}/api/users/${userId}`);
    },

    createUser : (data) => {
        return axios.post(`${API_URL}/api/users`, data)
    }
} 

export default api