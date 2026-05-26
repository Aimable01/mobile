import { useCallback, useEffect, useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
} from "react-native";

import { router } from "expo-router";

import Button from "../../components/Button";
import ErrorMessage from "../../components/ErrorMessage";

import { getAllItems } from "../../services/api";
import { Item } from "../../types";

export default function ListScreen() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchItems = async () => {
    try {
      setError("");

      const data = await getAllItems();

      setItems(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to fetch items",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchItems();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#38bdf8" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <ErrorMessage message={error} />

        <Button title="Retry" onPress={fetchItems} />
      </SafeAreaView>
    );
  }

  if (!items.length) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.emptyText}>No items found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#38bdf8"
          />
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => router.push(`/detail/${item.id}`)}
          >
            <Text style={styles.name}>{item.name}</Text>

            <Text style={styles.description}>{item.description}</Text>

            <Text style={styles.amount}>${item.amount}</Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f172a",
    padding: 24,
  },
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 16,
  },
  emptyText: {
    color: "#94a3b8",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  name: {
    color: "#f1f5f9",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  description: {
    color: "#94a3b8",
    marginBottom: 12,
  },
  amount: {
    color: "#38bdf8",
    fontSize: 18,
    fontWeight: "700",
  },
});
