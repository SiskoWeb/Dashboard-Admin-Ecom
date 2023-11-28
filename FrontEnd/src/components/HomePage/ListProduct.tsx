"use client";
import React, { useState } from "react";
import ProductCard from "./ProductCard";
import Filler from "./Fillter";
import { productType } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
import Filtered from "./Filtered";

export default function ListProduct({
  productsList,
}: {
  productsList: productType[];
}) {
  const [products, setProducts] = useState<productType[] | any>(productsList);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  const mutationFilter = useMutation({
    mutationFn: async (props: any) => {
      filtredFun(props.label);
    },
  });

  //this function to calculat pages
  const calculatePaginatedProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return products.slice(startIndex, endIndex);
  };

  //this to filter by category
  const filtredFun = (label: string | null) => {
    if (label) {
      const filtred: productType[] = productsList?.filter(
        (product: productType) => product.category === label
      );
      setProducts(filtred);
    } else {
      setProducts(productsList);
    }
    setCurrentPage(1); // Reset to the first page when filtering
  };

  //   this sorted by quantity
  const sortProducts = async () => {
    const sorted = productsList
      ?.slice()
      .sort((p1: productType, p2: productType) => p2.quantity - p1.quantity);
    setProducts(sorted);
    setCurrentPage(1); // Reset to the first page when sorting
  };

  //this fun to sort by price
  const filterPrice = async () => {
    const FiltredPrice = productsList
      ?.slice()
      .sort((p1: productType, p2: productType) => p2.price - p1.price);
    setProducts(FiltredPrice);
    setCurrentPage(1); // Reset to the first page when filtering by price
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const paginatedProducts = calculatePaginatedProducts();

  return (
    <div className="bg-white flex-col min-w-screen min-h-screen items-start">
      <Filtered
        filterPrice={filterPrice}
        sorted={sortProducts}
        mutationFun={mutationFilter}
      />
      <main className="m-4 p-4 shadow-md ">
        <div className="min-w-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center justify-center p-4 cursor-pointer ">
          {paginatedProducts.length === 0 ? (
            <h3>No Products</h3>
          ) : (
            paginatedProducts.map((product: productType) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>

        <div className="flex w-full justify-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Previous
          </button>

          <span className="flex items-center px-2">{`${currentPage} of ${Math.ceil(
            products.length / itemsPerPage
          )}`}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(products.length / itemsPerPage)}
            className="flex items-center justify-center px-3 h-8 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}
