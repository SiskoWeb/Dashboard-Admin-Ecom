"use client";
import React from "react";
import StatisticsCard from "./StatisticsCard";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function StatisticGroup() {
  const { userNumbers, categoriesNumber } = useSelector(
    (state: RootState) => state.statistic
  );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
      <StatisticsCard Length={userNumbers} />
      {/* <StatisticsCard Length={categoriesNumber} /> */}
    </div>
  );
}
