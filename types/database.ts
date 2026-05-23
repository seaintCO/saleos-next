export interface Activity {
  id: string;
  client: string;
  activity: string;
  amount: number;
  rep: string;
  created_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: "admin" | "sales_rep" | "growth_operator";
}