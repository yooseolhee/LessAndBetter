export default function VideoCard({ video }: { video: any }) {
  return (
    <div
      onClick={() =>
        window.open(`https://www.youtube.com/watch?v=${video.id}`)
      }
      className="
        bg-white rounded-2xl shadow
        cursor-pointer overflow-hidden
        hover:shadow-lg transition
      "
    >
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full h-44 object-cover"
      />

      <div className="p-5 space-y-2">
        <h3 className="font-semibold text-gray-900 line-clamp-2">
          {video.title}
        </h3>

        <p className="text-sm text-gray-600">{video.channel}</p>

        <p className="text-sm text-gray-500">
          조회수 {video.viewCount.toLocaleString()}회
        </p>
      </div>
    </div>
  );
}
