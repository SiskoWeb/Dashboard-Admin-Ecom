"use client";
import React from "react";

import { editUserIsActive, getUsers } from "@/lib/userFetch";
import { usersType } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "@/components/Shared/Loader";
import { useDispatch } from "react-redux";
import { setLengthUser } from "@/redux/statistic";
import Error from "@/components/Shared/ErrorPopup";
import CategoriesCard from "./CategoriesCard";
import ButtonCategoryForm from "./ButtonCategoryForm";

export default function ListCategories() {
  const dispatch = useDispatch();

  // fetching data from server
  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["usersList"],
    queryFn: async () => getUsers(),
  });

  if (isSuccess) {
    dispatch(setLengthUser(data.length));
  }
  if (isError) {
    return <Error />;
  }
  const category = {};
  return (
    <div className="mb-10 sm:mb-0 mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <ButtonCategoryForm />
      <CategoriesCard category={category} />
      <CategoriesCard category={category} />
      <CategoriesCard category={category} />
    </div>
  );
}
