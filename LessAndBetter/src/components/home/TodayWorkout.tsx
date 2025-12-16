import { useEffect, useState } from "react";
import Card from "../layout/Card";

type YoutubeVideo = {
  videoId: string;
  title: string;
  thumbnail: string;
  viewCount: string;
};

const KEYWORDS = [
  "홈트",
  "전신 운동",
  "복근 운동",
  "하체 운동",
  "상체 운동",
  "다이어트 운동",
];

export default function TodayWorkout() {
  const [video, setVideo] = useState<YoutubeVideo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const keyword =
          KEYWORDS[Math.floor(Math.random() * KEYWORDS.length)];

        // 1️⃣ 영상 검색
        const searchRes = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=${encodeURIComponent(
            keyword
          )}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
        );
        const searchData = await searchRes.json();

        const randomItem =
          searchData.items[
            Math.floor(Math.random() * searchData.items.length)
          ];

        const videoId = randomItem.id.videoId;

        // 2️⃣ 조회수 가져오기
        const detailRes = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoId}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
        );
        const detailData = await detailRes.json();

        const detail = detailData.items[0];

        setVideo({
          videoId,
          title: detail.snippet.title,
          thumbnail: detail.snippet.thumbnails.medium.url,
          viewCount: Number(detail.statistics.viewCount).toLocaleString(),
        });
      } catch (e) {
        console.error("오늘의 추천 운동 로드 실패", e);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, []);

  if (loading) {
    return <div className="text-gray-400">추천 운동 불러오는 중...</div>;
  }

  if (!video) return null;

  return (
    <Card title="추천 운동">
      <div
      onClick={() =>
        window.open(`https://www.youtube.com/watch?v=${video.videoId}`, "_blank")
      }
      className="cursor-pointer rounded-2xl p-5 hover:shadow-lg transition bg-white"
    >

      <img
        src={video.thumbnail}
        alt={video.title}
        className="rounded-xl mb-3 w-full"
      />

      <div className="font-medium line-clamp-2 mb-1">
        {video.title}
      </div>

      <div className="text-sm text-gray-500">
        조회수 {video.viewCount}회
      </div>
    </div>
    </Card>
  );
}
