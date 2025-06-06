import React, { useEffect, useState } from "react";
import { Theme, ThemeContext, defaultTheme } from "./themeContext";
import axiosInstance from "../utils/axiosInstance";
import { applyThemeVariablesViaStyleTag } from "./utils/generateVariables";
import { useAppSelector } from "../app/hooks";

export const ThemeProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [appTheme, setTheme] = useState<Theme>(defaultTheme);
  const theme = useAppSelector((state) => state.app.theme);

  useEffect(() => {
    // @ts-ignore
    if (theme && theme?.globalStyles) {
      // @ts-ignore
      applyThemeVariablesViaStyleTag(theme.globalStyles);
      // @ts-ignore
      setTheme(theme.globalStyles);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme: appTheme, setTheme }}>
      <div style={{ fontFamily: appTheme.fontFamily }}>{children}</div>
    </ThemeContext.Provider>
  );
};
