import React, { useState } from "react";
import logo from "../assets/petroself.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsFillFuelPumpDieselFill } from "react-icons/bs";
import { GiFuelTank } from "react-icons/gi";

import { GrUserAdmin } from "react-icons/gr";
import { setController } from "../app/userslice";

const Header = () => {
  const { currentUser, controller } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [expand, setExpand] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="flex headercontainer z-10 justify-between rounded-lg sticky top-0 border-b-[#4ef542] border-b-[1.5px] text-[#4ef542] bg-white   items-center w-[100%] ">
      <a href="/" className="py-2 px-3 flex logo gap-2">
        <img src={logo} alt="logo" className="rounded-lg w-11 h-11" />
        <h1 className="text-2xl self-center">መንደያ</h1>
      </a>
      <div className="flex gap-4 fues ">
        {!pathname === "/fuelstations" && (
          <a href="/fuelstations" className="cursor-pointer">
            Fuel Station
          </a>
        )}
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
      <div className="flex justify-center items-center  gap-2">
        {currentUser?.rest?.fuel ? (
          <>
            <button
              onClick={() => {
                navigate(`/fuelcontrol/${currentUser?.fuelId?._id}`);
              }}
              className=" butt text-[11px] font-bold bg-transparent border-[1px] border-[#4ef542] py-2 px-7 rounded-3xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-3 h-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                />
              </svg>
            </button>
          </>
        ) : (
          ""
        )}
        {currentUser?.rest?._id ? (
          <div className="flex justify-center items-center mr-6 gap-2">
            {currentUser.isAdmin && (
              <button className=" butt text-[11px] font-bold bg-transparent border-[1px] border-[#4ef542] py-2 px-7 rounded-3xl">
                <BsFillFuelPumpDieselFill />
              </button>
            )}
            {currentUser?.rest?.email === "weleladinsefa@gmail.com" && (
              <>
                {" "}
                {pathname !== "/topadmin" && (
                  <button
                    onClick={() => {
                      navigate("/topadmin");
                    }}
                    className=" butt text-[11px] font-bold bg-transparent border-[1px] border-[#4ef542] py-2 px-7 rounded-3xl"
                  >
                    <GrUserAdmin />
                  </button>
                )}
              </>
            )}
            <h1>{currentUser.rest.username}</h1>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default Header;
