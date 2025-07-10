import axios from 'axios';

// Adicionar conversao para evitar conflito entre snake case do banco de dados e camel case do front
// Funções de conversão
function snakeToCamel(obj) {
    if (Array.isArray(obj)) {
        return obj.map(snakeToCamel);
    } else if (obj !== null && typeof obj === 'object') {
        return Object.fromEntries(
            Object.entries(obj).map(([key, val]) => [
                key.replace(/(_\w)/g, k => k[1].toUpperCase()),
                snakeToCamel(val)
            ])
        );
    }
    return obj;
}

function camelToSnake(obj) {
    if (Array.isArray(obj)) {
        return obj.map(camelToSnake);
    } else if (obj !== null && typeof obj === 'object') {
        return Object.fromEntries(
            Object.entries(obj).map(([key, val]) => [
                key.replace(/([A-Z])/g, "_$1").toLowerCase(),
                camelToSnake(val)
            ])
        );
    }
    return obj;
}

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL_API,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor de requisição: envia camelCase → snake_case
// api.interceptors.request.use(config => {
//     if (config.data) {
//         config.data = camelToSnake(config.data);
//     }
//     return config;
// }, error => Promise.reject(error));

// Interceptor de resposta: recebe snake_case → camelCase
api.interceptors.response.use(response => {
    if (response.data) {
        response.data = snakeToCamel(response.data);
    }
    return response;
}, error => Promise.reject(error));

export default api;
