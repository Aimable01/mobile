import { StyleSheet, Text, View } from "react-native";

interface Props {
  message: string;
}

export default function ErrorMessage({ message }: Props) {
  if (!message) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(239, 68, 68, 0.2)",
    borderWidth: 1,
    borderColor: "#ef4444",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  text: {
    color: "#fecaca",
    fontSize: 14,
  },
});
