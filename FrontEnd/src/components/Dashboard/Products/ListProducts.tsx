"use client";
import React, { useState } from "react";
import { FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import BtnAddProduct from "./BtnAddProduct";
import CardProduct from "./CardProduct";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import Error from "@/components/Shared/ErrorPopup";
import { getProducts } from "@/lib/productFetch";
import { productType } from "@/types/types";
import Loader from "@/components/Shared/Loader";
import Model from "@/components/Shared/Model";
import FormProduct from "./FromProduct";

export default function ListProducts() {


  // fetching data from server
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["ProductList"],
    queryFn: async () => getProducts(),
  });

  if (isSuccess) {
  }
  if (isError) {
    return <Error />;
  }

  return (
    <>
      <BtnAddProduct />
      <hr className="my-3" />
      <section className="w-fit p-4 mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {isLoading ? (
          <Loader />
        ) : data?.length === 0 ? (
          <p>no Products</p>
        ) : (
          data?.map((product: productType) => (
            <CardProduct key={product.id} product={product} />
          ))
        )}
      </section>

    </>
  );
}
