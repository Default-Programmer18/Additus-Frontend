import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

//import axios from 'axios';
//import { BASE_URL } from '../config/apiConfig'; // Create this file for your API configuration
import dummyGyms from '../data/dummyGyms';
const GymCard = ({ gym }) => {
  return (
    <TouchableOpacity className="bg-white rounded-xl mb-4 overflow-hidden shadow-sm">
      <Image 
        source={{ uri: gym.image }} 
        className="w-full h-48"
      />
      <View className="p-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-lg font-bold text-gray-800">{gym.name}</Text>
          <TouchableOpacity className="p-1">
            <Ionicons name="ellipsis-vertical" size={20} color="#666" />
          </TouchableOpacity>
        </View>
        
        <View className="flex-row items-center mt-2">
          <Text className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-md mr-2">
            GYM
          </Text>
          <View className="flex-row items-center">
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text className="ml-1 text-sm text-gray-600">{gym.rating}</Text>
          </View>
        </View>

        <View className="flex-row items-center mt-2">
          <Ionicons name="location-outline" size={16} color="#666" />
          <Text className="ml-1 text-sm text-gray-600">{gym.address}</Text>
        </View>

        <View className="flex-row items-center mt-2">
          <Text className="text-base font-bold text-blue-600">$ {gym.pricePerDay}</Text>
          <Text className="text-sm text-gray-600 ml-1">/Day</Text>
          {gym.points && (
            <Text className="text-sm text-gray-600 ml-auto">+{gym.points} Points</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const NearbyGyms = () => {
  const [gyms, setGyms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNearbyGyms = async () => {
    try {
    //   const response = await axios.get(`${BASE_URL}/api/gyms/nearby`, {
    //     params: {
    //       latitude: 37.7749, // Replace with actual user location
    //       longitude: -122.4194, // Replace with actual user location
    //       radius: 10 // radius in kilometers
    //     },
    //     headers: {
    //       'Authorization': `Bearer ${YOUR_AUTH_TOKEN}` // If authentication is required
    //     }
    //   })
const response={status:200};

      if (response.status === 200) {
        //setGyms(response.data);
        setGyms(dummyGyms);
        setError(null);
      } else {
        setError('Failed to fetch gyms');
      }
    } catch (err) {
      console.error('Error fetching gyms:', err);
      setError(err.response?.data?.message || 'An error occurred while fetching gyms');
      Alert.alert(
        'Error',
        'Failed to fetch nearby gyms. Please try again later.',
        [{ text: 'OK' }]
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchNearbyGyms();
  }, []);

  useEffect(() => {
    fetchNearbyGyms();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0066cc" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-red-500 text-base text-center mb-4">{error}</Text>
        <TouchableOpacity 
          onPress={fetchNearbyGyms}
          className="bg-blue-500 px-6 py-3 rounded-full"
        >
          <Text className="text-white font-semibold">Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50 p-4">
      <Text className="text-xl font-bold mb-4 text-gray-800">Nearest Gyms</Text>
      <FlatList
        data={gyms}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <GymCard gym={item} />}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#0066cc']}
          />
        }
        ListEmptyComponent={() => (
          <View className="flex-1 justify-center items-center p-4">
            <Text className="text-gray-500 text-base text-center">
              No gyms found nearby
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default NearbyGyms; 