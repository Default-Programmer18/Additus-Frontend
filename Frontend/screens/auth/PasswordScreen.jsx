import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import CustomInput from '../../components/shared/Input';
import CustomButton from '../../components/shared/Button';

export default function PasswordScreen({ route }) {
    const { phoneNumber } = route.params;
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleLogin = async () => {
        if (!password) {
            alert('Please enter your password');
            return;
        }

        setLoading(true);
        try {
            await login(phoneNumber, password);
            // Navigation will be handled by the AppNavigator when auth state changes
        } catch (error) {
            alert('Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Enter Password</Text>
                <Text style={styles.subtitle}>Please enter your password to continue</Text>

                <CustomInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <CustomButton
                    title="Login"
                    onPress={handleLogin}
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