import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Intro() {
  const [phase, setPhase] = useState<"typing" | "merge">("typing");
  const [typed, setTyped] = useState("");
  const navigate = useNavigate();

  const TEXT = "Less And Better";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTyped(TEXT.slice(0, i + 1));
      i++;

      if (i === TEXT.length) {
        clearInterval(interval);
        setTimeout(() => setPhase("merge"), 700);
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
      {/* ===== 텍스트 영역 (절대 안 움직임) ===== */}
      <div className="h-[140px] flex items-center justify-center">
        {phase === "typing" && (
          <span className="text-6xl md:text-8xl font-extrabold text-green-500 tracking-widest leading-none select-none">
            {typed}
          </span>
        )}

        {phase === "merge" && (
          <span className="lab text-6xl md:text-8xl font-extrabold text-green-500 leading-none select-none">
            LAB
          </span>
        )}
      </div>

      {/* ===== 버튼 영역 (처음부터 공간 확보) ===== */}
      <div className="h-[120px] flex items-center justify-center">
        <button
          onClick={() => navigate("/home")}
          className="
            px-16 py-7 rounded-full
            bg-green-500 text-white text-2xl font-semibold
            opacity-0
            animate-[fadeIn_0.6s_ease_forwards]
            hover:bg-green-600 transition
          "
          style={{
            animationDelay: "1s",
            visibility: phase === "merge" ? "visible" : "hidden",
          }}
        >
          LAB 시작하기
        </button>
      </div>

      <style>
        {`
          .lab {
            letter-spacing: 1.2em;
            animation: spacingClose 0.9s ease forwards;
          }

          @keyframes spacingClose {
            to {
              letter-spacing: 0em;
            }
          }

          @keyframes fadeIn {
            to {
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
}
