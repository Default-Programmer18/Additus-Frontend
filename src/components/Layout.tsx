import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../constants/Colors";

export default function Layout({
  children,
  title = "Gym App",
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <SafeAreaView className="flex-1 bg-slate-800">
      <LinearGradient
        colors={[Colors.primary, Colors.secondary]}
        className="h-32 justify-center px-6"
      >
        <Text className="text-3xl text-blue-400 font-bold">{title}</Text>
      </LinearGradient>
      
      <ScrollView
        className="flex-1 p-6"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}