import NavBar from "@/components/Dashboard/NavBar";
import SideBar from "@/components/Dashboard/SideBar";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { LayoutProviderType } from "@/types/types";

export default async function AdminLayout({ children }: LayoutProviderType) {
  const session: any = await getServerSession(options);
  // if (!orders?.data) return <Error />;

  if (!session) {
    redirect("/");
  } else {
    if (session.user.role === "user") {
      redirect("/list");
    }
  }

  return (
    <main className="flex">
      <NavBar />
      <SideBar />
      <div className=" md:ml-64 bg-gray-100  w-full h-full min-h-screen pt-20 p-5">
        {children}
      </div>
    </main>
  );
}
