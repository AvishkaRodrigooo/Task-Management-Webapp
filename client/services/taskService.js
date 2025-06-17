import axios from 'axios';
const API = axios.create({ baseURL: '/api/tasks' });
export const getTasks = token => API.get('/', { headers: { Authorization: `Bearer ${token}` } });
export const createTask = (task, token) => API.post('/', task, { headers: { Authorization: `Bearer ${token}` } });