import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/shared/Button';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen() {
    const { user, logout } = useAuth();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Profile</Text>
                {user && (
                    <>
                        <Text style={styles.info}>Name: {user.name}</Text>
                        <Text style={styles.info}>Phone: {user.phoneNumber}</Text>
                    </>
                )}
                <CustomButton 
                    title="Logout" 
                    onPress={logout}
                    variant="secondary"
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
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    info: {
        fontSize: 16,
        marginBottom: 10,
    },
}); 