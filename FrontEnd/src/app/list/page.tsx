import { getServerSession } from "next-auth";
import React from "react";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import ListProduct from "@/components/HomePage/ListProduct";
import Error from "@/components/Shared/ErrorPopup";
import { getProducts } from "@/lib/productFetch";
import NavBar from "@/components/Dashboard/NavBar";

export default async function ProductsList() {
  // CHING DATA  IN SERVER SIDE
  const products = await getProducts();
  console.log(products);
  if (!products) return <Error />;

  return (
    <main className="flex min-h-screen flex-col justify-center items-center  h-full w-full bg-[#f5f6fa] gap-6 ">
      <NavBar />
      {/* {session.user.role === "admin" ? <SideBar /> : null} */}
      <ListProduct productsList={products} />
    </main>
  );
}
