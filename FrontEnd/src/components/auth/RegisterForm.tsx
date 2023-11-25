"use client";

import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setWhichForm } from "@/redux/formSlice";

import notify from "@/hooks/useNotifaction";
import Loader from "../Shared/Loader";
import { Register } from "@/lib/fetch";
export default function RegisterForm() {
  const [role, setRole] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loadig, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent | any) => {
    e.preventDefault();

    // validation input
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!email.match(validRegex)) {
      setError("Email is Requierd");
      return;
    }

    if (password === "" || password.length <= 5) {
      setError("Password is Requierd");
      return;
    }

    // if (role === "" ) {
    //   setError("phone is Requierd");
    //   return;
    // }

    // display loading
    setLoading(true);
    const result = await Register({
      email,
      password,
      role: "user",
      isActive: false,
    });

    if (result.error) {
      // Handle error

      setLoading(false);
      setError(result.error);
      console.error(result.error);
    } else {
      // Handle success

      dispatch(setWhichForm(false)); // change form from register to login
      notify("Your account created", "success");
      setLoading(false);
      //empty inputs
      setEmail("");
      setPassword("");
      setRole("");
      setError("");
      console.log(result);
    }
  };

  return (
    <section className="grid place-items-center h-full ">
      {/* {display loading spinner when user click in button resgiter} */}
      {loadig && <Loader />}

      {/* display msg error */}
      {error && (
        <div className="absolute top-[53%] bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
          {error}
        </div>
      )}
      <form className="flex flex-col gap-3  md:flex-row">
        <label>
          <div className="flex items-center mb-4">
            <input
              id="user"
              type="radio"
              value="user"
              name="role"
              checked
              className="w-4 h-4 text-blue-600  focus:ring-blue-500 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
            ></input>
            <label
              htmlFor="user"
              className="ms-2 text-sm font-medium text-gray-300 "
            >
              USER
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="admin"
              type="radio"
              value="admin"
              name="role"
              className="w-4 h-4 text-blue-600  focus:ring-blue-500 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
            ></input>
            <label
              htmlFor="admin"
              className="ms-2 text-sm font-medium text-gray-300"
            >
              ADMIN
            </label>
          </div>
        </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-md p-3"
          type="text"
          placeholder="Email"
          value={email}
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-md p-3"
          type="password"
          placeholder="Password"
          value={password}
        />
        <button
          onClick={handleSubmit}
          type="button"
          className="bg-[#2a66f9] text-white rounded-md font-bold cursor-pointer px-6 py-2"
        >
          Register
        </button>
      </form>
      <div className="pt-3 text-white flex gap-1 items-center justify-center md:text-lg text-xs">
        <svg
          className="w-4 h-4 mr-2 text-green-500 dark:text-green-400 flex-shrink-0 opacity-60"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
        <p>By Singning up, you agree to our Teams, Data Policy and Cookies</p>
      </div>
      <button
        className="text-sm mt-3 text-center text-white"
        onClick={() => dispatch(setWhichForm(false))} // this  control which from appear  - dislay login form
      >
        Already have an account? <span className="underline ">Login</span>
      </button>
    </section>
  );
}
