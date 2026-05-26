import { useState } from "react";

import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Button from "../../components/Button";
import ErrorMessage from "../../components/ErrorMessage";
import Input from "../../components/Input";

import { createItem } from "../../services/api";

export default function CreateScreen() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!amount.trim()) {
      newErrors.amount = "Amount is required";
    }

    if (Number.isNaN(Number(amount))) {
      newErrors.amount = "Amount must be a number";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
    }

    if (description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setName("");
    setAmount("");
    setDescription("");
    setErrors({});
  };

  const handleSubmit = async () => {
    setApiError("");

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);

      await createItem({
        name,
        amount: Number(amount),
        description,
      });

      Alert.alert("Success", "Item created successfully");

      resetForm();
    } catch (error) {
      setApiError(
        error instanceof Error ? error.message : "Failed to create item",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Create Item</Text>

        <ErrorMessage message={apiError} />

        <Input
          label="Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter item name"
          error={errors.name}
        />

        <Input
          label="Amount"
          value={amount}
          onChangeText={setAmount}
          placeholder="Enter amount"
          keyboardType="numeric"
          error={errors.amount}
        />

        <Input
          label="Description"
          value={description}
          onChangeText={setDescription}
          placeholder="Enter description"
          error={errors.description}
        />

        <Button title="Create Item" onPress={handleSubmit} loading={loading} />

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>All fields are required</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  container: {
    padding: 24,
  },
  title: {
    color: "#f1f5f9",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 24,
  },
  infoBox: {
    marginTop: 16,
  },
  infoText: {
    color: "#94a3b8",
  },
});
