import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import Inputbox from "../components/Inputbox";
import Button from "../components/Button";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Sendmoney = () => {
  const [searchparams] = useSearchParams();
  const id = searchparams.get("id");
  const name = searchparams.get("name");
  const [amount, setamount] = useState();
  const [balance, setbalance] = useState();

  useEffect(() => {
    const balancefunc = async () => {
      const res = await axios.get(
        "http://localhost:3000/api/v1/account/balance",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setbalance(res.data.accountbalance);
    };

    balancefunc();
  }, [balance]);

  return (
    <div className="h-screen justify-center flex bg-slate-300 ">
      <div className="flex justify-center flex-col">
        <div className="rounded-lg bg-white w-80 h-max px-4 p-2 text-center shadow-2xl">
          <Heading label={"Send Money "} />
          <div className="flex items-center gap-2 mt-2">
            <div
              className={`border rounded-full px-3 py-2 font-bold text-sm items-center bg-blue-100`}
            >
              {name[0].toUpperCase()}
            </div>
            <div className="flex justify-between font-semibold w-full ">
              <h1 className="">{name}</h1>
              {balance < 500 ? (
                <h1 className="font-bold">
                  <span className="text-red-700 font-bold text-lg">
                    Low balance:{" "}
                  </span>
                  {balance}
                </h1>
              ) : (
                <h1 className="font-bold">
                  <span className="text-green-600 font-bold text-lg">
                    Your balance:{" "}
                  </span>
                  {balance}
                </h1>
              )}
            </div>
          </div>
          <Inputbox
            label={"Amount (in Rs) "}
            placeholder={"Enter Amount"}
            type={"text"}
            onChange={(e) => setamount(e.target.value)}
          />
          <Button
            label={"Initiate Transfer"}
            onClick={async () => {
              await axios.post(
                "http://localhost:3000/api/v1/account/transfer",
                {
                  to: id,
                  amount: amount,
                },
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              );
              window.location.reload();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Sendmoney;
