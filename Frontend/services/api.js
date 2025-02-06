import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { endpoints } from '../components/services/endpoints';

const api = axios.create({
    baseURL: endpoints.BASE_URL,
    timeout: 10000,
});

// Simpler interceptor configuration
api.interceptors.request.use(
    async (config) => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        } catch (error) {
            return Promise.reject(error);
        }
    },
    error => Promise.reject(error)
);

// Add response interceptor for error handling
api.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export default api; 