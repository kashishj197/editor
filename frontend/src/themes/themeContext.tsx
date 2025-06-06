import React, { createContext, useContext } from "react";

export type Theme = {
  fontFamily: string;
  primaryColor: string;
  headingScale: {
    h1: number;
    h2: number;
    h3: number;
  };
  baseSpacing: number;
};

export const defaultTheme: Theme = {
  fontFamily: "Inter, sans-serif",
  primaryColor: "#1e40af",
  headingScale: { h1: 32, h2: 28, h3: 24 },
  baseSpacing: 8,
};

export const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
}>({
  theme: defaultTheme,
  setTheme: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);
