import { Text, TextInput, View } from "react-native";
import { Colors } from "../../../constants/Colors";

export default function Input({
  label,
  value,
  onChangeText,
  className = "",
  ...props
}) {
  return (
    <View className={`mb-4 ${className}`}>
      <Text className="text-sm text-gray-600 mb-1">{label}</Text>
      <TextInput
        className="bg-white p-4 rounded-lg border border-gray-200"
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
    </View>
  );
}