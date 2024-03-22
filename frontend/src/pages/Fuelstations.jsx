import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BASE_URL } from "./Register";

const Fuelstations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [station, setStation] = useState(null);
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
        setStation({
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
    fuelstation();
  }, []);
  return <div>Fuelstations</div>;
};

export default Fuelstations;
