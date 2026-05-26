import axios, { AxiosError } from "axios";
import { CreateItemPayload, Item, User } from "../types";

const BASE_URL = "https://jsonplaceholder.typicode.com";

// the user email address: Sincere@april.biz

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>;

    if (axiosError.response?.data?.message) {
      return axiosError.response.data.message;
    }

    if (axiosError.message) {
      return axiosError.message;
    }
  }

  console.log("an error happened: ", error);

  return "Something went wrong. Please try again.";
};

export const loginUser = async (
  username: string,
  password: string,
): Promise<User> => {
  try {
    const response = await api.get<User[]>("/users", {
      params: {
        email: username,
      },
    });

    const users = response.data;

    if (!users.length) {
      throw new Error("User not found");
    }

    const user = users[0];

    /**
     * JSONPlaceholder has no password field.
     * This simulates password validation.
     */
    if (password !== "password123") {
      throw new Error("Invalid password");
    }

    return {
      ...user,
      password,
      username: user.email || username,
    };
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const getAllItems = async (): Promise<Item[]> => {
  try {
    const response = await api.get("/posts");

    const items: Item[] = response.data.map(
      (post: { id: number; title: string; body: string }) => ({
        id: post.id,
        name: post.title,
        amount: Math.floor(Math.random() * 1000),
        description: post.body,
        createdAt: new Date().toISOString(),
      }),
    );

    return items;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const getItemById = async (id: string): Promise<Item> => {
  try {
    const response = await api.get(`/posts/${id}`);

    const post = response.data;

    return {
      id: post.id,
      name: post.title,
      amount: Math.floor(Math.random() * 1000),
      description: post.body,
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const createItem = async (payload: CreateItemPayload): Promise<Item> => {
  try {
    const response = await api.post("/posts", {
      title: payload.name,
      body: payload.description,
      amount: payload.amount,
    });

    return {
      id: response.data.id,
      name: payload.name,
      amount: payload.amount,
      description: payload.description,
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const deleteItem = async (id: string): Promise<void> => {
  try {
    await api.delete(`/posts/${id}`);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export default api;
