"use client";

import React, { useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ContextMessage } from "@/context/ContextMessage";
import { UserDetailsContext } from "@/context/UserDetailsContext";

const Provider = ({ children }) => {
  const [messages, setMessages] = useState();
  const [userDetails,setUserDetails]=useState();

  return (
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
  );
};

export default Provider;
