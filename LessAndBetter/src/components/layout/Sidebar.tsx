import { useLocation, useNavigate } from "react-router-dom";

const mainMenus = [
  { label: "Home Training", path: "/home-training" },
  { label: "Calories", path: "/calories" },
  { label: "Products", path: "/products" },
  { label: "Community", path: "/community" },
];

export default function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="w-60 border-r min-h-[calc(100vh-96px)] px-6 py-10 bg-white flex flex-col">
      {/* 위쪽 메인 메뉴 */}
      <nav className="flex flex-col gap-6 text-gray-800">
        {mainMenus.map((menu) => {
          const active = pathname === menu.path;

          return (
            <div
              key={menu.label}
              onClick={() => navigate(menu.path)}
              className={`
                px-4 py-3 rounded-lg cursor-pointer
                text-lg font-medium
                transition
                ${
                  active
                    ? "bg-green-50 text-green-600 font-semibold"
                    : "hover:bg-green-50 hover:text-green-600"
                }
              `}
            >
              {menu.label}
            </div>
          );
        })}
      </nav>

      {/* 아래쪽 Settings */}
      <div className="mt-auto pt-10 border-t">
        <div
          onClick={() => navigate("/settings")}
          className={`
            px-4 py-3 rounded-lg cursor-pointer
            text-lg font-medium
            transition
            ${
              pathname === "/settings"
                ? "bg-green-50 text-green-600 font-semibold"
                : "hover:bg-green-50 hover:text-green-600"
            }
          `}
        >
          Settings
        </div>
      </div>
    </aside>
  );
}
