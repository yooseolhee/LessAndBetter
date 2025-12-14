import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/LABLogo2.png";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <header className="h-24 px-12 flex items-center justify-between border-b bg-white">
      {/* 로고 */}
      <img
        src={logo}
        alt="Less And Better Logo"
        className="h-10 cursor-pointer"
        onClick={()=>navigate("/home")}
      />

      {/* 오른쪽 영역 */}
      <div className="flex items-center gap-6 text-base font-medium">
        {!user ? (
          <>
            <button
              onClick={() => navigate("/login")}
              className="text-gray-700 hover:text-green-600"
            >
              로그인
            </button>

            <button
              onClick={() => navigate("/signup")}
              className="px-6 py-2 rounded-full bg-green-500 text-white hover:bg-green-600"
            >
              회원가입
            </button>
          </>
        ) : (
          <>
            <span className="text-gray-700 text-sm">
              {user.email}
            </span>

            <button
              onClick={() => signOut(auth)}
              className="px-5 py-2 rounded-full border border-gray-300 hover:bg-gray-100"
            >
              로그아웃
            </button>
          </>
        )}
      </div>
    </header>
  );
}
