import Error from "@/components/Dashboard/Error";

import { useSession } from "next-auth/react";

export default async function AdminPage() {
  // if (!orders?.data) return <Error />;
  const { data, status } = useSession();

  return (
    <div className="flex flex-col gap-y-10 overflow-hidden rounded-xl bg-white p-8 shadow">
      <h2 className="font-extrabold bg-white p-3">إضافة منتج جديد</h2>
      {status === "authenticated" && data !== null && (
        <>
          <h2>Welcome {data.user.eamil}</h2>
          <p>User ID: {data.user.id}</p>
          {JSON.stringify(data.user)}
        </>
      )}
    </div>
  );
}
