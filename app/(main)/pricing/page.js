"use client"
import Lookup from "@/data/Lookup";
import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import Colors from "@/data/Colors";
import PricingModel from "@/components/custom/PricingModel";

const page = () => {
  const { userDetails, setUserDetails }=useContext(UserDetailsContext)
  return (
    <div className="w-full">
      <div className="p-3 w-auto flex justify-end">
        <div className="flex justify-between space-x-2">
          <Button>Export</Button>
          <Button>Deploy</Button>
        </div>
      </div>
      <div className="mt-5 flex items-center flex-col w-full p-10 md:px-32 lg:px-48 ">
        <h2 className="font-bold text-5xl">Pricing</h2>
        <p className="text-gray-400 max-w-xl text-center mb-10 mt-3">
          {Lookup.PRICING_DESC}
        </p>
        <div className="p-4  border rounded-xl flex w-full justify-between" style={{
          backgroundColor:Colors.CHAT_BACKGROUND
        }}>
          <h2 className="text-lg">
            <span className="font-bold">{`${userDetails?.token} Tokens Left`}</span>
          </h2>
          <div className="">
            <h2 className="font-medium">Need More token?</h2>
            <p>Upgrade your plan below</p>
          </div>
        </div>
        <div>
          <PricingModel/>
        </div>
      </div>
    </div>
  );
};

export default page;
