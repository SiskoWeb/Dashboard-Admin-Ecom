import Hero from "@/components/auth/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <main className=" z-10  bg-gray-800 flex flex-col min-h-screen items-center justify-center gap-20">
      <Hero />
    </main>
  );
}
