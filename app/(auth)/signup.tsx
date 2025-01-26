import { useState, useRef } from "react";
import { View, Text, Alert } from "react-native";
import { useDispatch } from "react-redux";
import {  PhoneAuthProvider,signInWithCredential } from "firebase/auth";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import * as Location from "expo-location";
import { auth, phoneProvider } from "../../src/firebase/config";
import { setUser, setLoading, setError } from "../../src/slices/userSlice";
import Layout from "../../src/components/Layout";
import Input from "../../src/components/ui/input";
import Button from "../../src/components/ui/button";
import { Colors } from "../../constants/Colors";

export default function SignupScreen() {
    const dispatch = useDispatch();
    const [phone, setPhone] = useState("+1");
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("");
    const [verificationId, setVerificationId] = useState("");
    const recaptchaVerifier = useRef(null);
  
    const requestLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Location permission required");
        return null;
      }
      return await Location.getCurrentPositionAsync({});
    };
  
    const handleSendOTP = async () => {
      try {
        dispatch(setLoading(true));
        const verificationId = await phoneProvider.verifyPhoneNumber(
          phone,
          recaptchaVerifier.current!
        );
        setVerificationId(verificationId);
        Alert.alert("OTP sent successfully");
      } catch (err) {
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    };
  
    const handleVerifyOTP = async () => {
      try {
        dispatch(setLoading(true));
        const credential = PhoneAuthProvider.credential(verificationId, code);
        await signInWithCredential(auth,credential);
        
        const location = await requestLocation();
        if (!location) return;
  
        const userData = {
          phone,
          name,
          address,
          gender,
          location: {
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          },
        };
  
        dispatch(setUser(userData));
        // Add your backend API call here
        Alert.alert("Signup successful!");
      } catch (err) {
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    };
  
    return (
      <Layout title="Get Started">
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={auth.app.options}
        />
  
        <Input
          label="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
  
        <Button
          title="Send OTP"
          onPress={handleSendOTP}
          color={Colors.primary}
          className="mt-4"
        />
  
        <Input
          label="OTP Code"
          value={code}
          onChangeText={setCode}
          keyboardType="number-pad"
          className="mt-6"
        />
  
        <Input
          label="Full Name"
          value={name}
          onChangeText={setName}
          className="mt-4"
        />
  
        <Input
          label="Address"
          value={address}
          onChangeText={setAddress}
          className="mt-4"
        />
  
        <Input
          label="Gender"
          value={gender}
          onChangeText={setGender}
          className="mt-4"
        />
  
        <Button
          title="Complete Signup"
          onPress={handleVerifyOTP}
          color={Colors.secondary}
          className="mt-8"
        />
      </Layout>
    );
  }