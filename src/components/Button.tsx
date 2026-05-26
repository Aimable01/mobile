import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

interface Props {
  title: string;
  onPress: () => void;
  loading?: boolean;
  variant?: "primary" | "danger";
  disabled?: boolean;
}

export default function Button({
  title,
  onPress,
  loading = false,
  variant = "primary",
  disabled = false,
}: Props) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.button,
        variant === "primary" && styles.primaryButton,
        variant === "danger" && styles.dangerButton,
        isDisabled && styles.disabledButton,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#f1f5f9" />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButton: {
    backgroundColor: "#38bdf8",
  },
  dangerButton: {
    backgroundColor: "#ef4444",
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#f1f5f9",
    fontSize: 16,
    fontWeight: "600",
  },
});
