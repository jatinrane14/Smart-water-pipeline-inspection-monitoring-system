function statusTone(value) {
  const v = (value || "").toLowerCase();
  if (["normal", "active", "completed", "resolved", "closed", "online", "reviewed", "low"].includes(v)) {
    return "bg-green-50 text-green-700 border border-green-200";
  }
  if (["moderate", "pending", "pending review", "assigned", "under review", "in progress", "warning", "medium", "investigating"].includes(v)) {
    return "bg-amber-50 text-amber-700 border border-amber-200";
  }
  if (["damaged", "critical", "overdue", "open", "flagged", "high", "disabled", "under repair", "new"].includes(v)) {
    return "bg-red-50 text-red-700 border border-red-200";
  }
  return "bg-gray-100 text-gray-600 border border-gray-200";
}
export default statusTone;