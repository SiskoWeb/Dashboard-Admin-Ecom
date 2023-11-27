"use client";

import { deleteUser, editUserIsActive, edittRoleAccount } from "@/lib/fetch";
import { usersType } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

export default function UserCard({ user }: { user: usersType }) {
  //access client state
  const queryClient = useQueryClient();

  // this mutation for change status user
  const { mutateAsync } = useMutation({
    mutationFn: async () =>
      // function that edit user active
      editUserIsActive({ userId: user.id, isActive: !user.isActive }),
    onSuccess: async () => {
      console.log("succssfully");
      queryClient.invalidateQueries({ queryKey: ["usersList"] });
    },
  });

  //this for change role user
  const { mutate: mutateRole } = useMutation({
    mutationFn: async () =>
      // function that edit user active

      edittRoleAccount({ userId: user.id, newRole: "admin" }),
    onSuccess: async () => {
      console.log("succssfully");
      queryClient.invalidateQueries({ queryKey: ["usersList"] });
    },
  });

  //this for change role user
  const { mutate: mutateDeleteUser } = useMutation({
    mutationFn: async () =>
      // function that remove user
      deleteUser({ userId: user.id }),
    onSuccess: async () => {
      console.log("succssfully");
      queryClient.invalidateQueries({ queryKey: ["usersList"] });
    },
  });



  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
      >
        <div className="ps-3">
          <div className="text-base font-semibold">#{user.id && user.id}</div>
          <div className="font-normal text-gray-500">
            {user.email && user.email}
          </div>
        </div>
      </th>
      <td className="px-6 py-4">User</td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          {user.isActive ? (
            <>
              <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
              Online
            </>
          ) : (
            <>
              <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>
              Ofline
            </>
          )}
        </div>
      </td>
      <td className="px-6 py-4 ">
        <div className="flex flex-col items-start">
          <button
            onClick={() => mutateAsync()}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Edit Status
          </button>
          <button
            onClick={() => mutateRole()}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Edit Role
          </button>
          <button
            onClick={() => mutateDeleteUser()}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
