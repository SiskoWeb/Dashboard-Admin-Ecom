"use client";
import React from "react";

import { editUserIsActive, getUsers } from "@/lib/userFetch";
import { categoryType, usersType } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "@/components/Shared/Loader";
import { useDispatch } from "react-redux";
import { setLengthCategories, setLengthUser } from "@/redux/statistic";
import Error from "@/components/Shared/ErrorPopup";
import CategoriesCard from "./CategoriesCard";
import ButtonCategoryForm from "./ButtonCategoryForm";
import { getCategories } from "@/lib/categoriesFetch";

export default function ListCategories() {
  const dispatch = useDispatch();

  // fetching data from server
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["ListCategories"],
    queryFn: async () => getCategories(),
  });

  if (isSuccess) {
    dispatch(setLengthCategories(data.length));
  }
  if (isError) {
    return <Error />;
  }

  return (
    <div className="mb-4  mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <ButtonCategoryForm />

      {isLoading ? (
        <Loader />
      ) : data?.length === 0 ? (
        <p>no Products</p>
      ) : (
        data?.map((category: categoryType) => (
          <CategoriesCard key={category.id} category={category} />
        ))
      )}
    </div>
  );
}
