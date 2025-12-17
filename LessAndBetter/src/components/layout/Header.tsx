import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TEXT = "Less And Better";

export default function Header({onOpenSidebar}:{onOpenSidebar:()=>void}) {
  const navigate = useNavigate();
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);


  useEffect(() => {
    const speed = isDeleting ? 150 : 200;

    const timeout = setTimeout(() => {
      setDisplayText((prev) => {
        if (!isDeleting) {
          const next = TEXT.slice(0, prev.length + 1);
          if (next === TEXT) {
            setTimeout(() => setIsDeleting(true), 1000);
          }
          return next;
        } else {
          const next = prev.slice(0, -1);
          if (next === "") {
            setIsDeleting(false);
          }
          return next;
        }
      });
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting]);


  return (
    <header className="h-18 px-12 mt-3 flex items-center justify-between bg-white">
      {/* 로고 */}
      <div
        className="text-4xl text-green-700 font-bold hover:text-green-400 h-10 cursor-pointer"
        onClick={()=>navigate("/home")}
      >
        LAB
      </div>

      {/* 중앙 타이핑 텍스트 */}
      <div className="text-xl font-bold tracking-wide text-green-700">
        <span>{displayText}</span>
        <span className="animate-pulse ml-1">|</span>
      </div>
      <p className="text-sm cursor-pointer font-semibold text-green-700" onClick={onOpenSidebar}>
          Menu
        </p>

    </header>
  );
}
