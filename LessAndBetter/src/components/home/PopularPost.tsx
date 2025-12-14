import {FaRegThumbsUp} from "react-icons/fa";

export default function PopularPost() {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-6">
        오늘의 인기글
      </h2>

      <div className="bg-white rounded-xl shadow p-6 space-y-4 text-sm">
        <div>
          <p className="font-semibold">제목</p>
          <p className="text-gray-600">내용</p>
          <p className="text-xs text-green-600"><FaRegThumbsUp/>00</p>
        </div>
      </div>
    </section>
  );
}
