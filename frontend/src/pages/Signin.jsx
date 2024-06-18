import React, { useState } from "react";
import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import Inputbox from "../components/Inputbox";
import Button from "../components/Button";
import Buttonwarning from "../components/Buttonwarning";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="h-screen flex justify-center bg-slate-300">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 h-max px-4 p-2 text-center">
          <Heading label={"Sign in"} />
          <Subheading label={"Enter Your Credentials"} />
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
            label={"Signin"}
            onClick={async () => {
              const res = await axios.post(
                "http://localhost:3000/api/v1/user/signin",
                {
                  username,
                  password,
                }
              );
              localStorage.setItem("token", res.data.token);
              navigate("/dashboard");
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
  );
};

export default Signin;
