import TableCategories from "@/components/Dashboard/Categories/ListCategories";
import React from "react";

export default function Categories() {
  return (
    <div className="flex flex-col gap-y-10 overflow-hidden rounded-xl bg-white p-8 shadow">
      <TableCategories />
    </div>
  );
}
