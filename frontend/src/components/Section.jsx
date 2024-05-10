import React from "react";
import { TypeAnimation } from "react-type-animation";
import CountUp from "react-countup";
import SlotCounter from "react-slot-counter";

const Section = ({ img, text, hre, qout, num }) => {
  return (
    <a href={hre} className="relative">
      <img
        src={img}
        alt="hero"
        className=" heros rounded-xl h-[250px] opacity-90"
      />
      <div className="absolute top-[10%] bottom-[50%] left-7 right-7 text-white text-lg font-bold flex ">
        {hre === "/market" ? (
          <div className="-mt-1 text-[#00ffff] text-3xl">
            <SlotCounter value={num} />+
          </div>
        ) : (
          <div className="text-[#00ffff] text-3xl">
            <CountUp end={num} useEasing={true} duration={3} />+
          </div>
        )}
        &nbsp; {qout}
      </div>
      <div className="absolute top-[40%] bottom-[50%] left-7 right-7  text-2xl font-bold ">
        <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed out once, initially
            `${text}`,
            1000,
            `${
              text === "EXPLORE THE ROAD SITUATION!"
                ? "REPORT THE ROAD SITUATION"
                : ""
            }`,
            1000,
          ]}
          wrapper="span"
          speed={50}
          style={{ fontSize: "1em", display: "inline-block", color: "aqua" }}
          repeat={Infinity}
        />
      </div>
    </a>
  );
};

export default Section;
