"use client";
import { productType } from "@/types/types";
import Image from "next/image";
import React from "react";

export default function ProductCard({ product }: { product: productType }) {
  const discountAmount = (product.price * product.price_off) / 100;
  return (
    <div className="relative flex  max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <a
        className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
        href="#"
      >
        <Image
          src={product && product.image}
          className="object-cover"
          alt={product && product.name}
          fill
        />
        <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
          {product && product.price_off}% OFF
        </span>
      </a>
      <div className="mt-4 px-5 pb-5">
        <a href="#">
          <h5 className="text-xl tracking-tight text-slate-900">
            {product && product.name}
          </h5>
        </a>
        <div className="mt-2  flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-slate-900">
              $ ${product && product.price - discountAmount}
            </span>
            <span className="text-sm text-slate-900 line-through">
              ${product && product.price}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
