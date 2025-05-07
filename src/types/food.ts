export type FoodVariant = {
  id: string;
  name: string;
  price: number;
};

export type FoodTopping = {
  id: string;
  name: string;
  price: number;
};

export type FoodItem = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  status: string;
  variants: FoodVariant[];
  toppings: FoodTopping[];
};