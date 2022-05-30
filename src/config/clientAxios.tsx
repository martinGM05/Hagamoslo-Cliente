import axios from "axios";

const clienteAxios = axios.create({
    baseURL: 'https://hagamoslo.azurewebsites.net/api',
    // baseURL: 'http://localhost:8000/api/'
})

export default clienteAxios;