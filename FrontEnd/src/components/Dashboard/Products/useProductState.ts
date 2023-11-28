"use client";
import { productType } from "@/types/types";
import { useState } from "react";

export function useProductState(productToEdit?: productType) {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string>(productToEdit?.name || "");
  const [price, setPrice] = useState<number>(productToEdit?.price || 0);
  const [price_off, setPrice_off] = useState<number>(
    productToEdit?.price_off || 0
  );
  const [description, setDescription] = useState<string>(
    productToEdit?.description || ""
  );
  const [quantity, setQuantity] = useState<number>(
    productToEdit?.quantity || 0
  );
  const [category, setCategory] = useState<string>(
    productToEdit?.category || ""
  );
  const [min_quantity, setMin_quantity] = useState<number>(
    productToEdit?.quantity || 0
  );

  return {
    file,
    setFile,
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
  };
}
