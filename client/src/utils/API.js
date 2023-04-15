import userEvent from "@testing-library/user-event";
import axios from "axios";
import { API_URL } from "config";

// axios.defaults.withCredentials=true;

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

    followUser: (friendId, userId) => {
        return axios.post(`${API_URL}/api/users/followers/${friendId}`, userId)
    },

    // Had to change the unfollowing route to a put/update because axios 'delete' method doesnt accept req.body as a second argument
    unfollowUser: (friendId, userId) => {
        // return axios.delete(`${API_URL}/api/users/followers/${friendId}`, userId)
        return axios.put(`${API_URL}/api/users/followers/${friendId}`, userId)
    },
    // Session Axios calls for sessionRoutes controller
    login: (userData) => {
        return axios.post(`${API_URL}/api/session/login`, userData);
    },
    logout: () => {
        return axios.post(`${API_URL}/api/session/logout`);
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

    likePost: (postId, userId) => {
        return axios.put(`${API_URL}/api/posts/${postId}/like`, userId);
    },

    unlikePost: (postId, userId) => {
        return axios.put(`${API_URL}/api/posts/${postId}/unlike`, userId);
    },

    deletePost: (postId) => {
    return axios.delete(`${API_URL}/api/posts/${postId}`);
    },

    updatePost: (postId, postData) => {
    return axios.put(`${API_URL}/api/posts/${postId}`, postData);
    },
} 

export default api;