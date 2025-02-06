import * as Location from 'expo-location';

export const requestLocationPermission = async () => {
    try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            throw new Error('Location permission denied');
        }
        
        const location = await Location.getCurrentPositionAsync({});
        return location;
    } catch (error) {
        console.error('Error getting location:', error);
        throw error;
    }
}; 