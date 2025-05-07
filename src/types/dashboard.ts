export type RecentOrder = {
  id: string;
  customer: string;
  date: string;
  amount: number;
  status: string;
  items: string[];
};

export type TopSellingItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  soldCount: number;
  totalStock: number;
};

export type SalesData = {
  date: string;
  amount: number;
};