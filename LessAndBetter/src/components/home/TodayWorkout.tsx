export default function TodayWorkout() {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-6">
        오늘의 추천 운동
      </h2>

      <div className="bg-white rounded-xl shadow p-4">
        <div className="h-40 bg-gray-200 rounded mb-4 flex items-center justify-center text-sm text-gray-500">
          유튜브 썸네일
        </div>

        <p className="text-sm font-medium text-gray-800">
          유튜브 제목
        </p>
      </div>
    </section>
  );
}
