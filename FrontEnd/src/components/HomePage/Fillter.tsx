"use client";

import { useQuery } from "@tanstack/react-query";

import { categoryType } from "@/types/types";
import { getCategories } from "@/lib/categoriesFetch";

export default function Filler({
  mutationFun,
  sorted,
  filterPrice,
}: {
  mutationFun: any;
  sorted: () => void;
  filterPrice: () => void;
}) {
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["products"], // Include category in the query key
    queryFn: async () => getCategories(),
  });

  return (
    <div className="flex items-center justify-center p-4">
      <div className=" w-56 p-3 bg-white  rounded-lg shadow text-center ">
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
                key={index}
                onClick={() => mutationFun.mutate({ label: item.name })}
              >
                {item.name}
              </button>
            ))
          ) : (
            <p>Loading</p>
          )}
          <button className="border-green-500" onClick={() => sorted()}>
            sorted By Quantity
          </button>
          <button className="border-green-500" onClick={() => filterPrice()}>
            sorted By price
          </button>
        </ul>
      </div>
    </div>
  );
}
