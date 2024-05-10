import React, { useState } from "react";

const Report = () => {
  const [place, setPlace] = useState("");
  const [selectedValue, setSelectedValue] = useState("Crowded");

  // Function to handle change in select value
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handlereport = async()=>{

  }
  return (
    <div className="mt-2 mx-8">
      <div className="">
        <form
          action=""
          onSubmit={handlereport}
          className="flex justify-center items-center gap-7 w-fit"
        >
          <div>
            <input
              type="text"
              placeholder="Location . . ."
              value={place}
              name="location"
              onChange={(e) => {
                setPlace(e.target.value);
              }}
              className="password px-4 py-1   placeholder:font-bold placeholder:text-[10px] placeholder:text-[#1a2f19] w-[100%] "
            />{" "}
          </div>
          <div className="select-container self-center place-items-center text-center ">
            <label htmlFor="status" className="mr-3 text-nowrap mt-4">
              Select status:
            </label>
            <select
              id="status"
              value={selectedValue}
              onChange={handleChange}
              className="select mt-5 text-sm"
            >
              <option value="Crowded">Crowded</option>
              <option value="Under construction">Under construction</option>
              <option value="Temporarily Onhold">Temporarily Onhold</option>
              <option value="Out of service">Out of service</option>
            </select>
          </div>
          <button
            type="submit"
            className="  butt text-[13px] flex  justify-center items-center gap-2 font-bold bg-transparent border-[1px] border-[#4ef542] text-[#1a2f19]  py-2 px-7 rounded-3xl"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Report;
