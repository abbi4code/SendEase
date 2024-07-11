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
import { backendurl } from "../config";

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
    <div className="relative h-screen w-full bg-white">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      <div className="relative h-screen flex justify-center z-99 bg-transparent">
        <div className="flex flex-col justify-center">
          <div className="rounded-lg backdrop-blur-3xl border border-slate-500 w-80 h-max px-4 p-2 text-center">
            <Heading label={"Sign up"} />
            <Subheading label={"Enter Your Credentials"} />
            <Inputbox
              placeholder={"Aashirya"}
              label={"First Name"}
              type={"text"}
              onChange={(e) => {
                setfirstname(e.target.value);
              }}
            />
            <Inputbox
              placeholder={"Chandaka"}
              label={"Last Name"}
              type={"text"}
              onChange={(e) => setlastname(e.target.value)}
            />
            <Inputbox
              placeholder={"Aashirya12@gmail.com"}
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
                const res = await axios.post(`${backendurl}/user/signup`, {
                  firstname,
                  lastname,
                  username,
                  password,
                });
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
    </div>
  );
};

export default Signup;
