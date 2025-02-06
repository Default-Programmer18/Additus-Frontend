import { createContext, useState, useContext } from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (phoneNumber, password) => {
        try {
            const response = await api.post('/auth/login', {
                phoneNumber,
                password,
            });
            
            const { token, user: userData } = response.data;
            await AsyncStorage.setItem('authToken', token);
            setUser(userData);
            return true;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            const response = await api.post('/auth/register', userData);
            const { token, user: newUser } = response.data;
            await AsyncStorage.setItem('authToken', token);
            setUser(newUser);
            return true;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('authToken');
            setUser(null);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const checkAuth = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            if (token) {
                const response = await api.get('/auth/me');
                setUser(response.data);
            }
        } catch (error) {
            console.error('Auth check error:', error);
            await AsyncStorage.removeItem('authToken');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider 
            value={{
                user,
                loading,
                login,
                register,
                logout,
                checkAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext); 