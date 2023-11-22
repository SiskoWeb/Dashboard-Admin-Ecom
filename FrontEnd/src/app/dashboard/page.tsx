import SideBar from "@/components/SideBar";

export default function Dashboard() {
  return (
    <div className="relative  bg-gray-900 h-full flex items-center justify-center">
      <div className="bg-gray-800 flex-1 min-h-screen h-full w-screen flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10   sm:p-6 sm:m-2 sm:rounded-2xl">
        <SideBar />
        <div className="flex-1 px-2 sm:px-0">
          <div className="flex justify-between items-center">
            <h3 className="text-3xl font-extralight text-white/50">Apps : 5</h3>
          </div>
          <div className="mb-10 sm:mb-0 mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            cards
          </div>
        </div>
      </div>
    </div>
  );
}
