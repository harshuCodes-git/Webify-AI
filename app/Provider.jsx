"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ContextMessage } from "@/context/ContextMessage";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/custom/AppSidebar";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";

const Provider = ({ children }) => {
  const [messages, setMessages] = useState();
  const [userDetails,setUserDetails]=useState();
  const convex=useConvex()
  const router=useRouter();

  useEffect(()=>{
    isAuthenticated()

  },[])
  const isAuthenticated= async()=>{
    if(typeof window!==undefined){
      const user=JSON.parse(localStorage.getItem('user'))
      if(!user){
        router.push('/')
      }
      //fetch the info 
      const result=await convex.query(api.users.GetUser,{
        email:user?.email
      })
      setUserDetails(result)
      // console.log(result)

    }
  }

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_KEY}>
      <PayPalScriptProvider
        options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}
      >
        <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
          <ContextMessage.Provider value={{ messages, setMessages }}>
            <NextThemesProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <SidebarProvider defaultOpen={false}>
                <AppSidebar />
                {children}
              </SidebarProvider>
            </NextThemesProvider>
          </ContextMessage.Provider>
        </UserDetailsContext.Provider>
      </PayPalScriptProvider>
    </GoogleOAuthProvider>
  );
};

export default Provider;
