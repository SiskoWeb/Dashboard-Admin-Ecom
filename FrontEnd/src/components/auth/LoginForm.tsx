"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";

import { setWhichForm } from "@/redux/formSlice";
import { ToastContainer } from "react-toastify";
import Loader from "../Shared/Loader";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loadig, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // validation input
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!email.match(validRegex)) {
      setError("Email is Requierd");
      return;
    }

    if (password === "") {
      setError("Password is Requierd");
      return;
    }
    // display loading
    setLoading(true);
    setError("");
    try {
      //this for validte is exist user or not useing next auth
      const res: any = await signIn("Credentials", {
        email,
        password,
        callbackUrl: '/',
      });

      console.log(res);
      //if user not exist
      if (res?.status === 401) {
        setError(res?.error);
        setLoading(false);
        return;
      }
      // if there is pb in server
      else if (res?.error === "500") {
        setError("there is a problem in server");
        setLoading(false);
      }
      // efter 2 sos rederact to dashboard
      setTimeout(() => {
        setLoading(false);
        // router.replace("admin");
      }, 2000);
    } catch (error) {
      setError("there is a problem in nternet or server");
      setLoading(false);
    }
  };

  return (
    <section className=" grid place-items-center h-full ">
      {/* {display loading spinner when user click in button resgiter} */}
      {loadig && <Loader />}

      {/* display msg error */}
      {error && (
        <div className="absolute top-[55%] bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mb-2">
          {error}
        </div>
      )}
      <form className="flex flex-col gap-3  md:flex-row">
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-md p-3"
          type="text"
          placeholder="Email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-md p-3"
          type="password"
          placeholder="Password"
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-[#2a66f9] text-white rounded-md font-bold cursor-pointer px-6 py-2"
        >
          Login
        </button>
      </form>
      <div className="pt-3 text-white flex gap-1  items-center justify-center md:text-lg text-xs">
        <svg
          className="w-4 h-4 mr-2 text-green-500 dark:text-green-400 flex-shrink-0 opacity-60"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>
        <p>By Singning, you agree to our Teams, Data Policy and Cookies</p>
      </div>
      <button
        className="text-sm mt-3 text-center text-white"
        onClick={() => dispatch(setWhichForm(true))} // this  control which from appear  - dislay login form
      >
        You dont have an account? <span className="underline ">Register</span>
      </button>
      <ToastContainer />
    </section>
  );
}
