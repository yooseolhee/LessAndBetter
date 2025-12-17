const parts = [
  { key: "all", label: "전신" },
  { key: "upper", label: "상체" },
  { key: "lower", label: "하체" },
  { key: "core", label: "복부" },
];

export default function BodyFilter({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (key: string) => void;
}) {
  return (
    <div className="flex gap-4">
      {parts.map((part) => (
        <button
          key={part.key}
          onClick={() => onSelect(part.key)}
          className={`
            px-4 py-2 rounded-full text-xs font-semibold transition cursor-pointer
            ${
              selected === part.key
                ? "bg-gradient-to-br from-green-600 to-green-300 text-white"
                : "bg-green-100 text-green-700 hover:bg-gradient-to-br from-green-400 to-green-200 hover:text-white"
            }
          `}
        >
          {part.label}
        </button>
      ))}
    </div>
  );
}
