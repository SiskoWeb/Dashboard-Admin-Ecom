"use client";
import Loader from "@/components/Shared/Loader";
import {
  CreateCategory,
  UpdateCategory,
  getCategories,
} from "@/lib/categoriesFetch";
import { categoryType, productType } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { ChangeEvent, useRef, useState } from "react";
import { useProductState } from "./useProductState";
import { CreateProduct } from "@/lib/productFetch";

//this component works for two side editing creating
export default function FormProduct({
  label = "add",
  productToEdit,
  onRequestClose,
}: {
  label: string;
  productToEdit?: productType;
  onRequestClose: () => void;
}) {
  //states product

  const {
    error,
    fileDisplay,
    name,
    setName,
    price,
    setPrice,
    price_off,
    setPrice_off,
    description,
    setDescription,
    quantity,
    setQuantity,
    category,
    setCategory,
    min_quantity,
    setMin_quantity,

    handleFileChange,
    handleUpload,
  } = useProductState({ productToEdit, label, onRequestClose });

  // fetching categoris to display for user
  const {
    data: listCategories,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["ListCategories"],
    queryFn: async () => getCategories(),
  });

  return (
    <div className="p-4 sm:p-7">
      <div className="text-center">
        <h1 className="block  text-2xl font-bold  ">
          {label === "add" ? "Create Product" : "Update Product"}
        </h1>
      </div>

      {/* display msg error */}
      {error && (
        <div className="text-center mt-5 bg-red-500 text-white  text-sm py-1 px-3 rounded-md mb-2">
          {error}
        </div>
      )}
      {fileDisplay && (
        <div className="mt-3">
          {/* display the selected image */}
          {typeof fileDisplay === "string" ? (
            <Image
              src={fileDisplay}
              width={50}
              height={50}
              alt="Category Image"
            />
          ) : (
            <Image
              src={URL.createObjectURL(fileDisplay)}
              width={50}
              height={50}
              alt="Category Image"
            />
          )}
        </div>
      )}
      <div className="mt-5">
        <form onSubmit={handleUpload}>
          <div className="grid gap-y-4">
            <br />
            <label>
              Image:
              <input type="file" onChange={handleFileChange} />
            </label>
            <div>
              <div className="relative flex flex-col gap-1">
                <label htmlFor="name">
                  Name:
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                    placeholder="electrec..."
                    className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                  />
                </label>
                <label htmlFor="price">
                  Price:
                  <div className="flex gap-1">
                    <input
                      type="number"
                      id="price"
                      value={price}
                      onChange={(e) => setPrice(+e.target.value)}
                      name="name"
                      placeholder="price"
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                    />{" "}
                    <input
                      type="number"
                      id="price_off"
                      value={price_off}
                      onChange={(e) => setPrice_off(+e.target.value)}
                      name="name"
                      placeholder="Offer 10%"
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                    />
                  </div>
                </label>

                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                  <select
                    onChange={(e) => setCategory(e.target.value)}
                    id="category-create"
                    className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                  >
                    <option selected value={category}>
                      {category ? category : "Select Category"}
                    </option>
                    {isLoading ? (
                      <Loader />
                    ) : listCategories?.length === 0 ? (
                      <option disabled>no categories</option>
                    ) : (
                      listCategories?.map((category: categoryType) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))
                    )}
                  </select>
                </label>
                <label htmlFor="price">
                  Quantity:
                  <div className="flex gap-1">
                    <input
                      type="number"
                      id="quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(+e.target.value)}
                      name="name"
                      placeholder="quantity"
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                    />{" "}
                    <input
                      type="number"
                      id="min_quantity"
                      value={min_quantity}
                      onChange={(e) => setMin_quantity(+e.target.value)}
                      name="min_quantity"
                      placeholder="min_quantity"
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                    />
                  </div>
                </label>
                <label htmlFor="discription">
                  Discription:
                  <textarea
                    id="discription"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    name="discription"
                    placeholder="Discription of product"
                    className="resized py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                  />
                </label>
              </div>
            </div>
            <button className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
