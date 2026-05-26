export interface User {
  id: number;
  username: string;
  password: string;
  createdAt?: string;
  name?: string;
  email?: string;
}

export interface Item {
  id: number;
  name: string;
  amount: number;
  description: string;
  createdAt?: string;
}

export interface CreateItemPayload {
  name: string;
  amount: number;
  description: string;
}
