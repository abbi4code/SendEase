import React, { useEffect, useState } from "react";
import Button from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function randomColorCode() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color.toString();
}

export default function Users() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [filter, setfilter] = useState("");

  // const code = Math.floor(Math.random() * 10000)+1

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
      .then((res) => {
        setUsers(res.data.user);
      });
  }, [filter]);

  return (
    <div className="flex flex-col mt-3 gap-2">
      <h1 className="font-bold text-lg">Users </h1>
      <input
        onChange={(e) => setfilter(e.target.value)}
        type="text"
        placeholder="Search Users here"
        className="w-full border p-1 py-2 rounded-lg"
      />
      {users.map((user) => {
        const bgcolor = randomColorCode();
        console.log(bgcolor);

        return (
          <div className="flex justify-between">
            <div className="flex gap-3 justify-center">
              <div
                className={`border rounded-full px-3 py-2 font-bold text-sm items-center`}
                style={{ backgroundColor: bgcolor }}
              >
                {user.firstname[0]}
              </div>
              <div className="flex gap-1 justify-center items-center">
                <h1>{user.firstname}</h1>
                <h1>{user.lastname}</h1>
              </div>
            </div>
            <button
              onClick={(e) => {
                navigate("/send?id=" + user._id + "&name=" + user.firstname);
              }}
              className=" bg-[#010017] hover:bg-[#020024] rounded-xl text-white text-xs py-1 px-4 font-medium "
            >
              Send Money
            </button>
          </div>
        );
      })}
    </div>
  );
}
