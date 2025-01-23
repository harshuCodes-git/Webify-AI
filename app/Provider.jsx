"use client"
import React from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes";
const Provider = ({childern}) => {
  return (
    <div>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {childern}
      </NextThemesProvider>
    </div>
  );
}

export default Provider
