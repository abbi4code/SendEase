import React, { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";
import Warning from "../components/Warning";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const [balance, setbalance] = useState();
  useEffect(() => {
    const balancefunc = async () => {
      try {
        let res = await axios.get(
          "http://localhost:3000/api/v1/account/balance",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setbalance(res.data.accountbalance);
      } catch (error) {
        console.log(error);
      }
    };

    balancefunc();
  }, [balance]);
  console.log(balance);
  return (
    <>
      {token ? (
        <div className="h-screen flex justify-center bg-red-500 ">
          <div className="flex flex-col  w-full bg-gray-600">
            <div className="p-10 bg-white">
              <div className="bg-black w-full h-1 mb-3 rounded-lg"></div>
              <Appbar userid={"U"} />
              <Balance currentbalance={balance} />
              <Users />
            </div>
          </div>
        </div>
      ) : (
        <Warning label={"Not logged In"} onClick={"/signin"} />
      )}
    </>
  );
};

export default Dashboard;
