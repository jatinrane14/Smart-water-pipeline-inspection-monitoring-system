import statusTone from "../StatusTone";
function StatusBadge({ value }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${statusTone(value)}`}>
      {value}
    </span>
  );
}
export default StatusBadge;