import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "../services/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="light" />

      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#0f172a",
          },
          headerTintColor: "#f1f5f9",
          contentStyle: {
            backgroundColor: "#0f172a",
          },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />

        <Stack.Screen name="(auth)" options={{ headerShown: false }} />

        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen
          name="detail/[id]"
          options={{
            title: "Item Detail",
          }}
        />
      </Stack>
    </AuthProvider>
  );
}
