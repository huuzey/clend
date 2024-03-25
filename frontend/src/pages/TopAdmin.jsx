import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL } from "./Register";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";

const TopAdmin = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [todata, setTopdata] = useState({});
  const [loading, setLoading] = useState(false);
  const [benzene, setBenzene] = useState(false);
  const [kerosene, setKerosene] = useState(false);
  const [naphta, setNaphta] = useState(false);
  const [file, setFile] = useState(null);
  const [imageurl, setImageurl] = useState(null);
  const [percentile, setPercentile] = useState(null);

  const uploadref = useRef("");
  const navigate = useNavigate();
  if (currentUser?.rest?.email !== "weleladinsefa@gmail.com") {
    navigate("/");
    return;
  }
  const handleinput = (e) => {
    setTopdata({ ...todata, [e.target.name]: e.target.value });
  };
  const handleupload = async () => {
    try {
      if (!file) {
        return;
      }
      const storage = getStorage(app);
      const Filename = new Date().getTime() + "_" + file.name;
      const storageRef = ref(storage, Filename);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPercentile(progress.toFixed(0));
        },
        (error) => {
          console.log(error);
          toast("Something went wrong with Image uploading!", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            type: "error",
          });
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadurl) => {
            setPercentile(null);
            setImageurl(downloadurl);
            setFile(null);
          });
        }
      );
    } catch (error) {
      setPercentile(null);
      console.log(error);
    }
  };
  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (
      !todata.email ||
      !todata.phone ||
      !todata.name ||
      !todata.location ||
      !imageurl
    ) {
      setLoading(false);
      toast("All Fields are required!", {
        position: "bottom-right",
        autoClose: 5000,
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
    if (todata.email && todata.phone && todata.name && todata.location) {
      try {
        const response = await fetch(`${BASE_URL}/user/fuelowner`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone: todata.phone,
            email: todata.email,
            name: todata.name,
            location: todata.location,
            kerosene: kerosene,
            naphta: naphta,
            benzene: benzene,
            image: imageurl,
          }),
        });
        const data = await response.json();
        if (data === "Fuelowner saved successfully") {
          toast(" Fuelowner Successfully registered!", {
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
        }
        console.log("data", data);
        setLoading(false);
        setImageurl(null);
        setBenzene(false);
        setNaphta(false);
        setKerosene(false);
        setTopdata({
          phone: "",
          email: "",
          name: "",
          location: "",
        });
      } catch (error) {
        setLoading(false);
        toast("Something went wrong!", {
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

        console.log("catch");
        console.log(error);
      }
    }
  };
  console.log("file", file);
  console.log("percentile", percentile);
  console.log("downlodurl", imageurl);
  if (file && percentile === null && percentile !== 100) {
    handleupload();
    setFile(null);
  }
  return (
    <div>
      <div className="logincontainer justify-center flex  items-center">
        <form onSubmit={submitHandler}>
          <div className=" unlogin  shadow-inner shadow-blue-500 flex  p-4 justify-end items-center flex-col gap-6 text-[#4ef542]  bg-transparent backdrop-blur-[26px]">
            <div className="flex justify-center items-center ">
              {imageurl && (
                <img
                  src={imageurl}
                  alt="upload"
                  className="w-[300px]  h-[200px] rounded-md"
                />
              )}
            </div>

            <div className="justify-center flex  items-center gap-3">
              <input
                type="email"
                value={todata.email}
                name="email"
                onChange={(e) => {
                  handleinput(e);
                }}
                placeholder="Email"
                className="email px-4 py-1 placeholder:font-bold placeholder:text-[10px] placeholder:text-[#1a2f19] w-[100%] "
              />
              <input
                type="phone"
                value={todata.phone}
                name="phone"
                onChange={(e) => {
                  handleinput(e);
                }}
                placeholder="Phone"
                className="email px-4 py-1 placeholder:font-bold placeholder:text-[10px] placeholder:text-[#1a2f19] w-[100%] "
              />
            </div>
            <div className="justify-center flex  items-center gap-3">
              <input
                type="text"
                value={todata.name}
                name="name"
                onChange={(e) => {
                  handleinput(e);
                }}
                placeholder="Name"
                className="email px-4 py-1 placeholder:font-bold placeholder:text-[10px] placeholder:text-[#1a2f19] w-[100%] "
              />
              <input
                type="text"
                value={todata.location}
                name="location"
                onChange={(e) => {
                  handleinput(e);
                }}
                placeholder="Location"
                className="email px-4 py-1 placeholder:font-bold placeholder:text-[10px] placeholder:text-[#1a2f19] w-[100%] "
              />
            </div>
            <div className="justify-center flex w-full px-1 text-[#1a2f19] items-center gap-3">
              <div className="justify-center flex  items-center gap-3">
                <p>Benzene</p>
                <input
                  type="checkbox"
                  value={todata.benzene}
                  name="benzene"
                  onChange={() => {
                    setBenzene(!benzene);
                  }}
                  className="email px-4 py-1 placeholder:font-bold placeholder:text-[10px] placeholder:text-[#1a2f19] w-[100%] "
                />
              </div>
              <div className="justify-center flex  items-center gap-3">
                <p>Kerosene</p>
                <input
                  type="checkbox"
                  value={todata.kerosene}
                  name="kerosene"
                  onChange={() => {
                    setKerosene(!kerosene);
                  }}
                  className="email px-4 py-1 placeholder:font-bold placeholder:text-[10px] placeholder:text-[#78f376] w-[100%] "
                />
              </div>
              <div className="justify-center flex  items-center gap-3">
                <p>Naphta</p>
                <input
                  type="checkbox"
                  value={todata.naphta}
                  name="naphta"
                  onChange={() => {
                    setNaphta(!naphta);
                  }}
                  className="email px-4 py-1 placeholder:font-bold placeholder:text-[10px] placeholder:text-[#78f376] w-[100%] "
                />
              </div>
            </div>
            <div className="flex justify-center items-center gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
                ref={uploadref}
                hidden
              />

              <button
                disabled={percentile}
                onClick={() => uploadref.current.click()}
                type="button"
                className=" disabled:cursor-progress disabled:opacity-40 butt text-[13px] font-bold bg-transparent border-[1px] border-[#4ef542] py-2 px-7 rounded-3xl"
              >
                {percentile ? (
                  <div className="w-10 h-10 text-[#4ef542]">
                    <CircularProgressbar
                      value={percentile}
                      text={`${percentile || 0}%`}
                    />
                  </div>
                ) : (
                  "Upload Image"
                )}
              </button>
              {!percentile && (
                <button
                  type="submit"
                  disabled={loading}
                  className=" disabled:cursor-progress disabled:opacity-40 butt text-[13px] font-bold bg-transparent border-[1px] border-[#4ef542] py-2 px-7 rounded-3xl"
                >
                  {loading ? "Submitting" : "Submit"}
                </button>
              )}
            </div>
          </div>
        </form>
        <ToastContainer />;
      </div>
    </div>
  );
};

export default TopAdmin;
