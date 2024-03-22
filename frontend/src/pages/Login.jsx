import React, { useState } from "react";
import { app } from "../firebase";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL } from "./Register";
import { setcurrentuser } from "../app/userslice";

const Login = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [firebase, setFirebase] = useState(false);

  const dispatch = useDispatch();
  const { email: curemail } = useSelector((state) => state.user);
  const [inputdata, setInputdata] = useState({
    email: curemail ? curemail : "",
    password: "",
  });

  if (currentUser?.rest?._id) {
    navigate("/");
    return;
  }

  const inputfun = (e) => {
    setInputdata({ ...inputdata, [e.target.name]: e.target.value });
  };
  const inputfire = (name, val) => {
    setInputdata({ ...inputdata, [name]: val });
  };
  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!inputdata.email || !inputdata.password) {
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
    if (inputdata.email && inputdata.password) {
      try {
        const response = await fetch(`${BASE_URL}/user/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(inputdata),
        });
        const data = await response.json();
        if (data === "email or password") {
          toast("Email or Password incorrect!", {
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
          return;
        }
        if (data === "Successfully logged") {
          toast("Successfully Logged In!", {
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
        }
        console.log("data", data);
        setLoading(false);
        dispatch(setcurrentuser(data));
        navigate("/");
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
          <h1 className=" logintex text-[18px] font-bold">Login</h1>

          {!firebase && !curemail && (
            <input
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
            type="password"
            placeholder="Password"
            value={setInputdata.password}
            name="password"
            onChange={(e) => {
              inputfun(e);
            }}
            className="password px-4 py-1 placeholder:font-bold placeholder:text-[10px] placeholder:text-[#4ef542] w-[100%] "
          />
          <button
            type="submit"
            disabled={loading}
            className=" disabled:cursor-progress disabled:opacity-40 butt text-[13px] font-bold bg-transparent border-[1px] border-[#4ef542] py-2 px-7 rounded-3xl"
          >
            {loading ? "Submitting" : "Submit"}
          </button>
          {!firebase ||
            (!curemail && (
              <button
                onClick={handleGoogle}
                type="button"
                className="  butt text-[13px] flex  justify-center items-center gap-2 font-bold bg-transparent border-[1px] border-[#4ef542] py-2 px-7 rounded-3xl"
              >
                <AiFillGoogleCircle /> Continue with Google
              </button>
            ))}
          <p className="text-[13px] dont">
            Don't have an account?{" "}
            <a href="/register" className="font-bold">
              Register
            </a>
          </p>
        </div>
      </form>
      <ToastContainer />;
    </div>
  );
};

export default Login;
