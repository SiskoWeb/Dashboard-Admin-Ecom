import Loader from "@/components/Shared/Loader";
import Model from "@/components/Shared/Model";
import { DeleteProduct } from "@/lib/productFetch";
import { productType } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import { FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import FormProduct from "./FromProduct";

export default function CardProduct({ product }: { product: productType }) {
  const [shouldShow, setShouldShow] = useState<boolean>(false);

  //access client state
  const queryClient = useQueryClient();

  // this mutation for change status user
  const { mutateAsync, isError, data } = useMutation({
    mutationFn: async () =>
      // function that edit user active
      DeleteProduct(product.id),

    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["ProductList"] });
      console.log("Deleted succssfully");
    },
  });

  const discountAmount = (product.price * product.price_off) / 100;
  return (
    <>
      <div className="relative w-72  bg-white shadow-md rounded-xl duration-500  hover:shadow-xl">
        <a href="#">
          <Image
            src={product.image}
            width="100"
            height="120"
            alt={product.name}
            className="min-h-[200px] h-[200px] w-80 object-cover rounded-t-xl"
          />
          <div className="px-4 py-3 w-72">
            <span className="text-gray-400 mr-3 uppercase text-xs">
              {product && product.category}
            </span>
            <p className="text-lg font-bold text-black truncate block capitalize">
              {product && product.name}
            </p>
            <div className="flex items-center">
              <p className="text-lg font-semibold text-black cursor-auto my-3">
                ${product && product.price - discountAmount}
              </p>
              <del>
                <p className="text-sm text-gray-600 cursor-auto ml-2">
                  ${product && product.price}
                </p>
              </del>
              <div className="ml-auto flex gap-2">
                <button onClick={() => setShouldShow(true)}>
                  <FaRegPenToSquare />
                </button>
                <button onClick={() => mutateAsync()}>
                  <FaRegTrashCan />
                </button>
              </div>
            </div>
          </div>
        </a>
      </div>

      <Model
        shouldShow={shouldShow}
        onRequestClose={() => setShouldShow(false)}
      >
        <FormProduct
          label="edit"
          productToEdit={product}
          onRequestClose={() => setShouldShow(false)}
        />
      </Model>
    </>
  );
}
