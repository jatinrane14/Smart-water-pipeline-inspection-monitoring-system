
function SummaryCard({ label, value, tone }) {
  const toneClasses = {
    default: "text-gray-800",
    blue: "text-blue-700",
    amber: "text-amber-600",
    red: "text-red-600",
    green: "text-green-600",
  };
  return (
    <div className="bg-white border border-gray-200 rounded px-4 py-3">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
      <p className={`text-2xl font-semibold mt-1 ${toneClasses[tone || "default"]}`}>{value}</p>
    </div>
  );
}
export default SummaryCard;