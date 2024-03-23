import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BASE_URL } from "./Register";
import Station from "./Station";
import { CiStar } from "react-icons/ci";

const Fuelstations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [location, setLocation] = useState("");
  const [service, setService] = useState("");
  const [station, setStation] = useState([]);
  useEffect(() => {
    setLoading(true);
    const fuelstation = async () => {
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
    if (location && service) {
      try {
        const response = await fetch(
          `${BASE_URL}/station/search?location=${location}?service=${service}`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        setStation(data.rest);
        console.log("searchstation", station);
        console.log("searchdata", data);
      } catch (error) {
        console.log(error);
      }
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
  if (station === "Something went wrong!") {
    return (
      <div className="flex items-center mt-10 justify-center font-bold text-center text-3xl text-[#4ef542]">
        Something went wrong!
      </div>
    );
  }
  return (
    <div className="mt-5 ml-4 mr-4">
      <div className="flex justify-start items-center gap-4">
        <form
          onSubmit={handleSearch}
          className="flex justify-start items-center gap-4"
        >
          <input
            required
            type="text"
            placeholder="Location . . ."
            value={location}
            name="location"
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            className="password px-4 py-1 placeholder:font-bold placeholder:text-[10px] placeholder:text-[#4ef542] w-[100%] "
          />
          <input
            required
            type="text"
            placeholder="Service-item . . ."
            value={service}
            name="service"
            onChange={(e) => {
              setService(e.target.value);
            }}
            className="password px-4 py-1 placeholder:font-bold placeholder:text-[10px] placeholder:text-[#4ef542] w-[100%] "
          />
          <button
            type="submit"
            className="  butt text-[13px] flex  justify-center items-center gap-2 font-bold bg-transparent border-[1px] border-[#4ef542] text-[#4ef542]  py-2 px-7 rounded-3xl"
          >
            Search
          </button>
        </form>
      </div>
      <div className="grid grid-cols-4 gap-3 w-full mt-4 mr-2">
        {station.length !== 0 &&
          station?.map((stat) => <Station main={stat} key={stat._id} />)}
      </div>
    </div>
  );
};

export default Fuelstations;
