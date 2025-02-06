import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default function CustomButton({
    title,
    onPress,
    loading = false,
    variant = 'primary',
    disabled = false
}) {
    const buttonStyles = [
        styles.button,
        variant === 'secondary' && styles.buttonSecondary,
        disabled && styles.buttonDisabled
    ];

    const textStyles = [
        styles.text,
        variant === 'secondary' && styles.textSecondary
    ];

    return (
        <TouchableOpacity
            style={buttonStyles}
            onPress={onPress}
            disabled={loading || disabled}
        >
            {loading ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <Text style={textStyles}>{title}</Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007AFF',
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        marginVertical: 8,
    },
    buttonSecondary: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#007AFF',
    },
    buttonDisabled: {
        backgroundColor: '#cccccc',
    },
    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    textSecondary: {
        color: '#007AFF',
    },
}); 