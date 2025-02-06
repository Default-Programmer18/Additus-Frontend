import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { requestLocationPermission } from '../services/location';
import { useAuth } from '../context/AuthContext';

export default function SplashScreen() {
    const { checkAuth } = useAuth();

    useEffect(() => {
        initializeApp();
    }, []);

    const initializeApp = async () => {
        try {
            // Request location permission
            await requestLocationPermission();
            // Check authentication status
            await checkAuth();
        } catch (error) {
            console.error('Initialization error:', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>GymFinder</Text>
                <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    loader: {
        marginTop: 20,
    },
}); 