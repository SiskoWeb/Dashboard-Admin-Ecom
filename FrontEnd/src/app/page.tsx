import Hero from "@/components/auth/Hero";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { options } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function Home() {
  const session: any = await getServerSession(options);
  // if (!orders?.data) return <Error />;
  if (session) {
    redirect("/list");
  }
  return (
    <main className=" z-10  bg-gray-800 flex flex-col min-h-screen items-center justify-center gap-20">
      <Hero />
    </main>
  );
}
