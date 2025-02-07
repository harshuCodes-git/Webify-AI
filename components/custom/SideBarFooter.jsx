import {
  HelpCircle,
  Settings,
  SignatureIcon,
  SubscriptIcon,
} from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const SideBarFooter = () => {
  const router=useRouter()
  const options = [
    {
      name: "Settings",
      icon: Settings, // Changed from 'icons' to 'icon' to avoid confusion
    },
    {
      name: "Help",
      icon: HelpCircle,
    },
    {
      name: "My Subscription",
      icon: SubscriptIcon,
      path:'/pricing'
    },
    {
      name: "Sign-Out",
      icon: SignatureIcon,
    },
  ];

  const onClickOption=(option)=>{
    router.push(option.path)

  }

  return (
    <div className="p-2 mb-10">
      {options.map((option, index) => (
        <Button key={index} className="w-full flex justify-start " 
        variant="ghost"
        onClick={()=>onClickOption(option)}
        >
          <option.icon /> {/* Render the icon */}
          {option.name} {/* Render the name */}
        </Button>
      ))}
    </div>
  );
};

export default SideBarFooter;
