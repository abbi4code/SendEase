import React, { useState } from "react";
import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import Inputbox from "../components/Inputbox";
import Button from "../components/Button";
import Buttonwarning from "../components/Buttonwarning";
import Signin from "./Signin";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  function handleclick() {
    toast.success("how are you");
  }

  return (
    <div className="h-screen flex justify-center bg-slate-300">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 h-max px-4 p-2 text-center">
          <button onClick={handleclick}>hi there</button>
          <Heading label={"Sign up"} />
          <Subheading label={"Enter Your Credentials"} />
          <Inputbox
            placeholder={"Abhishek"}
            label={"First Name"}
            type={"text"}
            onChange={(e) => {
              setfirstname(e.target.value);
            }}
          />
          <Inputbox
            placeholder={"Raj"}
            label={"Last Name"}
            type={"text"}
            onChange={(e) => setlastname(e.target.value)}
          />
          <Inputbox
            placeholder={"abhishekraj@gmail.com"}
            label={"Email"}
            type={"text"}
            onChange={(e) => setusername(e.target.value)}
          />
          <Inputbox
            placeholder={"********"}
            label={"Password"}
            type={"password"}
            onChange={(e) => setpassword(e.target.value)}
          />
          <Button
            onClick={async () => {
              const res = await axios.post(
                "http://localhost:3000/api/v1/user/signup",
                {
                  firstname,
                  lastname,
                  username,
                  password,
                }
              );
              //now we need to store this in localstorage
              localStorage.setItem("token", res.data.token);

              navigate("/dashboard");
            }}
            label={"Signup"}
          />
          <Buttonwarning
            buttontext={"Signin"}
            label={"Already have a account ?"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
