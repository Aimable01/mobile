import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import api from "../../../services/axios";

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Validation", "All fields are required");
      return;
    }
    try {
      const response = await api.get(`/users?username=${username}`);

      const user = response.data[0];

      if (user && user.password === password) {
        navigation.navigate("/");
      } else {
        Alert.alert("Error", "Invalid credentials");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login</Text>
      <View>
        <TextInput
          placeholder="Username"
          style={styles.input}
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button title="Login" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  text: {
    marginBottom: 15,
    fontSize: 18,
    textAlign: "center",
  },
});
