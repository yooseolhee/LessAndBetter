import { useEffect, useRef, useState } from "react";
import Card from "../layout/Card";

type Phase = "work" | "rest" | "done";

type IntervalTimerProps = {
  mode?: "default" | "menu";
};

export default function IntervalTimer({ mode = "default" }: IntervalTimerProps) {
  const [workTime, setWorkTime] = useState(30); // 초
  const [restTime, setRestTime] = useState(10); // 초
  const [sets, setSets] = useState(5);

  const [currentSet, setCurrentSet] = useState(1);
  const [phase, setPhase] = useState<Phase>("work");
  const [timeLeft, setTimeLeft] = useState(workTime);
  const [running, setRunning] = useState(false);

  const beepRef = useRef<HTMLAudioElement | null>(null);

  // 총 운동 시간 (운동 시간만)
  const totalWorkTime = workTime * sets;

  // 알림음
  const playBeep = () => {
    beepRef.current?.play();
  };

  // 타이머 로직
  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 1) return prev - 1;

        // 전환 시점
        playBeep();

        if (phase === "work") {
          setPhase("rest");
          return restTime;
        }

        if (phase === "rest") {
          if (currentSet < sets) {
            setCurrentSet((s) => s + 1);
            setPhase("work");
            return workTime;
          } else {
            setPhase("done");
            setRunning(false);
            return 0;
          }
        }

        return 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [running, phase, restTime, workTime, currentSet, sets]);

  // 설정 변경 시 초기화
  useEffect(() => {
    setTimeLeft(workTime);
    setCurrentSet(1);
    setPhase("work");
    setRunning(false);
  }, [workTime, restTime, sets]);

  function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}분 ${s.toString().padStart(2, "0")}초`;
}

  return (
    <div className="rounded-2xl p-6 flex flex-col gap-4 h-full justify-between">
    <h1 className="text-xl font-bold text-center">⏱ 인터벌 타이머 </h1>
      {/* 설정 */}
      <div className="grid grid-cols-3 gap-4 text-lg">
        <label>
          운동(초)
          <input
            type="number"
            value={workTime}
            onChange={(e) => setWorkTime(+e.target.value)}
            className="text-center text-2xl mt-1 w-full border rounded px-2 py-2"
          />
        </label>

        <label>
          휴식(초)
          <input
            type="number"
            value={restTime}
            onChange={(e) => setRestTime(+e.target.value)}
            className="text-center text-2xl mt-1 w-full border rounded px-2 py-2"
          />
        </label>

        <label>
          세트
          <input
            type="number"
            value={sets}
            onChange={(e) => setSets(+e.target.value)}
            className="text-center text-2xl mt-1 w-full border rounded px-2 py-2"
          />
        </label>
      </div>

      {/* 상태 표시 */}
      <div className="text-center mt-4">
        <p className="text-3xl text-gray-500">
          {phase === "work" && "운동 중"}
          {phase === "rest" && "휴식 중"}
          {phase === "done" && "완료 🎉"}
        </p>

        <p className={`
        font-bold text-center
        ${mode === "menu" ? "text-8xl" : "text-4xl"}
        `}>
          {timeLeft}s
        </p>

        <p className="text-xl text-gray-500 mt-1">
          {currentSet} / {sets} 세트
        </p>
      </div>

      {/* 총 운동 시간 */}
      <p className="text-2xl text-gray-600 text-center">
        총 운동 시간: <b>{formatTime(totalWorkTime)}</b>
      </p>

      {/* 버튼 */}
      <div className="flex justify-center gap-3 mt-2">
        <button
          onClick={() => {
                beepRef.current?.play().catch(() => {});
                beepRef.current && (beepRef.current.currentTime = 0);
                setRunning(true);
          }}
          disabled={running || phase === "done"}
          className="cursor-pointer hover:bg-green-400 px-10 py-5 text-xl text-semibold bg-green-500 text-white rounded-lg disabled:opacity-50"
        >
          시작
        </button>

        <button
          onClick={() => {
            setRunning(false);
            setTimeLeft(workTime);
            setCurrentSet(1);
            setPhase("work");
          }}
          className="cursor-pointer px-10 py-5 text-xl text-semibold bg-gray-200 hover:bg-gray-300 rounded-lg"
        >
          리셋
        </button>
      </div>

      {/* 알림음 */}
      <audio ref={beepRef} src="/beep.mp3" preload="auto" />
    </div>

  );
}
