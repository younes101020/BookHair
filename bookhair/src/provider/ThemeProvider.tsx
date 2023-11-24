"use client";

import { ThemeProvider } from "next-themes";

const ThemeProviders = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default ThemeProviders;
