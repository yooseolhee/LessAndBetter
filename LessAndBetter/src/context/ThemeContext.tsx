import { createContext, useContext, useState, useEffect } from "react";
import type { ThemeKey } from "../styles/themes";

type ThemeContextType = {
  theme: ThemeKey;
  setTheme: (theme: ThemeKey) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeKey>(
    (localStorage.getItem("lab-theme") as ThemeKey) || "green"
  );

  useEffect(() => {
    localStorage.setItem("lab-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("ThemeProvider missing");
  return ctx;
}
