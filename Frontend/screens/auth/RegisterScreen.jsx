import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import CustomInput from '../../components/shared/Input';
import CustomButton from '../../components/shared/Button';
import { requestLocationPermission } from '../../services/location';

export default function RegisterScreen({ route, navigation }) {
    const { phoneNumber } = route.params;
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        phoneNumber,
        password: '',
        confirmPassword: '',
        name: '',
        age: '',
        gender: '',
        address: '',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getLocation();
    }, []);

    const getLocation = async () => {
        try {
            const location = await requestLocationPermission();
            // Here you would typically use Google's Geocoding API to get the address
            // For now, we'll just store the coordinates
            setFormData(prev => ({
                ...prev,
                address: `${location.coords.latitude}, ${location.coords.longitude}`
            }));
        } catch (error) {
            console.error('Error getting location:', error);
        }
    };

    const handleRegister = async () => {
        if (!formData.password || !formData.name || !formData.age || !formData.gender) {
            alert('Please fill in all required fields');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            await register(formData);
            // Navigation will be handled by the AppNavigator when auth state changes
        } catch (error) {
            alert('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>Please fill in your details</Text>

                <CustomInput
                    placeholder="Full Name"
                    value={formData.name}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
                    autoCapitalize="words"
                />

                <CustomInput
                    placeholder="Password"
                    value={formData.password}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
                    secureTextEntry
                />

                <CustomInput
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, confirmPassword: text }))}
                    secureTextEntry
                />

                <CustomInput
                    placeholder="Age"
                    value={formData.age}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, age: text }))}
                    keyboardType="numeric"
                    maxLength={2}
                />

                <CustomInput
                    placeholder="Gender"
                    value={formData.gender}
                    onChangeText={(text) => setFormData(prev => ({ ...prev, gender: text }))}
                    autoCapitalize="words"
                />

                <CustomButton
                    title="Register"
                    onPress={handleRegister}
                    loading={loading}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        padding: 20,
        flexGrow: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
        textAlign: 'center',
    },
}); 