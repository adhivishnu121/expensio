import axios from "axios";

// Must be your Railway backend URL
const API_URL = "https://expensio-production.up.railway.app/api/users";

export const registerUser = (user) => {
    return axios.post(`${API_URL}/register`, user);
};

export const loginUser = (loginData) => {
    return axios.post(`${API_URL}/login`, loginData);
};
