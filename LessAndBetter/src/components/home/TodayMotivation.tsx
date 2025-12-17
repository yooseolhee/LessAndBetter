import { useEffect, useState } from "react";
import Card from "../layout/Card";

interface Quote {
  text: string;
  author: string | null;
}

export default function TodayMotivation() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/quote/api/quotes")
      .then((res) => res.json())
      .then((data: Quote[]) => {
        const random = data[Math.floor(Math.random() * data.length)];
        setQuote(random.text);
        setAuthor(random.author ?? "Unknown");
      })
      .catch(() => {
        setQuote("오늘의 운동이 내일의 나를 만든다.");
        setAuthor("홈트 메이트");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Card title="오늘의 동기부여">
    <div className="h-full justify-center items-center flex flex-col">
      {loading ? (
        <p className="text-gray-400">불러오는 중...</p>
      ) : (
        <>
          <p className="text-md font-medium text-gray-800 leading-relaxed">
            “{quote}”
          </p>
          <span className="mt-4 text-xs text-gray-500 text-right">
            — {author}
          </span>
        </>
      )}
    </div>
    </Card>
  );
}
