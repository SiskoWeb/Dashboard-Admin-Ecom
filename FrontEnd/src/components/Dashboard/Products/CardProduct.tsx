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
      <div className="relative flex  max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
        <a
          className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
          href="#"
        >
          <Image
            className="object-cover"
            src={product.image}
            alt="product image"
            width="500"
            height="200"
          />

          <span
            className={`absolute top-0 left-0 m-2 rounded-full  px-2 text-center text-sm font-medium text-white ${
              product.quantity > product.min_quantity
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          >
            {product.quantity} Units
          </span>
          <span className="absolute top-0 right-0 m-2 rounded-full bg-gray-400  px-2 text-center text-sm font-medium text-white">
            {product.category}
          </span>
        </a>
        <div className="mt-4 px-5 pb-5">
          <a href="#">
            <h5 className="text-xl tracking-tight text-slate-900">
              {product.name}
            </h5>
          </a>
          <div className="mt-2 mb-5 flex items-center justify-between">
            <p>
              <span className="text-3xl font-bold text-slate-900">
                ${product.price}
              </span>
            </p>
            <div className=" flex  flex-col items-center justify-center px-2">
              <span className="bg-red-500 text-white">Min Q</span>:{" "}
              {product.min_quantity}
            </div>
          </div>
          <div className="ml-auto flex gap-2 justify-between">
            <button onClick={() => setShouldShow(true)}>
              <FaRegPenToSquare />
            </button>
            <button onClick={() => mutateAsync()}>
              <FaRegTrashCan />
            </button>
          </div>
        </div>
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
