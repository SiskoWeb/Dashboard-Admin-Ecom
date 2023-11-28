import TableCategories from "@/components/Dashboard/Categories/ListCategories";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Categories",
  description: "Crud Categories",
};
export default function Categories() {
  return (
    <div className="flex flex-col  overflow-hidden rounded-xl bg-white p-6 shadow">
      <TableCategories />
    </div>
  );
}
