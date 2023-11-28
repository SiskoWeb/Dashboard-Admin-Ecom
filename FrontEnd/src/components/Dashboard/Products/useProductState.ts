// useProductState.tsx
import { useState, ChangeEvent } from "react";
import { productType } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateProduct, UpdateProduct } from "@/lib/productFetch";
import { validateForm } from "./useValidator";

export interface ProductStateOptions {
  productToEdit?: productType;
  label: string;
  onRequestClose: () => void;
}

export function useProductState(options: ProductStateOptions) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [fileDisplay, setFileDisplay] = useState<string | null>(
    options.productToEdit?.image || null
  );
  const [name, setName] = useState<string>(options.productToEdit?.name || "");
  const [price, setPrice] = useState<number>(options.productToEdit?.price || 0);
  const [price_off, setPrice_off] = useState<number>(
    options.productToEdit?.price_off || 0
  );
  const [description, setDescription] = useState<string>(
    options.productToEdit?.description || ""
  );
  const [quantity, setQuantity] = useState<number>(
    options.productToEdit?.quantity || 0
  );
  const [category, setCategory] = useState<string>(
    options.productToEdit?.category || ""
  );
  const [min_quantity, setMin_quantity] = useState<number>(
    options.productToEdit?.quantity || 0
  );

  // Form validation function

  // Function to handle file change
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFileDisplay(URL.createObjectURL(selectedFile));
    }
  };

  ///this fun for saving image use upload to file variable
  const formData = new FormData();

  // this fun when the user clicks add, REQUIRED <file, name> send as formdata
  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    const validationError = validateForm({
      file,
      name,
      category,
      quantity,
      min_quantity,
      price,
      price_off,
    });

    if (options.label === "add" && !file) {
      return "No file selected";
    }
    // Add specific validation for "edit" operation
    if (options.label === "edit" && !options.productToEdit) {
      return "Invalid product to edit";
    }

    if (validationError) {
      setError(validationError);
      return;
    }
    if (options.label === "edit" && file) {
      formData.append("image", file);
    }
    if (options.label === "add" && file) {
      formData.append("image", file);
    }

    formData.append("name", name);
    formData.append("category", category);
    formData.append("quantity", quantity?.toString() || "");
    formData.append("min_quantity", min_quantity?.toString() || "");
    formData.append("price", price.toString());
    formData.append("price_off", price_off.toString());
    formData.append("description", description);

    if (options.productToEdit && options.label === "edit") {
      formData.append("productId", options.productToEdit.id.toString());
    }

    // after validating inputs, send data to the server
    try {
      await mutateAsync();
      setError("");
      setFile(null);
      setName("");
      options.onRequestClose();
    } catch (err) {
      setError("there is a problem");
    }
  };

  // to set which function works (update or create)
  const funByLabel = async () => {
    if (options.label === "add") {
      return await CreateProduct(formData);
    } else if (options.label === "edit") {
      return await UpdateProduct(formData);
    }
  };

  // access client state
  const queryClient = useQueryClient();

  // this mutation for changing the status
  const { mutateAsync, isError } = useMutation({
    mutationFn: async () => await funByLabel(),
    // after mutating successfully
    onSuccess: async () => {
      console.log("successfully");
      queryClient.invalidateQueries({ queryKey: ["ProductList"] });
      setError("");
      setFile(null);
      setName("");
      // hide model
      options.onRequestClose();
    },
    onError: async () => {
      setError("there is a problem");
    },
  });

  return {
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
  };
}
