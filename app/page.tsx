"use client";

import { useRef, useState } from "react";

import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";

import axios from "axios";

import baseUrl from "./network/baseUrl";

import { useRouter } from "next/navigation";

import Spinner from "./component/SpinnerComp";
import { toast } from "react-toastify";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [formRoute, setFormRoute] = useState("register");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  function passwordVisibility() {
    const input = passwordRef.current;

    if (input) {
      const newType = input.type === "password" ? "text" : "password";
      input.type = newType;
      setPasswordVisible(newType === "text");
    }
  }

  console.log(`${baseUrl}/${formRoute}`);
  const handleForm = async () => {
    setLoading(true);
    try {
      const result = await axios.post(`${baseUrl}/${formRoute}`, {
        email,
        password,
        username,
      });
      setLoading(false);
      if (result && result?.data === "true") {
        localStorage.setItem("email", email);
        router.push("/dashboard");
      }
      if (result && result?.data === "invalid") {
        toast.error("invalid credentials");
      }
      if (result && result?.data === "exists") {
        toast.error("User already exist");
      }
      if (result && result?.data === "dontexist") {
        toast.error("User dont exist");
      }
    } catch (error) {
      toast.error("Error");
      setLoading(false);
    }
  };

  return (
    <div className=" w-full min-h-screen flex items-center justify-center">
      <div className=" bg-white rounded-xl p-7 flex flex-col gap-4 justify-center items-center">
        <p className=" text-const2 text-xl font-extrabold">
          {formRoute === "register"
            ? "Weather App Registration"
            : "Weather App Login"}
        </p>
        {/* input 1 */}
        {formRoute === "register" && (
          <div className=" bg-const w-[350px] max350:w-[300px] h-12 rounded-2xl shadow-inner">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className=" placeholder:text-sm w-full h-11 bg-transparent bodyInfo text-text placeholder:text-text rounded-2xl outline-none p-3"
              placeholder="Username"
            />
          </div>
        )}
        {/* input 2 */}
        <div className=" bg-const w-[350px] max350:w-[300px] h-12 rounded-2xl shadow-inner">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className=" placeholder:text-sm w-full h-11 bg-transparent bodyInfo text-text placeholder:text-text rounded-2xl outline-none p-3"
            placeholder="Email"
          />
        </div>
        {/* input 3 */}
        <div className=" flex items-center justify-between bg-const w-[350px] max350:w-[300px] h-12 rounded-2xl shadow-inner">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            ref={passwordRef}
            type="password"
            className=" placeholder:text-sm w-[90%] h-11 bg-transparent bodyInfo text-text placeholder:text-text rounded-2xl outline-none p-3"
            placeholder="Password"
          />
          {!passwordVisible ? (
            <FaEye
              onClick={passwordVisibility}
              className=" mr-3 w-5 h-5 cursor-pointer text-const3"
            />
          ) : (
            <FaEyeSlash
              onClick={passwordVisibility}
              className=" mr-3 w-5 h-5 cursor-pointer text-const3"
            />
          )}
        </div>
        {/* link */}
        {formRoute === "register" && (
          <div className=" flex items-center gap-1">
            <p>Already have an account?</p>
            <p
              onClick={() => setFormRoute("login")}
              className=" cursor-pointer"
            >
              Singn in
            </p>
          </div>
        )}
        {formRoute === "login" && (
          <div className=" flex items-center gap-1">
            <p>Dont have an account?</p>
            <p
              onClick={() => setFormRoute("register")}
              className=" cursor-pointer"
            >
              Singn up
            </p>
          </div>
        )}
        {/* submit */}
        {formRoute === "register" && (
          <div
            onClick={handleForm}
            className="p-2 pl-7 pr-7 cursor-pointer bg-gradient center text-white rounded-xl"
          >
            {loading ? <Spinner /> : "Singn up"}
          </div>
        )}
        {formRoute === "login" && (
          <div
            onClick={handleForm}
            className="p-2 pl-7 pr-7 cursor-pointer bg-gradient center text-white rounded-xl"
          >
            {loading ? <Spinner /> : "Singn in"}
          </div>
        )}
      </div>
    </div>
  );
}
