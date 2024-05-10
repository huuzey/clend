import React from "react";
import Section from "./Section";
import petrofast from "./../assets/petrofast.jpg";
import strategic from "./../assets/strategic.jpg";
import shoper from "./../assets/shoper.jpg";

const Hero = () => {
  return (
    <div className="grid grid-cols-3  mt-6 mx-5  mb-5 gap-5">
      <div>
        <Section
          hre="/fuelstations"
          img={petrofast}
          text="DISCOVER THE GAS STATIONS OUT THERE!"
          num="153"
          qout="GAS STATIONS IN ADDIS ABABA"
        />
      </div>
      <div>
        <Section
          num="12"
          qout="SUBCITIES ACCESS"
          hre="/report"
          img={strategic}
          text="EXPLORE AND REPORT THE ROAD SITUATION!"
        />
      </div>
      <div>
        <Section
          num="210"
          qout="VENDORS"
          hre="/market"
          img={shoper}
          text="TAKE WHATEVER YOU WANT FROM THE MARKETPLACE!"
        />
      </div>
    </div>
  );
};

export default Hero;
