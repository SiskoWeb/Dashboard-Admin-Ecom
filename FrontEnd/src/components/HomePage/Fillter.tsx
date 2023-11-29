"use client";
import { getCategories } from "@/lib/categoriesFetch";
import { categoryType } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

export default function Fillter({
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
    <div className="flex items-center justify-center p-4">
      <div className="z-10  w-56 p-3 bg-white  rounded-lg shadow text-center ">
        <h6 className="mb-3 text-sm font-medium text-white  bg-blue-500 rounded-md">
          Categoreis
        </h6>
        <ul className="space-y-2 text-sm flex flex-col underline">
          <button onClick={() => mutationFun.mutate({ label: null })}>
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
        </ul>
        <h6 className="mb-3 text-sm font-medium text-white  bg-blue-500 rounded-md">
          Sorted
        </h6>
        <ul className="space-y-2 text-sm flex flex-col underline">
          <button
            onClick={() => filterPrice()}
            className=" text-gray-500 block px-4 py-2 text-sm underline"
          >
            Price
          </button>
          <button
            onClick={() => sorted()}
            className=" text-gray-500 block px-4 py-2 text-sm underline"
            id="menu-item-4"
          >
            Quantity
          </button>
        </ul>
      </div>
    </div>
  );
}
