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
            px-6 py-3 rounded-full text-m font-semibold transition
            ${
              selected === part.key
                ? "bg-green-500 text-white"
                : "bg-green-50 text-green-700 hover:bg-green-100"
            }
          `}
        >
          {part.label}
        </button>
      ))}
    </div>
  );
}
