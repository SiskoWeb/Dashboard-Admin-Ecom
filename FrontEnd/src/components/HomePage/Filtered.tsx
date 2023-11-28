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
    <div className="flex sm:flex-row flex-col  items-center justify-center border-b border-gray-200 p-6 pt-24">
      <div className="flex items-center gap-4  justify-center shadow-sm border  p-2 border-separate rounded-sm  ">
        <div className="relative  text-left  sm:flex-row flex-col flex items-center ">
          Sort:
          <div className="flex gap-2">
            <button
              onClick={() => mutationFun.mutate({ label: null })}
              className=" text-gray-900 block px-4 py-2 text-sm underline"
              id="menu-item-0"
            >
              All
            </button>
            <button
              onClick={() => filterPrice()}
              className="text-gray-500 block px-4 py-2 text-sm underline"
            >
              Price
            </button>
            <button
              onClick={() => sorted()}
              className="text-gray-500 block px-4 py-2 text-sm underline"
              id="menu-item-4"
            >
              Quantity
            </button>
          </div>
          {/* Category  */}
          <div className="text-left  sm:flex-row flex-col flex items-center  ">
            Categories:
            <div className="flex gap-2 underline">
              <button
                onClick={() => mutationFun.mutate({ label: null })}
                className=" text-gray-500 block px-4 py-2 text-sm"
              >
                All
              </button>
              {!isLoading ? (
                data?.map((item: categoryType, index: number) => (
                  <button
                    className=" text-gray-500 block px-4 py-2 text-sm"
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
