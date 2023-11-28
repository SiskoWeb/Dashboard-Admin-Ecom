"use client";
import { signOut } from "next-auth/react";
import React, { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import Loader from "./Loader";
import { useRouter } from "next/navigation";

export default function LogOut() {
  const [loading, setLoading] = useState<boolean>(false);

  const reouter = useRouter();
  const onSignOut = async () => {
    setLoading(true);
    signOut();
    reouter.push("/");
    setLoading(false);
  };

  return (
    <>
      {loading ? <Loader /> : null}
      <button onClick={() => onSignOut()}>
        <FiLogOut />
      </button>
    </>
  );
}
