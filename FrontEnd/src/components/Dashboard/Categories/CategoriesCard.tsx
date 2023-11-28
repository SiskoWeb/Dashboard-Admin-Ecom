"use client";

import Model from "@/components/Shared/Model";
import { DeleteCategory } from "@/lib/categoriesFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import FormCategory from "./FormCategory";
import { categoryType } from "@/types/types";
import { FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";

export default function CategoriesCard({
  category,
}: {
  category: categoryType;
}) {
  const [shouldShow, setShouldShow] = useState<boolean>(false);

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
    <>
      <div className="shadow   py-5 px-4 flex flex-col  items-center cursor-pointer rounded-md hover:bg-gray-900/20 hover:smooth-hover">
        <Image
          className="w-20 h-20 object-cover object-center rounded-full"
          src={category.image}
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
            <FaRegTrashCan />
          </button>
          <button
            onClick={() => setShouldShow(true)}
            className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-md"
          >
            <FaRegPenToSquare />
          </button>
        </div>
      </div>
      <Model
        shouldShow={shouldShow}
        onRequestClose={() => setShouldShow(false)}
      >
        <FormCategory
          label="edit"
          categoryToEdit={category}
          onRequestClose={() => setShouldShow(false)}
        />
      </Model>
    </>
  );
}
