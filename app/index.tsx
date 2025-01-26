import { Link, Redirect } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView>
        <Text className="text-9xl"> Hi </Text>
        <Link href={'/(auth)/signup'}><Text className="text-9xl"> Ka vai </Text></Link>
    </SafeAreaView>
  ); // Redirect to your signup screen
}