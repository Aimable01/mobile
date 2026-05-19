export interface Expense {
  id?: string;
  title?: string;
  name: string;
  amount: number;
  description: string;
  category?: string;
  date?: string;
  userId?: string;
}
