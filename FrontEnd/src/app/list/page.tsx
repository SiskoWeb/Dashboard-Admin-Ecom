import { getServerSession } from "next-auth";
import React from "react";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import ListProduct from "@/components/HomePage/ListProduct";
import Error from "@/components/Shared/ErrorPopup";
import { getProducts } from "@/lib/productFetch";
import NavBar from "@/components/Dashboard/NavBar";
import LogOut from "@/components/Shared/LogOut";
import SideBar from "@/components/Dashboard/SideBar";

export default async function ProductsList() {
  const session: any = await getServerSession(options);
  if (!session) {
  }
  // FETCHING DATA  IN SERVER SIDE
  const products = await getProducts();
  console.log(products);
  if (!products) return <Error />;

  return (
    <>
      <NavBar />
      {session.user.role === "admin" ? <SideBar /> : null}
      <ListProduct productsList={products} />
    </>
  );
}
