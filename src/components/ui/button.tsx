import { TouchableOpacity, Text } from "react-native";

export default function Button({
  title,
  onPress,
  color,
  className = "",
}) {
  return (
    <TouchableOpacity
      className={`p-4 rounded-lg items-center ${className}`}
      onPress={onPress}
      style={{ backgroundColor: color }}
    >
      <Text className="text-white font-bold text-base">{title}</Text>
    </TouchableOpacity>
  );
}