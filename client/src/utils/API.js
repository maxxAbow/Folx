import axios from "axios";
import { API_URL } from "config";

const api = {
    getUsers : () => {
        return axios.get(`${API_URL}/api/users`);
    },

    getUserById: (userId) => {
        return axios.get(`${API_URL}/api/:${userId}`);
    }

} 

export default api