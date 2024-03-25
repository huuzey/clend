import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BASE_URL } from "./Register";
import Station from "./Station";
import { CiStar } from "react-icons/ci";
import { ToastContainer, toast } from "react-toastify";

const Fuelstations = () => {
  const [loading, setLoading] = useState(false);
  const [station, setStation] = useState([]);

  const [benzene, setBenzene] = useState(false);
  const [kerosene, setKerosene] = useState(false);
  const [naphta, setNaphta] = useState(false);
  const [error, setError] = useState("");
  const [location, setLocation] = useState("");
  useEffect(() => {
    const fuelstation = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/station/all`, {
          method: "GET",
        });
        const data = await response.json();
        setError(false);
        if (data === "Something went wrong!") {
          setError(true);
          return;
        }
        if (response.ok) {
          setStation(data?.rest);
          console.log("stations", station);
        }

        setLoading(false);
        console.log("stationfetched", data?.rest);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    };
    fuelstation();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!location && !benzene && !kerosene && !naphta) {
      toast("Enter at least one field!", {
        position: "top-right",
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
    if (location || benzene || kerosene || naphta) {
      setLoading(true);
      setKerosene(false);
      setNaphta(false);
      setBenzene(false);
      setLocation("");

      try {
        const response = await fetch(
          `${BASE_URL}/station/search?location=${location}&${
            kerosene ? "kerosene=true" : ""
          }&${benzene ? "benzene=true" : ""}&${naphta ? "naphta=true" : ""}`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        setStation(data.rest);
        console.log("searchstation", station);
        console.log("searchdata", data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };
  if (error) {
    return (
      <div className="flex items-center mt-10 justify-center font-bold text-center text-3xl text-[#1a2f19]">
        Something went wrong! please refresh the page.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center mt-10 justify-center font-bold text-center text-3xl text-[#1a2f19]">
        Loading...
      </div>
    );
  }
  if (station === "Something went wrong!") {
    return (
      <div className="flex items-center mt-10 justify-center font-bold text-center text-3xl text-[#1a2f19]">
        Something went wrong!
      </div>
    );
  }
  return (
    <div className="mt-5 ml-4 mr-4">
      <div className="flex justify-start items-start gap-4 flex-col">
        <form
          onSubmit={handleSearch}
          className="flex justify-start items-center gap-4"
        >
          <input
            type="text"
            placeholder="Location . . ."
            value={location}
            name="location"
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            className="password px-4 py-1   placeholder:font-bold placeholder:text-[10px] placeholder:text-[#1a2f19] w-[100%] "
          />

          <div className="justify-center flex  text-[#1a2f19]  items-center gap-3">
            <p>Benzene</p>
            <input
              type="checkbox"
              value={benzene}
              name="benzene"
              onChange={() => {
                setBenzene(!benzene);
              }}
              className="email px-4 py-1   mt-[5px] placeholder:font-bold placeholder:text-[10px] placeholder:text-[#78f376] w-[100%] "
            />
          </div>
          <div className="justify-center  text-[#1a2f19]  flex  items-center gap-3">
            <p>Kerosene</p>
            <input
              type="checkbox"
              value={kerosene}
              name="kerosene"
              onChange={() => {
                setKerosene(!kerosene);
              }}
              className="email px-4 py-1   mt-[5px] placeholder:font-bold placeholder:text-[10px] placeholder:text-[#78f376] w-[100%] "
            />
          </div>
          <div className="justify-center flex  text-[#1a2f19]   items-center gap-3">
            <p>Naphta</p>
            <input
              type="checkbox"
              value={naphta}
              name="naphta"
              onChange={() => {
                setNaphta(!naphta);
              }}
              className="email px-4 py-1 mt-[5px] placeholder:font-bold placeholder:text-[10px] placeholder:text-[#78f376] w-[100%] "
            />
          </div>

          <button
            type="submit"
            className="  butt text-[13px] flex  justify-center items-center gap-2 font-bold bg-transparent border-[1px] border-[#1a2f19] text-[#1a2f19]  py-2 px-7 rounded-3xl"
          >
            Search
          </button>
        </form>
      </div>
      {station.length === 0 && (
        <div className="flex items-center mt-10 justify-center font-bold text-center text-3xl text-[#1a2f19]">
          Sorry, couldn't find a service matching your demand!
        </div>
      )}
      <div className="grid grid-cols-4 text-center mt-10 self-center mx-auto gap-3 w-full  mr-2 mb-4">
        {station.length !== 0 &&
          station?.map((stat) => <Station main={stat} key={stat._id} />)}
      </div>
      <ToastContainer />;
    </div>
  );
};

export default Fuelstations;
