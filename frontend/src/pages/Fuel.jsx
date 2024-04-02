import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "./Register";
import { CiStar } from "react-icons/ci";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Rating from "../components/Rating";
import RatSub from "../components/RateSub";
// import { geocoding } from "gebetamap";

import { IoLocationSharp } from "react-icons/io5";
import Geo from "../components/Geo";

const Fuel = () => {
  const { id } = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(0);
  const [already, setAlready] = useState(false);
  const [local, setLocal] = useState("");
  const [sub, setSub] = useState([]);
  const [one, setOne] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
    five: false,
  });
  const [fuel, setFuel] = useState({
    image: "",
    kerosene: false,
    benzene: false,
    location: "",
    rating: 0,
    queue: 0,
    naphta: false,
    name: "",
  });
  const [val, setVal] = useState(0);
  const [werefa, setWerefa] = useState();
  const [long, setLong] = useState(false);
  const [werefainput, setWerefainput] = useState(false);
  const [place, setPlace] = useState();
  const [reserves, setReserves] = useState(false);
  useEffect(() => {
    const fetchwerefa = async () => {
      try {
        const response = await fetch(`${BASE_URL}/station/werefa/${id}`, {
          method: "GET",
        });
        const data = await response.json();

        if (response.ok) {
          setWerefa(data?.sorteda);
          if (data?.sorteda) {
            data?.sorteda.map((wef) => {
              if (wef.user === currentUser?.rest?._id) {
                setReserves(true);
              }
            });
          }
          console.log("werefa", werefa);
        }
        if (data === "Doesn't exist!") {
          setLong(true);
        }
        console.log("werefadata", data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchwerefa();
  }, []);
  useEffect(() => {
    setLoading(true);
    const fetchfuel = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/station/singlefuel/${id}/${currentUser?.rest?.email}`,
          {
            method: "GET",
          }
        );
        const data = await response.json();

        if (data === "Something went wrong!") {
          setError(true);
          return;
        }
        if (response.ok) {
          const userrated = data?.rest?.rating.find(
            (rattes) => rattes.user === currentUser?.rest?._id
          );
          if (userrated) {
            setAlready(true);
          }
        }
        setLocal(data?.rest?.location);
        if (data?.ems) {
          setAlready(true);
        }
        setError(false);
        const ress = Rating(data?.rest?.rating);
        setVal(ress);
        setSub(data?.rest?.rating);
        setFuel({
          image: data?.rest?.image,
          name: data?.rest?.name,
          location: data?.rest?.location,
          kerosene: data?.rest?.kerosene,
          benzene: data?.rest?.benzene,
          naphta: data?.rest?.naphta,
          rating: data?.rest?.rating?.value,
          queue: data?.rest?.queue,
        });
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
  const rateme = (pulp) => {
    switch (pulp) {
      case "one":
        setOne({ one: true });
        setValue(1);

        break;
      case "two":
        setOne({ one: true, two: true });
        setValue(2);

        break;
      case "three":
        setOne({ one: true, two: true, three: true });
        setValue(3);

        break;
      case "four":
        setOne({ one: true, two: true, three: true, four: true });
        setValue(4);

        break;
      case "five":
        setOne({ one: true, two: true, three: true, four: true, five: true });
        setValue(5);

        break;

      default:
        return;
    }
  };
  const rateFun = () => {
    switch (val) {
      case "1":
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
      case "2":
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
      case "3":
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
      case "4":
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
      case "5":
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

  const handlerate = async () => {
    if (!value) {
      toast("Give a rating value!", {
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
      return;
    }

    const rated = { userId: currentUser?.rest?._id, values: value };
    if (!currentUser?.rest?._id) {
      toast("You have to sign in to rate!", {
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
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/station/rateme/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rated),
      });
      setAlready(true);

      const data = await response.json();

      if (response.ok) {
        toast("Rated Successfully Thank You!", {
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
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  rateFun();
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
  if (fuel === "Something went wrong!") {
    return (
      <div className="flex items-center mt-10 justify-center font-bold text-center text-3xl text-[#1a2f19]">
        Something went wrong!
      </div>
    );
  }
  console.log("place", place);
  const handlewerefa = async () => {
    if (place < 50) {
      toast("Value should be greater than 50", {
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

      return;
    }
    console.log("clicks", currentUser?.rest?._id, place, id);
    try {
      const respond = await fetch(`${BASE_URL}/station/fuelowner/werefa`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: currentUser?.rest?._id,
          paid: false,
          amount: place,
          station: id,
        }),
      });
      console.log("clickedo");

      const data = await respond.json();
      if (respond.ok) {
        // data?.werefa?.map((we) => setWerefa(() => [...werefa, we]));
        setWerefa(data?.werefa);
        window.location.reload();

        console.log("werefa", werefa);
        setLong(false);
      }
      console.log("addedwerefa", data);
    } catch (error) {
      console.log(error);
    }
  };
  const updatewerefa = async () => {
    if (place < 50) {
      toast("Value should be greater than 50", {
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

      return;
    }
    if (werefa?.length === 3) {
      if (place < werefa[2].amount) {
        toast("The value should be at least greater than the third place. ", {
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

        return;
      }
    }
    console.log("clicks", currentUser?.rest?._id, place, id);
    try {
      const respond = await fetch(
        `${BASE_URL}/station/fuelowner/updatewerefa/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user: currentUser?.rest?._id,
            paid: false,
            amount: place,
          }),
        }
      );

      const data = await respond.json();
      if (respond.ok) {
        window.location.reload();
        data?.werefa?.map((we) => setWerefa(() => [...werefa, we]));

        console.log("werefa", werefa);
        setLong(false);
      }
      console.log("addedwerefa", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-start  items-start mx-6 my-5 text-[#1a2f19]">
      <div className="flex justify-between items-center gap-14">
        {/* detail about the gas station */}
        <div className="flex flex-col justify-start items-start gap-4">
          <div className="text-center mb-2">
            <h1 className="text-4xl flex font-bold justify-center items-center gap-3 flex-row text-center text-[#4ef542]">
              {fuel?.name}{" "}
              <span className="text-gray-300 mt-2 ml-2 ">{setrate}</span>{" "}
              <span className="text-lg">
                {fuel?.rating ? fuel?.rating : ""}
              </span>
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
                  onChange={() => {
                    console.log("object");
                  }}
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
                  onChange={() => {
                    console.log("object");
                  }}
                  className="email px-4 py-1 placeholder:font-bold placeholder:text-[10px] placeholder:text-[#78f376] w-[100%] "
                />
              </div>
              <div className="justify-center flex  items-center gap-3">
                <p>Naphta</p>
                <input
                  onChange={() => {
                    console.log("object");
                  }}
                  checked={fuel?.naphta}
                  type="checkbox"
                  name="naphta"
                  className="email px-4 py-1 placeholder:font-bold placeholder:text-[10px] placeholder:text-[#78f376] w-[100%] "
                />
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="flex gap-7 justify-between w-full  items-center">
              <p>Cars waiting: {fuel?.queue}</p>
              <div className="flex justify-center items-center gap-1">
                <IoLocationSharp />

                <p>{fuel?.location}</p>
              </div>
            </div>
          </div>
          {!already && (
            <div className="flex justify-center   items-center gap-[5px]">
              <p>
                Rate <span className="font-bold">{fuel?.name}:</span>
              </p>
              <div className="flex justify-center text-black  items-center gap-1">
                {" "}
                <CiStar
                  className={`${one.one ? "ratecont" : ""} w-7 h-7`}
                  onClick={() => {
                    rateme("one"), setValue(1);
                  }}
                />
                <CiStar
                  className={`${one.two ? "ratecont" : ""} w-7 h-7`}
                  onClick={() => {
                    rateme("two"), setValue(2);
                  }}
                />
                <CiStar
                  className={`${one.three ? "ratecont" : ""} w-7 h-7`}
                  onClick={() => {
                    rateme("three"), setValue(3);
                  }}
                />
                <CiStar
                  className={`${one.four ? "ratecont" : ""} w-7 h-7`}
                  onClick={() => {
                    rateme("four"), setValue(4);
                  }}
                />
                <CiStar
                  className={`${one.five ? "ratecont" : ""} w-7 h-7`}
                  onClick={() => {
                    rateme("five"), setValue(5);
                  }}
                />
              </div>
              <button
                onClick={handlerate}
                type="button"
                className="  butt text-[13px] flex  justify-center items-center gap-2 font-bold bg-transparent border-[1px] border-[#4ef542] py-2 px-7 rounded-3xl"
              >
                Submit
              </button>
            </div>
          )}
        </div>
        {/* queue and payment */}
        <div>
          {long && (
            <>
              <div>
                <div className="flex flex-col justify-center items-center gap-2 text-[13px]  ">
                  <div className="flex  gap-8 justify-center items-center ">
                    <p>
                      1<sup>st </sup>place
                    </p>
                    <p>Not Reserved</p>
                  </div>
                  <div className="bg-[#1a2f19] w-[162px] h-[0.5px]"></div>
                </div>
                <div className="flex flex-col gap-2 mt-4 justify-center items-center text-[13px] ">
                  <div className="flex  gap-8 justify-center items-center ">
                    <p>
                      2<sup>nd </sup>place
                    </p>
                    <p>Not Reserved</p>
                  </div>
                  <div className="bg-[#1a2f19] w-[162px] h-[0.5px]"></div>
                </div>
                <div className="flex flex-col gap-2 mt-4 justify-center items-center text-[13px]  ">
                  <div className="flex  gap-8 justify-center items-center ">
                    <p>
                      3<sup>rd </sup>place
                    </p>
                    <p>Not Reserved</p>
                  </div>
                  <div className="bg-[#1a2f19] w-[162px] h-[0.5px]"></div>
                </div>
              </div>
              {!werefainput && !reserves && (
                <button
                  onClick={() => {
                    setWerefainput(true);
                  }}
                  type="button"
                  className=" ml-10 mt-3  butt text-[10px] flex  justify-center items-center gap-2 font-bold bg-transparent border-[1px] border-[#4ef542] py-2 px-7 rounded-3xl"
                >
                  Reserve
                </button>
              )}
              {werefainput && (
                <>
                  <div className="flex justify-center flex-row items-center gap-4  ">
                    <div className="flex justify-center items-center">
                      <input
                        type="number"
                        value={place}
                        name="queue"
                        onChange={(e) => {
                          setPlace(e.target.value);
                        }}
                        className="password mt-3 px-4 py-1 placeholder:font-bold placeholder:text-[10px] placeholder:text-[#4ef542] w-[70px] "
                      />
                      <p className="mt-3">ETB</p>{" "}
                    </div>
                    <button
                      onClick={handlewerefa}
                      type="button"
                      className="  mt-3  butt text-[10px] flex  justify-center items-center gap-2 font-bold bg-transparent border-[1px] border-[#4ef542] py-2 px-7 rounded-3xl"
                    >
                      Submit
                    </button>{" "}
                  </div>
                </>
              )}
            </>
          )}
          {werefa?.length > 0 && (
            <>
              <div className="flex flex-col gap-2 mt-4 text-[13px]  ">
                <div className="flex  gap-8 justify-center items-center ">
                  <p>
                    1<sup>st </sup>place
                  </p>
                  <p>{werefa[0]?.amount} ETB</p>
                </div>
                <div className="bg-[#1a2f19] w-[322px] h-[0.5px]"></div>
              </div>
              {werefa?.length === 2 && (
                <div className="flex flex-col gap-2 mt-4 text-[13px]  ">
                  <div className="flex  gap-8 justify-center items-center ">
                    <p>
                      2<sup>nd </sup>place
                    </p>
                    <p>{werefa[1]?.amount} ETB</p>
                  </div>
                  <div className="bg-[#1a2f19] w-[322px] h-[0.5px]"></div>
                </div>
              )}
              {werefa?.length === 3 && (
                <>
                  <div className="flex flex-col gap-2 mt-4 text-[13px]  ">
                    <div className="flex  gap-8 justify-center items-center ">
                      <p>
                        2<sup>nd </sup>place
                      </p>
                      <p>{werefa[1]?.amount} ETB</p>
                    </div>
                    <div className="bg-[#1a2f19] w-[322px] h-[0.5px]"></div>
                  </div>
                  <div className="flex flex-col gap-2 mt-4 text-[13px]  ">
                    <div className="flex  gap-8 justify-center items-center ">
                      <p>
                        3<sup>rd </sup>place
                      </p>
                      <p>{werefa[2]?.amount} ETB</p>
                    </div>
                    <div className="bg-[#1a2f19] w-[322px] h-[0.5px]"></div>
                  </div>
                </>
              )}
              {werefa?.length < 3 && (
                <>
                  {werefa?.length !== 2 && (
                    <div className="flex flex-col gap-2 mt-4  text-[13px] ">
                      <div className="flex  gap-8 justify-center items-center ">
                        <p>
                          2<sup>nd </sup>place
                        </p>
                        <p>Not Reserved</p>
                      </div>
                      <div className="bg-[#1a2f19] w-[322px] h-[0.5px]"></div>
                    </div>
                  )}
                  <div className="flex flex-col gap-2 mt-4 text-[13px]  ">
                    <div className="flex  gap-8 justify-center items-center ">
                      <p>
                        3<sup>rd </sup>place
                      </p>
                      <p>Not Reserved</p>
                    </div>
                    <div className="bg-[#1a2f19] w-[322px] h-[0.5px]"></div>
                  </div>
                  {!werefainput && !reserves && (
                    <button
                      onClick={() => {
                        setWerefainput(true);
                      }}
                      type="button"
                      className=" ml-10 mt-3  butt text-[10px] flex  justify-center items-center gap-2 font-bold bg-transparent border-[1px] border-[#4ef542] py-2 px-7 rounded-3xl"
                    >
                      Reserve
                    </button>
                  )}
                  {werefainput && (
                    <>
                      <div className="flex justify-center flex-row items-center gap-4  ">
                        <div className="flex justify-center items-center">
                          <input
                            type="number"
                            value={place}
                            name="queue"
                            onChange={(e) => {
                              setPlace(e.target.value);
                            }}
                            className="password mt-3 px-4 py-1 placeholder:font-bold placeholder:text-[10px] placeholder:text-[#4ef542] w-[70px] "
                          />
                          <p className="mt-3">ETB</p>{" "}
                        </div>
                        <button
                          onClick={updatewerefa}
                          type="button"
                          className="  mt-3  butt text-[10px] flex  justify-center items-center gap-2 font-bold bg-transparent border-[1px] border-[#4ef542] py-2 px-7 rounded-3xl"
                        >
                          Submit
                        </button>{" "}
                      </div>
                    </>
                  )}
                </>
              )}
            </>
          )}
          {werefa?.length === 3 && !reserves && (
            <>
              {!werefainput && !reserves && (
                <button
                  onClick={() => {
                    setWerefainput(true);
                  }}
                  type="button"
                  className=" ml-10 mt-3  butt text-[10px] flex  justify-center items-center gap-2 font-bold bg-transparent border-[1px] border-[#4ef542] py-2 px-7 rounded-3xl"
                >
                  Reserve
                </button>
              )}
              {werefainput && (
                <>
                  <div className="flex justify-center flex-row items-center gap-4  ">
                    <div className="flex justify-center items-center">
                      <input
                        type="number"
                        value={place}
                        name="queue"
                        onChange={(e) => {
                          setPlace(e.target.value);
                        }}
                        className="password mt-3 px-4 py-1 placeholder:font-bold placeholder:text-[10px] placeholder:text-[#4ef542] w-[70px] "
                      />
                      <p className="mt-3">ETB</p>{" "}
                    </div>
                    <button
                      onClick={updatewerefa}
                      type="button"
                      className="  mt-3  butt text-[10px] flex  justify-center items-center gap-2 font-bold bg-transparent border-[1px] border-[#4ef542] py-2 px-7 rounded-3xl"
                    >
                      Submit
                    </button>{" "}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
      {/* map */}
      {/* {!loading && (
        <div>
          <Geo />
        </div>
      )} */}
      <ToastContainer />
    </div>
  );
};

export default Fuel;
