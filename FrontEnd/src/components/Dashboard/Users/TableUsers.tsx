"use client";
import React from "react";
import UserCard from "./UserCard";
import { editUserIsActive, getUsers } from "@/lib/fetch";
import { usersType } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "@/components/Shared/Loader";

export default function TableUsers() {
  // fetching data from server
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["usersList"],
    queryFn: async () => getUsers(),
  });

  return (
    <main>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Position
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="h-[300px]">
            {isLoading && <Loader />}
            {data?.length === 0 ? (
              <p>no Users</p>
            ) : (
              data?.map((user: usersType) => (
                <UserCard key={user.id} user={user} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
