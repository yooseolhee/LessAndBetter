import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { SortType, Post, BoardFilter } from "./types";
import { fetchPosts } from "./api";
import CommunityToolbar from "./CommunityToolbar";
import PostCard from "./PostCard";

export default function CommunityPage() {
  const nav = useNavigate();
  const [sort, setSort] = useState<SortType>("latest");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [board, setBoard] = useState<BoardFilter>("all");

  
  useEffect(() => {
    setLoading(true);
    fetchPosts(sort,board)
      .then(setPosts)
      .finally(() => setLoading(false));
  }, [sort,board]);

  return (
    <>
      <div className="ml-30">
      <h1 className="text-3xl font-bold mb-2">
        COMMUNITY
      </h1>
      <p className="text-xl">
        여러분의 일상을 공유해주세요!
      </p>
    </div>

    <div className="ml-30 mt-6 flex gap-2 flex-wrap justify-end mr-30">
      {[
        { key: "all", label: "전체" },
        { key: "home_training", label: "홈트" },
        { key: "diet_success", label: "다이어트 성공" },
        { key: "bulkup_success", label: "벌크업 성공" },
        { key: "diet_consult", label: "다이어트 고민" },
        { key: "free", label: "자유" },
      ].map((b) => (
        <button
          key={b.key}
          onClick={() => setBoard(b.key as BoardFilter)}
          className={`
            px-4 py-2 rounded-full text-md
            ${board === b.key
              ? "bg-gradient-to-br from-green-600 to-green-400 text-white"
              : "bg-gray-100 hover:bg-green-100"}
          `}
        >
          {b.label}
        </button>
      ))}
    </div>


    <div className="py-8 flex flex-col items-end mr-30">
      <CommunityToolbar
        sort={sort}
        onChangeSort={setSort}
      />
      <div className="mt-5 flex justify-end">
        <button
          onClick={() => nav("/community/write")}
          className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-400"
        >
          게시글 작성
        </button>
      </div>
    </div>

      {loading ? (
        <p className="text-gray-500">불러오는 중...</p>
      ) : (
        <div className="ml-30 grid grid-cols-3 gap-10 items-stretch">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onClick={() => nav(`/community/${post.id}`)}
            />
          ))}
        </div>
      )}
    </>
  );
}
