import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";

const Oauth = ({ set, inp }) => {
  const auth = getAuth(app);
  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultformgoogle = await signInWithPopup(auth, provider);

      set({
        ...inp,
        username: resultformgoogle.user.displayName,
      });

      set({
        ...inp,
        email: resultformgoogle.user.email,
      });
      console.log("result", inp);

      console.log("reuslfromgoosgle", resultformgoogle);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      onClick={handleGoogle}
      type="button"
      className="  butt text-[13px] flex  justify-center items-center gap-2 font-bold bg-transparent border-[1px] border-[#4ef542] py-2 px-7 rounded-3xl"
    >
      <AiFillGoogleCircle /> Continue with Google
    </button>
  );
};

export default Oauth;
