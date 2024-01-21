"use client";

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import baseUrl from "../network/baseUrl";

import { useRouter } from "next/navigation";

const page = () => {
  const api_key = "99d890f1ba34d7cc74403ed8c9dac136";
  const router = useRouter();

  const [searchInput, setSearchInput] = useState("");
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    const email = localStorage.getItem("email");

    const handleForm = async () => {
      try {
        const result = await axios.post(`${baseUrl}/isloggedin`, {
          email,
        });

        if (result && result?.data === "true") {
          return;
        }
      } catch (error) {
        router.push("/");
      }
      router.push("/");
    };
    handleForm();

    const getWeather = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${"nigeria"}&units=metric&appid=${api_key}`;
      const response = await axios.get(url);
      setWeatherData(response.data);
    };
    getWeather();
  }, []);

  const getWeather = async () => {
    setSearchInput("");
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=metric&appid=${api_key}`;
    const response = await axios.get(url);
    setWeatherData(response.data);
  };

  return (
    <div className=" relative w-full min-h-screen flex flex-col gap-7 justify-center items-center p-5">
      {/* logout */}
      <div
        onClick={async () => {
          const email = localStorage.getItem("email");
          try {
            const result = await axios.post(`${baseUrl}/logout`, {
              email,
            });

            if (result && result?.data === "true") {
              router.push("/");
            }
          } catch (error) {
            return;
          }
        }}
        className=" absolute top-5 right-5 p-2 pl-7 pr-7 cursor-pointer bg-white center text-const3 rounded-xl"
      >
        Log out
      </div>
      <div className=" justify-center w-full flex items-center gap-4">
        {/* input */}
        <div className=" bg-white w-full md:w-[350px] max350:w-[300px] h-12 rounded-2xl shadow-inner">
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            className=" placeholder:text-sm w-full h-11 bg-transparent bodyInfo text-text placeholder:text-text rounded-2xl outline-none p-3"
            placeholder="Search for weather"
          />
        </div>
        {/* search */}
        <div
          onClick={() => getWeather()}
          className=" cursor-pointer bg-white w-12 h-12 rounded-full center fullShadow"
        >
          <FaSearch className="text-const3" />
        </div>
      </div>
      {/* cloud */}
      <Image src={"/cloud.png"} alt="cloud" width={100} height={100} />
      {/* celcius */}
      <p className=" text-white font-extrabold text-5xl">
        {weatherData?.main?.temp}° C
      </p>
      {/* location */}
      <p className=" text-white font-extrabold text-xl">{weatherData?.name}</p>
      {/* last things */}
      <div className=" flex w-full md:w-1/2 justify-between items-center">
        <div className=" flex items-center gap-1">
          <Image src={"/humidity.webp"} alt="cloud" width={70} height={70} />
          <div className=" flex flex-col items-center">
            <p>{weatherData?.main?.humidity}%</p>
            <p>Humidity Level</p>
          </div>
        </div>
        <div className=" flex items-center gap-1">
          <Image src={"/wind.webp"} alt="cloud" width={90} height={90} />
          <div className=" flex flex-col items-center">
            <p>{weatherData?.wind?.speed}Km/hr</p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
