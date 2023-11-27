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
  isActive: number | boolean;
  role:string
};
