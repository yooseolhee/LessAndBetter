export default function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="text-center bg-white rounded-2xl shadow-md p-6 hover:bg-green-50 flex flex-col">
      <h3 className="text-lg font-bold mb-3">{title}</h3>
      {children}
    </div>
  );
}
