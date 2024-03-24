import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "./Register";
import { CiStar } from "react-icons/ci";

const Fuel = () => {
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fuel, setFuel] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchfuel = async () => {
      try {
        const response = await fetch(`${BASE_URL}/station/singlefuel/${id}`, {
          method: "GET",
        });
        const data = await response.json();

        if (data === "Something went wrong!") {
          setError(true);
          return;
        }
        setError(false);

        setFuel(data.rest);
        console.log("fuel", fuel);

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
  var setrate = "";

  const rateFun = () => {
    switch (fuel?.rating) {
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
  if (fuel === "Something went wrong!") {
    return (
      <div className="flex items-center mt-10 justify-center font-bold text-center text-3xl text-[#4ef542]">
        Something went wrong!
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-start items-start mx-6 my-5 text-[#4ef542]">
      <div className="flex justify-between items-center">
        {/* detail about the gas station */}
        <div className="flex flex-col justify-start items-start gap-4">
          <div className="text-center mb-2">
            <h1 className="text-4xl flex justify-center items-center gap-3 flex-row text-center text-[#4ef542]">
              {fuel?.name}{" "}
              <span className="text-gray-300 mt-2 ml-2 ">{setrate}</span>{" "}
              <span className="text-lg">({fuel?.rating})</span>
            </h1>
          </div>
          <div className="flex justify-center items-center ">
            <img
              src={fuel?.image}
              alt="upload"
              className="fuelimage object-cover overflow-hidden w-[350px]  h-[250px] rounded-md "
            />
          </div>
          <div className="text-center">
            <div className="justify-between flex w-full px-1  items-center gap-3">
              <div className="justify-center flex  items-center gap-3">
                <p>Benzene</p>
                <input
                  onChange={() => {}}
                  type="checkbox"
                  checked={fuel?.benzene}
                  name="benzene"
                  className="email px-4 py-1 placeholder:font-bold placeholder:text-[10px] placeholder:text-[#78f376] w-[100%] "
                />
              </div>
              <div className="justify-center flex  items-center gap-3">
                <p>Kerosene</p>
                <input
                  checked={fuel?.kerosene}
                  type="checkbox"
                  name="kerosene"
                  onChange={() => {}}
                  className="email px-4 py-1 placeholder:font-bold placeholder:text-[10px] placeholder:text-[#78f376] w-[100%] "
                />
              </div>
              <div className="justify-center flex  items-center gap-3">
                <p>Naphta</p>
                <input
                  onChange={() => {}}
                  checked={fuel?.naphta}
                  type="checkbox"
                  name="naphta"
                  className="email px-4 py-1 placeholder:font-bold placeholder:text-[10px] placeholder:text-[#78f376] w-[100%] "
                />
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="flex gap-4 justify-center items-center">
              <p>Cars waiting: {fuel.queue}</p>
            </div>
          </div>
        </div>
        {/* queue and payment */}
        <div></div>
      </div>
      {/* map */}
      <div></div>
    </div>
  );
};

export default Fuel;
