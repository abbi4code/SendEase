import React, { useState } from "react";
import Inputbox from "../components/Inputbox";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Profile() {
  const navigate = useNavigate();
  const [password, setpassword] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");

  return (
    <div className="h-screen w-full flex justify-center items-center bg-slate-300">
      <div className="flex bg-white justify-center flex-col rounded-lg  p-3 w-80 shadow-2xl h-max">
        <h1 className="font-bold text-2xl text-center">Profile</h1>
        <div className="h-[1px] w-[60%] bg-black mt-2 self-center"></div>

        <Inputbox
          type={"text"}
          placeholder={"password"}
          onChange={(e) => setpassword(e.target.value)}
        />
        <Inputbox
          type={"text"}
          placeholder={"Firstname"}
          onChange={(e) => setfirstname(e.target.value)}
        />
        <Inputbox
          type={"text"}
          placeholder={"Lastname"}
          onChange={(e) => setlastname(e.target.value)}
        />
        <div className="flex justify-between mt-4">
          <button
            className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border text-white border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-3 font-medium text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Back to Dashboard
          </button>
          <button
            className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border text-white border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-3 font-medium text-xs  transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            onClick={async () => {
              await axios.put(
                "http://localhost:3000/api/v1/user/update",
                {
                  password: password,
                  firstname: firstname,
                  lastname: lastname,
                },
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              );
            }}
          >
            Save-Changes
          </button>
        </div>
      </div>
    </div>
  );
}
