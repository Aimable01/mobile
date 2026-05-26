import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Button from "../../components/Button";
import ErrorMessage from "../../components/ErrorMessage";

import { getAllItems } from "../../services/api";
import { useAuth } from "../../services/AuthContext";

export default function HomeScreen() {
  const { user, logout } = useAuth();

  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError("");

      const items = await getAllItems();

      setCount(items.length);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to load stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.heading}>Dashboard</Text>

        <Text style={styles.username}>Logged in as: {user?.username}</Text>

        <ErrorMessage message={error} />

        {loading ? (
          <ActivityIndicator size="large" color="#38bdf8" />
        ) : (
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Total Items</Text>

            <Text style={styles.cardValue}>{count}</Text>
          </View>
        )}

        <Button title="Logout" onPress={logout} variant="danger" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  container: {
    flex: 1,
    padding: 24,
  },
  heading: {
    color: "#f1f5f9",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },
  username: {
    color: "#94a3b8",
    marginBottom: 24,
    fontSize: 16,
  },
  card: {
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
  },
  cardLabel: {
    color: "#94a3b8",
    fontSize: 14,
    marginBottom: 8,
  },
  cardValue: {
    color: "#f1f5f9",
    fontSize: 40,
    fontWeight: "700",
  },
});
