import React, { useState } from "react";
import logo from "../assets/petroself.jpg";
import { useLocation } from "react-router-dom";

const Header = () => {
  const { pathname } = useLocation();
  const [expand, setExpand] = useState(false);
  return (
    <div className="flex headercontainer z-10 justify-between rounded-lg sticky top-0 border-b-[#4ef542] border-b-[1.5px] text-[#4ef542] bg-white   items-center w-[100%] ">
      <div className="py-2 px-3 flex logo gap-2">
        <img src={logo} alt="logo" className="rounded-lg w-11 h-11" />
        <h1 className="text-2xl self-center">መንደያ</h1>
      </div>
      <div className="flex gap-4 fues ">
        <a href="#">Fuel Station</a>
        <p
          className="flex "
          onMouseOver={() => {
            setExpand(true);
          }}
          onMouseLeave={() => {
            setExpand(false);
          }}
        >
          Road
          {expand && (
            <span className="mt-6 bg-white p-3 gap-2  flex flex-col rounded-md ml-4 fixed">
              <a href="#">Report</a>
              <a href="#">Explore</a>
            </span>
          )}
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-4 h-4 mt-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
        </p>
        <a href="#">Market</a>
      </div>
      <div className="pr-4 gap-4 flex  ">
        {pathname !== "/register" && (
          <button className=" butt text-[11px] font-bold bg-transparent border-[1px] border-[#4ef542] py-2 px-7 rounded-3xl">
            <a href="/register">Sign Up</a>
          </button>
        )}
        {pathname !== "/login" && (
          <button className=" butt text-[11px] font-bold bg-transparent border-[1px] border-[#4ef542] py-2 px-7 rounded-3xl">
            <a href="/login">Login</a>
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
