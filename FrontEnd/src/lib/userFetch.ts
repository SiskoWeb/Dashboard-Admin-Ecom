"use client";
import axios from "axios";

export async function Register(data: any) {
  try {
    const response = await axios.post(
      "http://localhost/adminDashboard/Backend/auth/create.php",
      JSON.stringify(data),
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);
    return response.data; // Return the response data directly
  } catch (error: any) {
    return { error: error.message };
  }
}

const baseURL = process.env.api;
export const getUsers = async () => {
  try {
    const response = await fetch(
      `http://localhost/adminDashboard/Backend/users/index.php`
    );

    if (!response.ok) {
      // Handle non-2xx responses
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error:", error.message);
    // throw error; // Propagate the error for further handling, if needed
  }
};

export const editUserIsActive = async (payload: any) => {
  try {
    const response = await fetch(
      `http://localhost/adminDashboard/Backend/users/isActive.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      // Handle non-2xx responses
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error:", error.message);
    // throw error; // Propagate the error for further handling, if needed
  }
};

export const edittRoleAccount = async (payload: any) => {
  try {
    const response = await fetch(
      `http://localhost/adminDashboard/Backend/users/role.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      // Handle non-2xx responses
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error:", error.message);
    // throw error; // Propagate the error for further handling, if needed
  }
};

export const deleteUser = async (payload: any) => {
  try {
    const response = await fetch(
      `http://localhost/adminDashboard/Backend/users/delete.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      // Handle non-2xx responses
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error:", error.message);
    // throw error; // Propagate the error for further handling, if needed
  }
};
