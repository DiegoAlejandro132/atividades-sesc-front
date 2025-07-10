import axios from 'axios'

const api = axios.create({
    baseURL: process.env.URL_API,
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.response.use(
    response => response,
    error => {
        console.error('Erro na requisição:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);