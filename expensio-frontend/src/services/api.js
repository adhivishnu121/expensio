import axios from "axios";

// Use environment variable for backend URL
const API_URL = process.env.REACT_APP_BACKEND_URL + "/api/users";

export const registerUser = (user) => {
    return axios.post(`${API_URL}/register`, user);
};

export const loginUser = (loginData) => {
    return axios.post(`${API_URL}/login`, loginData);
};
