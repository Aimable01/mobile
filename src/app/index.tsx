import { Redirect } from "expo-router";
import { useAuth } from "../services/AuthContext";

export default function IndexScreen() {
  const { user } = useAuth();

  if (user) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/(auth)/login" />;
}
w;
