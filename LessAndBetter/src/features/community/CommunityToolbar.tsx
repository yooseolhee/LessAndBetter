import type { SortType } from "./types";

export default function CommunityToolbar({
  sort,
  onChangeSort,
}: {
  sort: SortType;
  onChangeSort: (s: SortType) => void;
}) {
  return (
    <div className="flex gap-2">
      {(["latest", "popular", "comment"] as SortType[]).map((s) => (
        <button
          key={s}
          onClick={() => onChangeSort(s)}
          className={`text-xs px-4 py-2 rounded-full hover:bg-green-100 ${
            sort === s
              ? "bg-gradient-to-br from-green-600 to-green-400 text-white"
              : ""
          }`}
        >
          {s === "latest" && "최신순"}
          {s === "popular" && "인기순"}
          {s === "comment" && "댓글순"}
        </button>
      ))}
    </div>
  );
}

