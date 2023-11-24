import Error from "@/components/Dashboard/Error";
import StatusCard from "@/components/Dashboard/StatusCard";
import Link from "next/link";

export default async function AdminPage() {
  // if (!orders?.data) return <Error />;

  return (
    <div className="flex flex-col gap-y-10 overflow-hidden rounded-xl bg-white p-8 shadow">
      <h2 className="font-extrabold bg-white p-3">إضافة منتج جديد</h2>
    </div>
  );
}
