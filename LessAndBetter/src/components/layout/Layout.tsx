import Header from "./Header";
import Sidebar from "./Sidebar";
import { useTheme } from "../../context/ThemeContext";
import { THEMES } from "../../styles/themes";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${THEMES[theme].bg}`}>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-12">{children}</main>
      </div>
    </div>
  );
}
