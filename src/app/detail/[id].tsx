import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";

import Button from "../../components/Button";
import ErrorMessage from "../../components/ErrorMessage";

import { deleteItem, getItemById } from "../../services/api";

import { Item } from "../../types";

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const [item, setItem] = useState<Item | null>(null);

  const [loading, setLoading] = useState(true);

  const [deleteLoading, setDeleteLoading] = useState(false);

  const [error, setError] = useState("");

  const fetchItem = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getItemById(id);

      setItem(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to load item");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItem();
  }, [id]);

  const confirmDelete = () => {
    Alert.alert("Delete Item", "Are you sure you want to delete this item?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: handleDelete,
      },
    ]);
  };

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);

      await deleteItem(id);

      Alert.alert("Success", "Item deleted successfully");

      router.replace("/(tabs)");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Delete failed");
    } finally {
      setDeleteLoading(false);
    }
  };

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

        <Button title="Retry" onPress={fetchItem} />
      </SafeAreaView>
    );
  }

  if (!item) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.emptyText}>Item not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>

        <Text style={styles.value}>{item.name}</Text>

        <Text style={styles.label}>Amount</Text>

        <Text style={styles.value}>${item.amount}</Text>

        <Text style={styles.label}>Description</Text>

        <Text style={styles.value}>{item.description}</Text>

        <Text style={styles.label}>Created At</Text>

        <Text style={styles.value}>{item.createdAt}</Text>
      </View>

      <Button
        title="Delete Item"
        onPress={confirmDelete}
        variant="danger"
        loading={deleteLoading}
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
  },
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 24,
  },
  emptyText: {
    color: "#94a3b8",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#1e293b",
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
  },
  label: {
    color: "#94a3b8",
    fontSize: 14,
    marginBottom: 4,
    marginTop: 16,
  },
  value: {
    color: "#f1f5f9",
    fontSize: 18,
  },
});
