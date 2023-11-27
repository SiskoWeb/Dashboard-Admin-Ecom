"use client";

import { DeleteCategory } from "@/lib/categoriesFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

export default function CategoriesCard({ category }: { category: any }) {
  //access client state
  const queryClient = useQueryClient();

  // this mutation for change status user
  const { mutateAsync, isError, data, isPending } = useMutation({
    mutationFn: async () =>
      // function that edit user active
      DeleteCategory(category.id),
    onSuccess: async () => {
      console.log("Deleted succssfully");
      queryClient.invalidateQueries({ queryKey: ["categoriesList"] });
    },
  });

  return (
    <div className="shadow group  py-10  px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/20 hover:smooth-hover">
      <Image
        className="w-20 h-20 object-cover object-center rounded-full"
        src="https://img.freepik.com/premium-photo/businessman-holding-light-bulb-with-wooden-blocks-business-start-up-goals-success-ideas_117255-1601.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1699315200&semt=ais"
        alt="art"
        width="100"
        height="100"
      />
      <h4 className="text-blakc text-2xl font-bold capitalize text-center">
        {category && category.name}
      </h4>

      <div className="flex  gap-1">
        <button
          onClick={() => mutateAsync()}
          className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md"
        >
          Delete
        </button>
        <button className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md">
          Delete
        </button>
      </div>
    </div>
  );
}
