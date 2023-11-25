import { getServerSession } from "next-auth";
import React from "react";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function page() {
  const session: any = await getServerSession(options);
  if (!session) {
    redirect("/");
  }

  return <div>page</div>;
}
