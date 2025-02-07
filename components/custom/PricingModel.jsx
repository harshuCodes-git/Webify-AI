import Lookup from "@/data/Lookup";
import React, { useContext, useEffect } from "react";
import { Button } from "../ui/button";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { action } from "@/convex/_generated/server";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const PricingModel = () => {
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const updateToken=useMutation(api.users.UpdateToken)

  const onPaymentSuccess = async(pricing) => {
    const token=userDetails?.token+ Number(pricing?.value)
    console.log(token)
    await updateToken({
        token:token,
        userId:userDetails?._id
    })
  };
  return (
    <div className="mt-10 grid w-full grid-col-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Lookup.PRICING_OPTIONS.map((pricing, index) => (
        <div key={index} className="border p-7 flex flex-col gap-3 rounded-xl">
          <h2 className="font-bold text-2xl ">{pricing.name}</h2>
          <h2 className="font-medium text-sm">{pricing.tokens} Tokens</h2>
          <p className="text-gray-400">{pricing.desc}</p>
          <h1 className="text-4xl font-bold text-center mt-6">
            ${pricing.price}
          </h1>
          {/* <Button>Upgrade to {pricing.name}</Button> */}

          <PayPalButtons
            style={{ layout: "horizontal" }}
            disabled={!userDetails}
            onApprove={() => onPaymentSuccess(pricing)}
            onCancel={() => console.log("Payment is Cancelled")}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: pricing.price,
                      currency_code: "USD",
                    },
                  },
                ],
              });
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default PricingModel;
