"use client";
import Loader from "@/components/Shared/Loader";
import { CreateCategory, UpdateCategory } from "@/lib/categoriesFetch";
import { categoryType, productType } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";

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
  const [error, setError] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [fileDisplay, setFileDisplay] = useState<string | null>(
    productToEdit?.image || ""
  );
  const [name, setName] = useState<string | null>(productToEdit?.name || "");

  ///this fun for saveing image use upload to file variabl
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  const formData = new FormData();

  //this fun when user click add REQUIREDS<file,name>send as formdata
  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //validation
    if (!file) return setError("No file selected");
    if (!name) return setError("Name is Required");

    formData.append("image", file);
    formData.append("name", name);

    if (productToEdit && label === "edit") {
      formData.append("categoryId", productToEdit.id.toString());
    }

    mutateAsync();
    if (isError) setError("there is a pb ");
  };

  // to set which function work update or create
  const funByLabel = async () => {
    if (label === "add") return await CreateCategory(formData);
    else if (label === "edit") {
      return await UpdateCategory(formData);
    }
  };

  //access client state
  const queryClient = useQueryClient();

  // this mutation for change status user
  const { mutateAsync, isError, data, isPending } = useMutation({
    mutationFn: async () =>
      // function that edit user active
      await funByLabel(),
    //after mutating successfullt
    onSuccess: async () => {
      console.log("succssfully");
      queryClient.invalidateQueries({ queryKey: ["categoriesList"] });
      setError("");
      setFile(null);
      setName("");
      //hide model
      onRequestClose();
    },
    onError: async () => {
      setError("there is a pb ");
    },
  });

  return (
    <div className="p-4 sm:p-7">
      <div className="text-center">
        <h1 className="block  text-2xl font-bold  ">
          {label === "add" ? "Create Product" : "Update Product"}
        </h1>
      </div>
      {isPending && <Loader />}
      {/* display msg error */}
      {error && (
        <div className="text-center mt-5 bg-red-500 text-white  text-sm py-1 px-3 rounded-md mb-2">
          {error}
        </div>
      )}
      {fileDisplay && (
        <Image src={fileDisplay} width="50" height="50" alt="image ccategory" />
      )}
      <div className="mt-5">
        <form onSubmit={handleUpload}>
          <div className="grid gap-y-4">
            <br />
            <label>
              Image:
              <input type="file" onChange={handleImageChange} />
            </label>
            <div>
              <div className="relative flex flex-col gap-1">
                <label htmlFor="name">
                  Name:
                  <input
                    type="text"
                    id="name"
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
                      onChange={(e) => setName(e.target.value)}
                      name="name"
                      placeholder="price"
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                    />{" "}
                    <input
                      type="number"
                      id="price_off"
                      onChange={(e) => setName(e.target.value)}
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
                    id="category-create"
                    className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                  >
                    <option selected value="">
                      Select category
                    </option>
                    <option value="FL">Flowbite</option>
                    <option value="RE">React</option>
                    <option value="AN">Angular</option>
                    <option value="VU">Vue</option>
                  </select>
                </label>
                <label htmlFor="price">
                  Quantity:
                  <div className="flex gap-1">
                    <input
                      type="number"
                      id="quantity"
                      onChange={(e) => setName(e.target.value)}
                      name="name"
                      placeholder="quantity"
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                    />{" "}
                    <input
                      type="number"
                      id="min_quantity"
                      onChange={(e) => setName(e.target.value)}
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
                    onChange={(e) => setName(e.target.value)}
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
