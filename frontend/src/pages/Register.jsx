import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";

import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
import Oauth from "../components/Oauth";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setcurrentuser } from "../app/userslice";
export const BASE_URL = "http://localhost:4000";
const Register = () => {
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);
  if (currentUser._id) {
    navigate("/");
    return;
  }

  const dispatch = useDispatch();
  const [inputdata, setInputdata] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [firebase, setFirebase] = useState(false);

  const inputfun = (e) => {
    setInputdata({ ...inputdata, [e.target.name]: e.target.value });
  };
  const inputfire = (name, val) => {
    setInputdata({ ...inputdata, [name]: val });
  };
  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    if (!re.test(inputdata.phone)) {
      toast("Phone number is not correct!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        type: "error",
      });
      setLoading(false);
      return;
    }
    if (
      !inputdata.username ||
      !inputdata.email ||
      !inputdata.password ||
      !inputdata.phone ||
      !inputdata.address
    ) {
      setLoading(false);
      toast("All Fields are required!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        type: "error",
      });
    }
    if (
      inputdata.username &&
      inputdata.email &&
      inputdata.password &&
      inputdata.phone &&
      inputdata.address
    ) {
      try {
        const response = await fetch(`${BASE_URL}/user/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(inputdata),
        });
        const data = await response.json();
        if (data === "user existed") {
          toast("user existed", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            type: "error",
          });

          setLoading(false);
          return;
        }
        if (data === "Successfully registered") {
          toast("Successfully Registered!", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            type: "success",
          });

          dispatch(setEmail(inputdata.email));

          navigate("/login");
          setLoading(false);
        }
        console.log(data);
      } catch (error) {
        setLoading(false);
        toast("Something went wrong!", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          type: "error",
        });

        console.log("catch");
        console.log(error);
      }
    }
  };
  const auth = getAuth(app);
  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultformgoogle = await signInWithPopup(auth, provider);
      inputfire("username", resultformgoogle.user.displayName);
      inputfire("email", resultformgoogle.user.email);
      setFirebase(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="logincontainer justify-center flex  items-center">
      <form onSubmit={submitHandler}>
        <div className=" unlogin  shadow-inner shadow-blue-500 flex  p-4 justify-end items-center flex-col gap-6 text-[#4ef542]  bg-transparent backdrop-blur-[16px]">
          <h1 className=" logintex text-[18px] font-bold">Register</h1>
          <input
            required
            type="text"
            value={setInputdata.username}
            name="username"
            onChange={(e) => {
              inputfun(e);
            }}
            placeholder="Username"
            className="email px-4 py-1 placeholder:font-bold placeholder:text-[10px] placeholder:text-[#78f376] w-[100%] "
          />
          {!firebase && (
            <input
              required
              type="email"
              value={setInputdata.email}
              name="email"
              onChange={(e) => {
                inputfun(e);
              }}
              placeholder="Email"
              className="email px-4 py-1 placeholder:font-bold placeholder:text-[10px] placeholder:text-[#78f376] w-[100%] "
            />
          )}
          <input
            required
            type="password"
            placeholder="Password"
            value={setInputdata.password}
            name="password"
            onChange={(e) => {
              inputfun(e);
            }}
            className="password px-4 py-1 placeholder:font-bold placeholder:text-[10px] placeholder:text-[#4ef542] w-[100%] "
          />
          <input
            required
            type="phone"
            value={setInputdata.phone}
            name="phone"
            onChange={(e) => {
              inputfun(e);
            }}
            placeholder="Phone Number"
            className="password px-4 py-1 placeholder:font-bold placeholder:text-[10px] placeholder:text-[#4ef542] w-[100%] "
          />
          <input
            required
            value={setInputdata.address}
            name="address"
            onChange={(e) => {
              inputfun(e);
            }}
            type="text"
            placeholder="Address"
            className="password px-4 py-1 placeholder:font-bold placeholder:text-[10px] placeholder:text-[#4ef542] w-[100%] "
          />
          <button
            type="submit"
            disabled={loading}
            className=" disabled:cursor-progress disabled:opacity-40 butt text-[13px] font-bold bg-transparent border-[1px] border-[#4ef542] py-2 px-7 rounded-3xl"
          >
            {loading ? "Submitting" : "Submit"}
          </button>
          {!firebase && (
            <button
              onClick={handleGoogle}
              type="button"
              className="  butt text-[13px] flex  justify-center items-center gap-2 font-bold bg-transparent border-[1px] border-[#4ef542] py-2 px-7 rounded-3xl"
            >
              <AiFillGoogleCircle /> Continue with Google
            </button>
          )}
          <p className="text-[13px] dont">
            Already have an account?{" "}
            <a href="/login" className="font-bold">
              Login
            </a>
          </p>
        </div>
      </form>
      <ToastContainer />;
    </div>
  );
};

export default Register;
