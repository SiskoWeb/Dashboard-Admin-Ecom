"use client";
import { signOut } from "next-auth/react";
import React from "react";
import { FiLogOut } from "react-icons/fi";

export default function LogOut() {
  const onSignOut = (e: any) => {
    signOut();
  };
  return (
    <button onClick={(e) => onSignOut(e)}>
      <FiLogOut />
    </button>
  );
}
