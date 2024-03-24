import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "./Register";
import { setcurrentuser } from "../app/userslice";
import { CiStar } from "react-icons/ci";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Fuelcontrol = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [control, setControl] = useState({
    naphta: false,
    kerosene: false,
    benzene: false,
    queue: 0,
    name: "",
    rating: 0,
    image: "",
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  var setrate = "";
  useEffect(() => {
    setLoading(true);
    const fetchfuel = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/user/fuelcontrol/${currentUser?.fuelId?._id}/${currentUser?.rest?.email}`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        setError(false);
        if (data === "Doen't exist") {
          navigate("/");
          return;
        }
        if (data === "Something went wrong!") {
          setError(true);
          return;
        }
        setControl({
          naphta: data?.naphta,
          benzene: data?.benzene,
          kerosene: data?.kerosene,
          queue: data?.queue,
          name: data?.name,
          rating: data?.rating,
          image: data?.image,
        });
        console.log("control", control);

        setLoading(false);
        console.log("fuelcontrol", data);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    };
    fetchfuel();
  }, []);

  const handleUpdate = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const response = await fetch(
        `${BASE_URL}/user/fuelupdate/${currentUser?.fuelId?._id}/${currentUser?.rest?._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(control),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast("Successfully Updated!", {
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
      setError(false);

      if (data === "Something went wrong!") {
        setError(true);
        return;
      }
      console.log("updated data", data);
      setControl({
        naphta: data?.naphta,
        benzene: data?.benzene,
        kerosene: data?.kerosene,
        queue: data?.queue,
        name: data?.name,
        rating: data?.rating,
        image: data?.image,
      });
      setLoading(false);
      console.log("updated", control);
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
  };
  const rateFun = () => {
    switch (control?.rating) {
      case 1:
        setrate = (
          <div className="flex">
            <CiStar className="ratecont" />
            <CiStar />
            <CiStar />
            <CiStar />
            <CiStar />
          </div>
        );

        break;
      case 2:
        setrate = (
          <div className="flex">
            <CiStar className="ratecont" />
            <CiStar className="ratecont" />
            <CiStar />
            <CiStar />
            <CiStar />
          </div>
        );

        break;
      case 3:
        setrate = (
          <div className="flex">
            <CiStar className="ratecont" />
            <CiStar className="ratecont" />
            <CiStar className="ratecont" />
            <CiStar />
            <CiStar />
          </div>
        );

        break;
      case 4:
        setrate = (
          <div className="flex">
            <CiStar className="ratecont" />
            <CiStar className="ratecont" />
            <CiStar className="ratecont" />
            <CiStar className="ratecont" />
            <CiStar />
          </div>
        );

        break;
      case 5:
        setrate = (
          <div className="flex">
            <CiStar className="ratecont" />
            <CiStar className="ratecont" />
            <CiStar className="ratecont" />
            <CiStar className="ratecont" />
            <CiStar className="ratecont" />
          </div>
        );

        break;
      default:
        return 0;
    }
  };
  rateFun();
  const inputfun = (en) => {
    if (en === "ben") {
      return setControl({ ...control, benzene: !control.benzene });
    }

    if (en === "ker") {
      setControl({ ...control, kerosene: !control.kerosene });
      return;
    }
    if (en === "nap") {
      setControl({ ...control, naphta: !control.naphta });
      return;
    }
  };
  if (error) {
    return (
      <div className="flex items-center mt-10 justify-center font-bold text-center text-3xl text-[#4ef542]">
        Something went wrong! please refresh the page.
      </div>
    );
  }
  if (loading) {
    return (
      <div className="flex items-center mt-10 justify-center font-bold text-center text-3xl text-[#4ef542]">
        Loading...
      </div>
    );
  }
  if (control === "Something went wrong!") {
    return (
      <div className="flex items-center mt-10 justify-center font-bold text-center text-3xl text-[#4ef542]">
        Something went wrong!
      </div>
    );
  }
  return (
    <div className="flex justify-evenly items-center text-[#4ef542] gap-8 flex-col  my-8 w-full">
      <form
        onSubmit={handleUpdate}
        className="flex justify-evenly items-center text-[#4ef542] gap-8 flex-col mx-10 my-8 w-full"
      >
        <div className="text-center">
          <h1 className="text-4xl flex justify-center items-center gap-3 flex-row text-center text-[#4ef542]">
            {control?.name}{" "}
            <span className="text-gray-300 mt-2 ">{setrate}</span>{" "}
            <span className="text-lg">({control?.rating})</span>
          </h1>
        </div>
        <div className="flex justify-center items-center ">
          <img
            src={control?.image}
            alt="upload"
            className="w-[300px]  h-[200px] rounded-md "
          />
        </div>
        <div className="text-center">
          <div className="justify-between flex w-full px-1  items-center gap-3">
            <div className="justify-center flex  items-center gap-3">
              <p>Benzene</p>
              <input
                type="checkbox"
                checked={control?.benzene}
                name="benzene"
                onChange={() => {
                  inputfun("ben");
                }}
                className="email px-4 py-1 placeholder:font-bold placeholder:text-[10px] placeholder:text-[#78f376] w-[100%] "
              />
            </div>
            <div className="justify-center flex  items-center gap-3">
              <p>Krosene</p>
              <input
                checked={control?.kerosene}
                type="checkbox"
                name="kerosene"
                onChange={() => {
                  inputfun("ker");
                }}
                className="email px-4 py-1 placeholder:font-bold placeholder:text-[10px] placeholder:text-[#78f376] w-[100%] "
              />
            </div>
            <div className="justify-center flex  items-center gap-3">
              <p>Naphta</p>
              <input
                checked={control?.naphta}
                type="checkbox"
                name="naphta"
                onChange={() => {
                  inputfun("nap");
                }}
                className="email px-4 py-1 placeholder:font-bold placeholder:text-[10px] placeholder:text-[#78f376] w-[100%] "
              />
            </div>
          </div>
        </div>
        <div className="text-center">
          <div className="flex gap-4 justify-center items-center">
            <p>Cars waiting:</p>
            <input
              type="number"
              min={1}
              value={control.queue}
              name="queue"
              onChange={(e) => {
                setControl({ ...control, queue: e.target.value });
              }}
              className="password px-4 py-1 placeholder:font-bold placeholder:text-[10px] placeholder:text-[#4ef542] w-[30%] "
            />
          </div>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="  butt text-[13px] flex  justify-center items-center gap-2 font-bold bg-transparent border-[1px] border-[#4ef542] py-2 px-7 rounded-3xl"
          >
            Update
          </button>
        </div>
      </form>
      <ToastContainer />;
    </div>
  );
};

export default Fuelcontrol;
