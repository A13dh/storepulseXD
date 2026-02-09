
export enum UserRole {
  OWNER = 'OWNER',
  AFFILIATE = 'AFFILIATE'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  image: string;
  stock: number;
  category: string;
  commission: number;
}

export interface AnalyticsData {
  date: string;
  clicks: number;
  conversions: number;
  revenue: number;
}

export interface Affiliate {
  id: string;
  name: string;
  email: string;
  sales: number;
  revenueGenerated: number;
  commissionEarned: number;
  status: 'active' | 'pending' | 'inactive';
}
