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
      <h1 className="text-xl font-bold mb-2">
        COMMUNITY
      </h1>
      <p className="text-md">
        여러분의 일상을 공유해주세요!
      </p>

    {/* 게시판 선택 */}
<div className="flex flex-col justify-end mt-6 mr-30">
  {/* 모바일: select */}
  <div className="block md:hidden">
    <select
      value={board}
      onChange={(e) => setBoard(e.target.value as BoardFilter)}
      className="w-full px-4 py-3 border rounded-xl"
    >
      <option value="all">전체</option>
      <option value="home_training">홈트</option>
      <option value="diet_success">다이어트 성공</option>
      <option value="bulkup_success">벌크업 성공</option>
      <option value="diet_consult">다이어트 고민</option>
      <option value="free">자유</option>
    </select>
  </div>

  {/* PC: 버튼 */}
  <div className="hidden md:flex gap-2 flex-wrap justify-end">
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
          px-4 py-2 rounded-full text-sm
          ${board === b.key
            ? "bg-gradient-to-br from-green-600 to-green-400 text-white"
            : "bg-gray-100 hover:bg-green-100"}
        `}
      >
        {b.label}
      </button>
    ))}
  </div>
</div>



    <div className="py-8 flex flex-col items-end">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 items-stretch">
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
