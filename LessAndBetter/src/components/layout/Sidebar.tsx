import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { Home, Dumbbell, Users, Settings, Timer } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

const menus = [
  { name: "홈", icon: Home, path:'/home' },
  { name: "운동", icon: Dumbbell , path:'/training'},
  { name: "커뮤니티", icon: Users , path:'/community'},
  { name: '인터벌 타이머', icon:Timer, path:'/timer'},
  { name: "설정", icon: Settings, path:'/settings' },
];

export default function Sidebar({
  forceOpen=false,
}: {
  forceOpen: boolean;
}
) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  if(!forceOpen && window.innerWidth <768){
    return null;
}

  return (
    <div className="fixed top-0 left-0 z-50 h-screen group flex items-center pointer-events-auto">
      {/* hover 감지 영역 */}
      <div className="absolute top-0 left-0 h-full w-20 hidden md:block pointer-events-none"/>

      {/* 실제 사이드바 */}
      <aside
        className={`
          h-[80dvh]
          w-[22vw]
          min-w-[240px]
          max-w-[360px]
          bg-white
          rounded-r-2xl
          shadow-2xl
          p-3
          flex
          flex-col
          gap-3
          transform
          transition-transform
          duration-300
          ease-out
          ${forceOpen ? "translate-x-0" : "-translate-x-full"}
        md:group-hover:translate-x-0
        `}
      >
        {/* 프로필 */}
        <div className="gap-3 p-3 bg-gray-50 rounded-xl">
          <div className="w-20 h-20 mb-3 rounded-full overflow-hidden bg-gray-200">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                NO IMAGE
              </div>
            )}
          </div>

          <div>
            {!user ? (
              <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-gray-600">
                  로그인이 필요합니다.
                </span>

                <button
                  onClick={() => navigate("/login")}
                  className="mt-2 px-4 py-2 text-sm rounded-xl bg-green-600 text-white hover:bg-green-700 transition"
                >
                  로그인
                </button>

                <button
                  onClick={() => navigate("/signup")}
                  className="px-4 py-2 text-sm rounded-xl border border-gray-300 hover:bg-gray-100 transition"
                >
                  회원가입
                </button>
              </div>
            ) : (
              <>
                <p className="text-gray-700 text-sm">{user.email}</p>
                <button
                  onClick={() => signOut(auth)}
                  className="text-xs mt-3 px-2 py-1 rounded-full border border-gray-300 hover:bg-gray-100"
                >
                  로그아웃
                </button>
              </>
            )}
          </div>
        </div>

        {/* 메뉴 */}
        <nav className="flex flex-col gap-2">
          {menus.map((m) => (
            <NavLink
              key={m.name}
              to={m.path}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r from-green-100 to-white transition"
            >
              <m.icon className="w-5 h-5 text-green-500" />
              <span className="text-xs">{m.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </div>
  );
}
