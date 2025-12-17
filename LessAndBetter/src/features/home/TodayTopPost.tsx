import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/layout/Card";
import { fetchTodayTopPost } from "./api";
import type { Post } from "../../features/community/types";

export default function TodayTopPost() {
  const nav = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodayTopPost()
      .then(setPost)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Card title="오늘의 인기글">
        <p className="text-gray-400">불러오는 중...</p>
      </Card>
    );
  }

  if (!post) {
    return (
      <Card title="오늘의 인기글">
        <p className="text-gray-400">오늘 올라온 글이 없습니다</p>
      </Card>
    );
  }

  return (
    <Card title="오늘의 인기글">
  <div
    onClick={() => nav(`/community/${post.id}`)}
    className="cursor-pointer flex flex-col flex-1"
  >
    {/* 🔥 중앙 콘텐츠 */}
    <div className="flex flex-col items-center justify-center text-center flex-1 px-4">
      <p className="font-medium line-clamp-2 mb-3">
        {post.title}
      </p>

      <p className="text-xs text-gray-600 line-clamp-3">
        {post.content}
      </p>
    </div>

    {/* 🔥 하단 영역 (카드 바닥) */}
    <div className="pt-4">
      <div className="flex justify-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <span>❤️</span>
          <span>{post.likeCount}</span>
        </div>

        <div className="flex items-center gap-1">
          <span>💬</span>
          <span>{post.commentCount}</span>
        </div>
      </div>
    </div>
  </div>
</Card>

  );
}
