import type { Post } from "./types";

export default function PostCard({
  post,
  onClick,
}: {
  post: Post;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="h-full min-h-[200px] flex flex-col bg-gradient-to-br from-green-200 to-green-50 rounded-2xl p-5 cursor-pointer hover:shadow-lg hover:scale-110 transition"
    >
      {/* 상단: 제목 */}
      <h3 className="text-lg font-semibold mb-2 line-clamp-2">
        {post.title}
      </h3>

      {/* 중단: 내용 */}
      <p className="text-sm text-gray-500 line-clamp-3">
        {post.content}
      </p>

      {/* 하단 고정 영역 */}
      <div className="mt-auto pt-4 flex justify-end">
        <div className="flex items-center gap-3 text-sm text-gray-500">
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
  );
}
