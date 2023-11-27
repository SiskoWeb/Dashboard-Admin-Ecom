import StatisticGroup from "@/components/Dashboard/Statistic/StatisticGroup";
import StatisticsCard from "@/components/Dashboard/Statistic/StatisticsCard";
import TableUsers from "@/components/Dashboard/Users/TableUsers";

export default async function AdminPage() {
  return (
    <div className="flex flex-col gap-y-10 overflow-hidden rounded-xl bg-white p-8 shadow">
      {/* Statistic Cards  */}

      <StatisticGroup />

      <div>
        <TableUsers />
      </div>
    </div>
  );
}
