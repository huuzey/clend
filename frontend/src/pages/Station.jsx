import React from "react";
import { CiStar } from "react-icons/ci";
import { IoLocationSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Station = ({ main }) => {
  var setrate = "";
  const navigate = useNavigate();
  const rateFun = () => {
    switch (main?.rating) {
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
        return (setrate = 0);
    }
  };
  rateFun();
  return (
    <a
      onClick={() => navigate(`/fuelstation/${main._id}`)}
      className=" singlestation overflow-hidden flex flex-col rounded-md  shadow-green-200 mb-2 shadow-md"
    >
      <div>
        <img
          src={main.image}
          alt="station"
          className=" stationimage object-cover overflow-hidden w-[300px]  h-[200px] rounded-md"
        />
      </div>
      <div className="mt-2 flex text-black justify-between mr-2 items-center">
        <p className="ml-1">{main.rating === 0 ? "Not rated" : setrate}</p>
        <div className="flex justify-center items-center gap-1">
          <IoLocationSharp />

          <p>{main.location}</p>
        </div>
      </div>
    </a>
  );
};

export default Station;
