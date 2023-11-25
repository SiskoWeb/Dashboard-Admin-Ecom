import { ReactNode } from "react";

export type UserType = {
    id?: number;
    userName: string;
    passowrd: string;
    error?: string | number;
  };
  
  export type LayoutProviderType = {
    children: ReactNode
  }
  