import React, { useEffect } from "react";
import Button from "./Button";
import { Navigate, useNavigate } from "react-router-dom";

export default function Appbar({ userid }) {
  const navigate = useNavigate();

  return (
    <div className="flex rounded-lg border border-slate-300 p-2 justify-between items-center">
      <h1 className="font-bold text-2xl drop-shadow-2xl ">
        <span className="text-[#a2c11c]  ">Swift</span>Pay
      </h1>
      <div className="flex justify-center items-center gap-2">
        <h1 className="font-bold text-sm">Hello</h1>
        <div
          className="rounded-full py-3 px-4 bg-blue-100 text-black text-sm flex justify-center items-center text-center cursor-pointer"
          onClick={() => {
            navigate("/profile");
          }}
        >
          {userid}
        </div>
        <button
          className="px-3 py-2 rounded-lg bg-green-500 text-center font-semibold text-sm"
          onClick={async () => {
            localStorage.removeItem("token");
            navigate("/signup");
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
