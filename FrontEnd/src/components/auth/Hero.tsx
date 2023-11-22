"use client";
import React from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

import { useAppSelector } from "@/redux/hooks";

export default function Hero() {
  const Va = useAppSelector((state) => state.FormSlice.whichForm);
  return (
    <main className=" flex flex-col min-h-screen items-center justify-center gap-20">
      <section>{Va ? <RegisterForm /> : <LoginForm />}</section>
    </main>
  );
}
