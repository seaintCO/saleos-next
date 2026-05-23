export interface Activity {
  id: string;
  client: string;
  activity: string;
  amount: number;
  rep: string;
  created_at: string;
}

export interface Rep {
  id: string;
  name: string;
  role: string;
  revenue: number;
}