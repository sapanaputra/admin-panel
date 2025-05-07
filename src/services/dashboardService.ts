import { RecentOrder, TopSellingItem, SalesData } from '../types/dashboard';

// In a real app, these would be API calls to a backend
export const getRecentOrders = async (): Promise<RecentOrder[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  return [
    {
      id: 'ORD-1234',
      customer: 'John Doe',
      date: '2025-04-10',
      amount: 32.50,
      status: 'Completed',
      items: ['Cheeseburger', 'French Fries', 'Coke']
    },
    {
      id: 'ORD-1235',
      customer: 'Jane Smith',
      date: '2025-04-10',
      amount: 45.20,
      status: 'Processing',
      items: ['Pepperoni Pizza', 'Garlic Bread', 'Sprite']
    },
    {
      id: 'ORD-1236',
      customer: 'Bob Johnson',
      date: '2025-04-09',
      amount: 28.75,
      status: 'Completed',
      items: ['Caesar Salad', 'Iced Tea']
    },
    {
      id: 'ORD-1237',
      customer: 'Alice Williams',
      date: '2025-04-09',
      amount: 52.30,
      status: 'Processing',
      items: ['Sushi Platter', 'Miso Soup', 'Green Tea']
    },
    {
      id: 'ORD-1238',
      customer: 'Charlie Brown',
      date: '2025-04-08',
      amount: 18.90,
      status: 'Cancelled',
      items: ['Chicken Sandwich', 'Onion Rings']
    }
  ];
};

export const getTopSellingItems = async (): Promise<TopSellingItem[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  return [
    {
      id: 'FOOD-1',
      name: 'Cheeseburger Deluxe',
      image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=100',
      price: 12.99,
      soldCount: 245,
      totalStock: 300
    },
    {
      id: 'FOOD-2',
      name: 'Pepperoni Pizza',
      image: 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=100',
      price: 15.99,
      soldCount: 198,
      totalStock: 250
    },
    {
      id: 'FOOD-3',
      name: 'Chicken Caesar Salad',
      image: 'https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?auto=compress&cs=tinysrgb&w=100',
      price: 10.50,
      soldCount: 152,
      totalStock: 200
    },
    {
      id: 'FOOD-4',
      name: 'French Fries',
      image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=100',
      price: 4.99,
      soldCount: 320,
      totalStock: 400
    }
  ];
};

export const getSalesData = async (): Promise<SalesData[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  return [
    { date: '2025-04-04', amount: 1250 },
    { date: '2025-04-05', amount: 1420 },
    { date: '2025-04-06', amount: 1680 },
    { date: '2025-04-07', amount: 1475 },
    { date: '2025-04-08', amount: 1590 },
    { date: '2025-04-09', amount: 1780 },
    { date: '2025-04-10', amount: 1850 }
  ];
};