"use client";
import Model from "@/components/Shared/Model";
import React, { useState } from "react";
import FormProduct from "./FromProduct";

export default function BtnAddProduct() {
  const [shouldShow, setShouldShow] = useState<boolean>(false);
  return (
    <>
      <div
        onClick={() => setShouldShow(true)}
        className="w-20  shadow bg-white-900/30  px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/40 hover:smooth-hover"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </div>

      <Model
        shouldShow={shouldShow}
        onRequestClose={() => setShouldShow(false)}
      >
        <FormProduct label="add" onRequestClose={() => setShouldShow(false)} />
      </Model>
    </>
  );
}
