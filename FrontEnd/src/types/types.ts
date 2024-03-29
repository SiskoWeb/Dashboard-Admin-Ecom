import { ReactNode } from "react";

export type UserType = {
  id?: number;
  userName: string;
  passowrd: string;
  error?: string | number;
};

export type LayoutProviderType = {
  children: ReactNode;
};

export type usersType = {
  id: number;
  email: string;
  isActive: number;
  role: string;
  message: string;
};

export type categoryType = {
  id: number;
  name: string;
  image: string;
};

export type productType = {
  id: number;
  name: string;
  image: string;
  category: string;
  quantity: number;
  min_quantity: number;
  price: number;
  price_off: number;
  description: string;
};
