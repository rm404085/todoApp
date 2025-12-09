// components/dashboard/StatsCard.tsx
export default function StatsCard({ title, value, color }: { title: string; value: string | number; color: string; }) {
  return (
    <div className={`p-5 rounded-lg shadow bg-${color}-100 border-l-4 border-${color}-500`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
