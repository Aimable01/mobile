import { useState } from "react";

import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { router } from "expo-router";

import Button from "../../components/Button";
import ErrorMessage from "../../components/ErrorMessage";
import Input from "../../components/Input";
import { useAuth } from "../../services/AuthContext";

export default function LoginScreen() {
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!username.includes("@")) {
      newErrors.username = "Enter a valid email";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    setApiError("");

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);

      await login(username, password);

      router.replace("/(tabs)");
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Welcome Back</Text>

          <Text style={styles.subtitle}>Login to continue</Text>

          <ErrorMessage message={apiError} />

          <Input
            label="Email"
            value={username}
            onChangeText={setUsername}
            placeholder="john@example.com"
            keyboardType="email-address"
            error={errors.username}
          />

          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            secureTextEntry
            error={errors.password}
          />

          <Button title="Login" onPress={handleLogin} loading={loading} />

          <View style={styles.demoContainer}>
            <Text style={styles.demoText}>Demo password: password123</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    color: "#f1f5f9",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    color: "#94a3b8",
    fontSize: 16,
    marginBottom: 32,
  },
  demoContainer: {
    marginTop: 16,
  },
  demoText: {
    color: "#94a3b8",
    fontSize: 14,
  },
});
