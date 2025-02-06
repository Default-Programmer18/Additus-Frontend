import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function CustomInput({
    placeholder,
    value,
    onChangeText,
    secureTextEntry,
    keyboardType = 'default',
    maxLength,
    autoCapitalize = 'none',
}) {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                maxLength={maxLength}
                autoCapitalize={autoCapitalize}
                placeholderTextColor="#999"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    input: {
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#eee',
    },
}); 