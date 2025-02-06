import React, { useState } from 'react'
import { View, Text, TextInput, Button, Alert, Platform } from 'react-native';
import auth from '@react-native-firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
//import * as Location from "expo-location";
const Login =  () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
//   const [location, setLocation] = useState<Location.LocationObject | null>(null);
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);
 // const dispatch = useDispatch();

   // verification code (OTP - One-Time-Passcode)
   const [code, setCode] = useState('');

   // Handle login
   function onAuthStateChanged(user) {
     if (user) {
       // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
       // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
       // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
       // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
     }
   }
  // Request GPS locationr
//   const requestLocation = async () => {
//     const { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Permission Denied', 'Location permission is required to sign up.');
//       return;
//     }
//     const currentLocation = await Location.getCurrentPositionAsync({});
//     setLocation(currentLocation);
//     console.log(currentLocation)
//   };
  // Handle the button press
  const sendOtp = async () => {
    if (!phoneNumber) {
      Alert.alert('Error', 'Please enter a valid phone number.');
      return;
    }
    console.log(phoneNumber)
    

    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
      Alert.alert('Success', 'OTP has been sent to your phone.');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const verifyOtp = async () => {
    if (!code) {
      Alert.alert('Error', 'Please enter the OTP sent to your phone.');
      return;
    }

    try {
      await confirm.confirm(code);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={{ padding: 20 }} className="bg-slate-800 h-full flex-1  w-full justify-center">
      <Text>Name</Text>
      <TextInput
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <Text>Address</Text>
      <TextInput
        placeholder="Enter your address"
        value={address}
        onChangeText={setAddress}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <Text>Gender</Text>
      <TextInput
        placeholder="Enter your gender"
        value={gender}
        onChangeText={setGender}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <Text>Phone Number</Text>
      <TextInput
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

     {// <Button title="Turn on GPS" onPress={requestLocation} />
     }

      <Button title="Send OTP" onPress={sendOtp} />

      <Text>Enter OTP</Text>
      <TextInput
        placeholder="Enter OTP"
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad"
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />

      <Button title="Verify OTP and Sign Up" onPress={verifyOtp} />
      <View id="recaptcha-container" />
    </SafeAreaView>
  );
};


export default Login