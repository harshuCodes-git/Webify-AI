"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ContextMessage } from "@/context/ContextMessage";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";

const Provider = ({ children }) => {
  const [messages, setMessages] = useState();
  const [userDetails,setUserDetails]=useState();
  const convex=useConvex()

  useEffect(()=>{
    isAuthenticated()

  },[])
  const isAuthenticated= async()=>{
    if(typeof window!==undefined){
      const user=JSON.parse(localStorage.getItem('user'))
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
      <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
        <ContextMessage.Provider value={{ messages, setMessages }}>
          <NextThemesProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
            
          >
            {children}
          </NextThemesProvider>
        </ContextMessage.Provider>
      </UserDetailsContext.Provider>
    </GoogleOAuthProvider>
  );
};

export default Provider;
