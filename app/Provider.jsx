"use client";

import React, { useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ContextMessage } from "@/context/ContextMessage";

const Provider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  return (
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
  );
};

export default Provider;
