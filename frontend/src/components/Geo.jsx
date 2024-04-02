import React from "react";
import { geocoding } from "gebetamap";

const Geo = async (locat) => {
  console.log("geolocate", locat);
  const geom = await geocoding(locat, process.env.REACT_APP_GEBETA);
  return geom;
};

export default Geo;
