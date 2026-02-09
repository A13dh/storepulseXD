
import { Product, Affiliate, AnalyticsData } from './types';

export const CURRENCY_SYMBOL = "DT";
export const CURRENCY_ARABIC = "د.ت";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Bespoke Chronograph Watch',
    price: 240.00,
    currency: 'DT',
    image: 'https://picsum.photos/seed/watch/400/500',
    stock: 24,
    category: 'Accessories',
    commission: 36.00
  },
  {
    id: 'p2',
    name: 'Organic Valencia Oranges (Box)',
    price: 24.99,
    currency: 'DT',
    image: 'https://picsum.photos/seed/orange/400/500',
    stock: 150,
    category: 'Groceries',
    commission: 3.75
  },
  {
    id: 'p3',
    name: 'Studio Sound 01 Headphones',
    price: 350.00,
    currency: 'DT',
    image: 'https://picsum.photos/seed/headphones/400/500',
    stock: 12,
    category: 'Electronics',
    commission: 52.50
  }
];

export const MOCK_AFFILIATES: Affiliate[] = [
  { id: 'a1', name: 'Sarah Jenkins', email: 'sarah@influence.tn', sales: 142, revenueGenerated: 8240, commissionEarned: 1236, status: 'active' },
  { id: 'a2', name: 'Moez Gharbi', email: 'moez.g@marketing.tn', sales: 89, revenueGenerated: 5110, commissionEarned: 766, status: 'active' },
  { id: 'a3', name: 'Amira Ben Ali', email: 'amira@blog.tn', sales: 0, revenueGenerated: 0, commissionEarned: 0, status: 'pending' }
];

export const MOCK_ANALYTICS: AnalyticsData[] = [
  { date: 'Mon', clicks: 120, conversions: 12, revenue: 1200 },
  { date: 'Tue', clicks: 150, conversions: 15, revenue: 1500 },
  { date: 'Wed', clicks: 200, conversions: 24, revenue: 2400 },
  { date: 'Thu', clicks: 180, conversions: 20, revenue: 2000 },
  { date: 'Fri', clicks: 220, conversions: 32, revenue: 3200 },
  { date: 'Sat', clicks: 250, conversions: 28, revenue: 2800 },
  { date: 'Sun', clicks: 190, conversions: 14, revenue: 1400 }
];
