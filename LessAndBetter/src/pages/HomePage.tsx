
import TodayMotivation from "../components/home/TodayMotivation";
import TodayWorkout from "../components/home/TodayWorkout";
import Card from "../components/layout/Card";
import IntervalTimer from "../components/timer/IntervalTimer";
import TodayTopPost from "../features/home/TodayTopPost";

export default function Home() {
  return (
      <div className="h-full grid grid-cols-3 gap-6">
        <TodayWorkout />
        <TodayTopPost />
        <TodayMotivation />
        <div className="col-span-3">
          <Card title="">
        <IntervalTimer />
        </Card>
        </div>
      </div>
  );
}
