"use client";
import axios from "axios";

export async function Register(data: any) {
  try {
    const response = await axios.post(
      "http://localhost/adminDashboard/Backend/createUser.php",
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
