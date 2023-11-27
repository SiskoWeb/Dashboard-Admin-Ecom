
import StatisticsCard from "@/components/Dashboard/StatisticsCard";
import TableUsers from "@/components/Dashboard/Users/TableUsers";


export default async function AdminPage() {
  return (
    <div className="flex flex-col gap-y-10 overflow-hidden rounded-xl bg-white p-8 shadow">
      {/* Statistic Cards  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
        <StatisticsCard />
        <StatisticsCard />
        <StatisticsCard />
      </div>
      <div>
        <TableUsers />
      </div>
    </div>
  );
}
