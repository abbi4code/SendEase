import React, { useState } from "react";
import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import Inputbox from "../components/Inputbox";
import Button from "../components/Button";
import Buttonwarning from "../components/Buttonwarning";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendurl } from "../config";

const Signin = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full bg-white">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      <div className="relative z-99  border border-black h-screen flex justify-center items-center bg-transparent">
        <div className="flex flex-col w-max h-max items-center justify-center ">
          <div className="rounded-lg border border-slate-400 bg-white w-80 h-full px-4 p-2 text-center">
            <Heading label={"Sign in"} />
            <Subheading label={"Enter Your Credentials"} />
            <Inputbox
              placeholder={"aashirya@gmail.com"}
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
              label={"Signin"}
              onClick={async () => {
                const res = await axios.post(`${backendurl}/user/signin`, {
                  username,
                  password,
                });
                localStorage.setItem("token", res.data.token);
                navigate("/");
              }}
            />
            <Buttonwarning
              buttontext={"Signup"}
              label={"Don't have a account ?"}
              to={"/signup"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
