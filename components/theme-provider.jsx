"use client";

import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export const ThemeProvider = (props) => {
  const { children, ...rest } = props;
  return <NextThemesProvider {...rest}>{children}</NextThemesProvider>;
};
