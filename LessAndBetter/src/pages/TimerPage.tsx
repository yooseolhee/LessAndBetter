import IntervalTimer from "../components/timer/IntervalTimer";

export default function TimerPage() {
  return (
    <div className="h-[calc(100vh-96px)] w-full">
      <div className="h-full w-full">
        <IntervalTimer mode="menu" />
      </div>
    </div>
  );
}
