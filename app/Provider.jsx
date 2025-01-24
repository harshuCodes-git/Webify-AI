"use client";

import React, { useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ContextMessage } from "@/context/ContextMessage";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Provider = ({ children }) => {
  const [messages, setMessages] = useState();
  const [userDetails,setUserDetails]=useState();

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
