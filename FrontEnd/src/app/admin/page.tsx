import Error from "@/components/Dashboard/Error";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default async function AdminPage() {
 
  return (
    <div className="flex flex-col gap-y-10 overflow-hidden rounded-xl bg-white p-8 shadow">
      <h2 className="font-extrabold bg-white p-3">إضافة منتج جديد</h2>
    </div>
  );
}
