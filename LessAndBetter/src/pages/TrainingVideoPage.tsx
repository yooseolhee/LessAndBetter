import { useEffect, useState } from "react";
import BodyFilter from "../components/training/BodyFilter";
import VideoCard from "../components/training/VideoCard";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const BODY_PART_KEYWORDS: Record<string, string> = {
  all: "홈트 전신 운동",
  upper: "홈트 상체 운동",
  lower: "홈트 하체 운동",
  core: "홈트 복부 운동",
};

export default function HomeTraining() {
  const [part, setPart] = useState("all");
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, [part]);

  const fetchVideos = async () => {
    setLoading(true);

    const searchRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=8&q=${BODY_PART_KEYWORDS[part]}&key=${API_KEY}`
    );
    const searchData = await searchRes.json();

    const ids = searchData.items.map((i: any) => i.id.videoId).join(",");

    const statsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${ids}&key=${API_KEY}`
    );
    const statsData = await statsRes.json();

    const result = statsData.items
      .map((item: any) => ({
        id: item.id,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        channel: item.snippet.channelTitle,
        viewCount: Number(item.statistics.viewCount),
      }))
      .sort((a: any, b: any) => b.viewCount - a.viewCount);

    setVideos(result);
    setLoading(false);
  };

  return (
    <>
  <div className="mb-14 flex items-start justify-between">
    <div>
      <h1 className="ml-30 text-xl font-bold mb-2">
        홈트레이닝 영상 추천
      </h1>
      <p className="ml-30 text-md">
        부위별로 조회수 높은 홈트 영상을 추천해드려요!
      </p>
    </div>

    <BodyFilter selected={part} onSelect={setPart} />
  </div>

  {loading ? (
    <p className="text-gray-500">로딩 중...</p>
  ) : (
    <div className="grid grid-cols-4 gap-10 ml-30">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  )}
  </>
  );
}
