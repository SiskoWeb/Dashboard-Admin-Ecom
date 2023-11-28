import ListProducts from "@/components/Dashboard/Products/ListProducts";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Products",
  description: "Crud Products",
};
export default function pages() {
  return (
    <div className="flex flex-col  overflow-hidden rounded-xl bg-white p-6 shadow">
      <ListProducts />
    </div>
  );
}
