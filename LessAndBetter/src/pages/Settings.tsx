import Layout from "../components/layout/Layout";
import { useTheme } from "../context/ThemeContext";
import { THEMES, type ThemeKey } from "../styles/themes";
import AccountDangerZone from "../components/settings/AccountDangerZone";

export default function Settings() {
  const { theme, setTheme } = useTheme();

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-10">Settings</h1>

      {/* 테마 설정 */}
      <div className="bg-white rounded-xl p-6 shadow mb-10">
        <h2 className="font-semibold mb-4">화면 테마</h2>

        <div className="flex gap-4 flex-wrap">
          {(Object.keys(THEMES) as ThemeKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setTheme(key)}
              className={`px-5 py-3 rounded-lg border
                ${
                  theme === key
                    ? "border-green-500 font-semibold"
                    : "border-gray-300"
                }`}
            >
              {THEMES[key].label}
            </button>
          ))}
        </div>
      </div>

      {/* 회원 탈퇴 */}
      <AccountDangerZone />
    </Layout>
  );
}
