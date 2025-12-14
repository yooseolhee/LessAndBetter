import Layout from "../components/layout/Layout";
import TodayWorkout from "../components/home/TodayWorkout";
import TodayDiet from "../components/home/TodayDiet";
import PopularPost from "../components/home/PopularPost";
import logo from "../assets/LABLogo.png";

export default function Home() {
  return (
    <Layout>
      <img
        src={logo}
        alt="Less And Better"
        className="h-80 mx-auto mb-16"
      />

      <div className="grid grid-cols-3 gap-12">
        <TodayWorkout />
        <TodayDiet />
        <PopularPost />
      </div>
    </Layout>
  );
}
