import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import CustomInput from '../../components/shared/Input';
import CustomButton from '../../components/shared/Button';

export default function LoginScreen({ navigation }) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleContinue = async () => {
        if (!phoneNumber || phoneNumber.length < 10) {
            alert('Please enter a valid phone number');
            return;
        }

        setLoading(true);
        try {
            // Check if user exists
            const response = await api.post('/auth/check-phone', { phoneNumber });
            
            if (response.data.exists) {
                // User exists, navigate to password screen
                navigation.navigate('Password', { phoneNumber });
            } else {
                // New user, navigate to registration
                navigation.navigate('Register', { phoneNumber });
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Welcome to GymFinder</Text>
                <Text style={styles.subtitle}>Enter your phone number to continue</Text>
                
                <CustomInput
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                    maxLength={10}
                />

                <CustomButton
                    title="Continue"
                    onPress={handleContinue}
                    loading={loading}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        padding: 20,
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