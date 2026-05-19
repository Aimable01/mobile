import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function LoginPage() {
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <View>
        <TextInput placeholder="Username" style={styles.input} />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
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
});
