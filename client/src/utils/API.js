import userEvent from "@testing-library/user-event";
import axios from "axios";
import { API_URL } from "config";

const api = {
    // User Axios calls for userRoutes controller
    // Notice we are only asking for username and not password
    getUsers : () => {
        return axios.get(`${API_URL}/api/users`);
    },

    getUserById: (userId) => {
        return axios.get(`${API_URL}/api/users/${userId}`);
    },

    createUser : (data) => {
        return axios.post(`${API_URL}/api/users`, data)
    },
    
    deleteUser: (userId) => {
        return axios.delete(`${API_URL}/api/users/${userId}`);
    },

    updateUserInfo: (userId, userData) => {
        return axios.put(`${API_URL}/api/users/${userId}`, userData);
    },

    updateUserPassword: (userId, userData) => {
        return axios.put(`${API_URL}/api/password/${userId}`, userData);
    },

    //For some reason there is Session routes in the userRoutes controller
    // Made these just in case
    // login: (userData) => {
    //     return axios.post(`${API_URL}/api/users/login`, userData);
    // },
    // logout: () => {
    //     return axios.post(`${API_URL}/api/users/logout`);
    // },

    // getSession: () => {
    //     return axios.get(`${API_URL}/api/users/session`);
    // },

    // Session Axios calls for sessionRoutes controller
    login: (userData) => {
        return axios.post(`${API_URL}/api/login`, userData);
    },
    logout: () => {
        return axios.post(`${API_URL}/api/logout`);
    },

    getSession: () => {
        return axios.get(`${API_URL}/api/session`);
    },

    // Post Axios calls for all postController request (Post Request endpoints are unfinished in backend)
    getPosts: () => {
    return axios.get(`${API_URL}/api/posts`);
    },

    getPostById: (postId) => {
    return axios.get(`${API_URL}/api/posts/${postId}`);
    },

    createPost: (data) => {
    return axios.post(`${API_URL}/api/posts`, data);
    },

    deletePost: (postId) => {
    return axios.delete(`${API_URL}/api/posts/${postId}`);
    },

    updatePost: (postId, postData) => {
    return axios.put(`${API_URL}/api/posts/${postId}`, postData);
    },
} 

export default api;