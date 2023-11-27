"use client";
import Loader from "@/components/Shared/Loader";
import { CreateCategory } from "@/lib/categoriesFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";

export default function FormCategory() {
  const [error, setError] = useState<string>("");
  const [loadig, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileDisplay, setFileDisplay] = useState<File | null>(null);
  const [name, setName] = useState<string | null>("");

  ///this fun for saveing image use upload to file variabl
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setFileDisplay(e.target.files[0]);
    }
  };
  const formData = new FormData();

  //this fun when user click add REQUIREDS<file,name>send as formdata
  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //validation
    if (!file || !name) {
      setError("No file selected and name");

      return;
    }

    formData.append("image", file);
    formData.append("name", name);

    mutateAsync();
    if (isError) setError("there is a pb ");
  };

  //access client state
  const queryClient = useQueryClient();

  // this mutation for change status user
  const { mutateAsync, isError, data, isPending } = useMutation({
    mutationFn: async () =>
      // function that edit user active
      CreateCategory(formData),
    onSuccess: async () => {
      console.log("succssfully");
      queryClient.invalidateQueries({ queryKey: ["categoriesList"] });
    },
    onError: async () => {
      setError("there is a pb ");
    },
  });

  return (
    <div className="p-4 sm:p-7">
      <div className="text-center">
        <h1 className="block  text-2xl font-bold  ">Create Category</h1>
      </div>
      {isPending && <Loader />}
      {/* display msg error */}
      {error && (
        <div className="text-center mt-5 bg-red-500 text-white  text-sm py-1 px-3 rounded-md mb-2">
          {error}
        </div>
      )}
      {/* {fileDisplay && (
        <Image
          src={fileDisplay}
          width="50"
          height="50"
          alt="image ccategory"
        />
      )} */}
      <div className="mt-5">
        <form onSubmit={handleUpload}>
          <div className="grid gap-y-4">
            <br />
            <label>
              Image:
              <input type="file" onChange={handleImageChange} />
            </label>
            <div>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                  placeholder="electrec..."
                  className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                />
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
