import Error from "@/components/Dashboard/Error";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import StatisticsCards from "@/components/Dashboard/StatisticsCard";
import TableUsers from "@/components/Dashboard/Users/TableUsers";

export default async function AdminPage() {
  return (
    <div className="flex flex-col gap-y-10 overflow-hidden rounded-xl bg-white p-8 shadow">
      {/* Statistic Cards  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
        <StatisticsCards />
        <StatisticsCards />
        <StatisticsCards />
        <StatisticsCards />
      </div>
      <div>
        <TableUsers />
      </div>
    </div>
  );
}
