"use client";
import { getCategories } from "@/lib/categoriesFetch";
import { categoryType } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

export default function Filtered({
  filterPrice,
  sorted,
  mutationFun,
}: {
  filterPrice: () => void;
  sorted: () => void;
  mutationFun: any;
}) {
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["products"], // Include category in the query key
    queryFn: async () => getCategories(),
  });
  return (
    <div className="flex items-baseline justify-between border-b border-gray-200 p-6 pt-24">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">
        New Arrivals
      </h1>

      <div className="flex items-center gap-4 justify-center">
        <div className="relative  text-left flex items-center shadow-sm border  p-2 border-separate rounded-sm  ">
          Sort:
          <div className="flex gap-2">
            <button
              onClick={() => mutationFun.mutate({ label: null })}
              className=" text-gray-900 block px-4 py-2 text-sm"
              id="menu-item-0"
            >
              All
            </button>
            <button
              onClick={() => filterPrice()}
              className="text-gray-500 block px-4 py-2 text-sm"
            >
              Hiegh Price
            </button>
            <button
              onClick={() => sorted()}
              className="text-gray-500 block px-4 py-2 text-sm"
              id="menu-item-4"
            >
              By Quantity
            </button>
          </div>
          {/* Category  */}
          <span className="min-h-full w-1 bg-gray-600"></span>
          <div className="relative  text-left flex items-center ">
            Categories:
            <div className="flex gap-2">
              <button
                onClick={() => mutationFun.mutate({ label: null })}
                className=" text-gray-900 block px-4 py-2 text-sm"
                id="menu-item-0"
              >
                All
              </button>
              {!isLoading ? (
                data?.map((item: categoryType, index: number) => (
                  <button
                    key={index}
                    onClick={() => mutationFun.mutate({ label: item.name })}
                  >
                    {item.name}
                  </button>
                ))
              ) : (
                <p>Loading</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
