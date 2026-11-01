import React,{useState} from "react";
import PageHeader from "../../common/Shared UI Primitives/PageHeader";
import SummaryCard from "../../common/SummaryCard";
import DataTable from "../../common/Shared UI Primitives/DataTable";
import StatusBadge from "../../common/Shared UI Primitives/StatusBadge";
import { AlertTriangle } from "lucide-react";
import RowActions from "../../common/RowActions";
import statusTone from "../../common/StatusTone";


const INSPECTIONS = [
  { id: "INS-5001", pipelineId: "PL-1003", date: "2026-09-22", inspector: "R. Mehta", image: "frame_0231.jpg", aiStatus: "Complete", severity: "Critical", status: "Reviewed" },
  { id: "INS-5002", pipelineId: "PL-1005", date: "2026-09-24", inspector: "S. Kulkarni", image: "frame_0114.jpg", aiStatus: "Complete", severity: "Critical", status: "Pending Review" },
  { id: "INS-5003", pipelineId: "PL-1002", date: "2026-09-18", inspector: "A. Verma", image: "frame_0087.jpg", aiStatus: "Complete", severity: "Moderate", status: "Reviewed" },
  { id: "INS-5004", pipelineId: "PL-1006", date: "2026-09-15", inspector: "R. Mehta", image: "frame_0056.jpg", aiStatus: "Complete", severity: "Moderate", status: "Reviewed" },
  { id: "INS-5005", pipelineId: "PL-1001", date: "2026-09-12", inspector: "S. Kulkarni", image: "frame_0022.jpg", aiStatus: "Complete", severity: "Low", status: "Closed" },
];

const RECENT_ALERTS = [
  { id: "AL-01", type: "Leak detected", detail: "PL-1005 — Bhawarkuan Feeder", time: "2 hours ago", level: "Critical" },
  { id: "AL-02", type: "Pipeline damage", detail: "PL-1003 — Rajwada Distribution Line", time: "1 day ago", level: "Critical" },
  { id: "AL-03", type: "Critical inspection result", detail: "INS-5002 flagged by AI model", time: "1 day ago", level: "Critical" },
  { id: "AL-04", type: "Maintenance overdue", detail: "MT-3002 — Sudama Nagar Branch", time: "3 days ago", level: "Warning" },
];
function DashboardSection({PIPELINES}) {
  const conditionCounts = PIPELINES?.reduce((acc, p) => {
    acc[p.conditionStatus] = (acc[p.conditionStatus] || 0) + 1;
    return acc;
  }, {});
  console.log(conditionCounts)
  const conditionRows = [
    { label: "HEALTHY", key: "HEALTHY", color: "bg-blue-600" },
    { label: "Moderate", key: "MODERATE", color: "bg-amber-500" },
    { label: "Damaged", key: "Damaged", color: "bg-red-500" },
    { label: "Critical", key: "CRITICAL", color: "bg-red-700" },
  ];
  const maxCount = Math.max(...conditionRows.map((r) => conditionCounts[r.key] || 0), 1);

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Water Pipeline Inspection and Monitoring Overview" />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
        <SummaryCard label="Total Pipelines" value={PIPELINES.length} tone="blue" />
        <SummaryCard label="Active Inspections" value={INSPECTIONS.length} tone="default" />
        <SummaryCard label="Detected Issues" value="9" tone="amber" />
        <SummaryCard label="Critical Issues" value="2" tone="red" />
        <SummaryCard label="Pending Maintenance" value="3" tone="amber" />
        <SummaryCard label="Open Complaints" value="2" tone="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
        <div className="bg-white border border-gray-200 rounded p-4 lg:col-span-1">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Pipeline Condition Summary</h2>
          <div className="space-y-3">
            {conditionRows.map((r) => (
              <div key={r.key}>
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>{r.label}</span>
                  <span>{conditionCounts[r.key] || 0}</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded">
                  <div
                    className={`h-2 rounded ${r.color}`}
                    style={{ width: `${((conditionCounts[r.key] || 0) / maxCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded p-4 lg:col-span-2">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Recent Alerts</h2>
          <div className="space-y-2">
            {RECENT_ALERTS.map((a) => (
              <div key={a.id} className="flex items-start justify-between border-b border-gray-100 last:border-0 pb-2 last:pb-0">
                <div className="flex items-start gap-2">
                  <AlertTriangle size={14} className={a.level === "Critical" ? "text-red-600 mt-0.5" : "text-amber-500 mt-0.5"} />
                  <div>
                    <p className="text-sm text-gray-800 font-medium">{a.type}</p>
                    <p className="text-xs text-gray-500">{a.detail}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-gray-700 mb-2">Recent Inspection Table</h2>
        <DataTable
          columns={[
            { key: "id", label: "Inspection ID" },
            { key: "pipelineId", label: "Pipeline ID" },
            { key: "location", label: "Location", render: (r) => PIPELINES.find((p) => p.id === r.pipelineId)?.location || "-" },
            { key: "date", label: "Inspection Date" },
            { key: "defect", label: "Defect", render: (r) => (r.severity === "Low" ? "Minor wear" : "See AI report") },
            { key: "severity", label: "Severity", render: (r) => <StatusBadge value={r.severity} /> },
            { key: "status", label: "Status", render: (r) => <StatusBadge value={r.status} /> },
            { key: "action", label: "Action", render: () => <RowActions onView={() => {}} /> },
          ]}
          rows={INSPECTIONS.slice(0, 5)}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------
   SECTION: PIPELINE MANAGEMENT
   ------------------------------------------------------------ */

/* ------------------------------------------------------------
   SECTION: INSPECTION MANAGEMENT
   ------------------------------------------------------------ */

function InspectionsSection() {
  return (
    <div>
      <PageHeader title="Inspection Management" subtitle="Schedule, track and review pipeline inspections" />
      <Toolbar searchPlaceholder="Search inspections..." onAddClick={() => {}} addLabel="New Inspection" />
      <DataTable
        columns={[
          { key: "id", label: "Inspection ID" },
          { key: "pipelineId", label: "Pipeline ID" },
          { key: "date", label: "Inspection Date" },
          { key: "inspector", label: "Inspector" },
          { key: "image", label: "Image" },
          { key: "aiStatus", label: "AI Status", render: (r) => <StatusBadge value={r.aiStatus} /> },
          { key: "severity", label: "Severity", render: (r) => <StatusBadge value={r.severity} /> },
          { key: "status", label: "Inspection Status", render: (r) => <StatusBadge value={r.status} /> },
          {
            key: "actions",
            label: "Actions",
            render: () => (
              <div className="flex items-center gap-3 text-xs text-blue-700 font-medium">
                <button className="hover:underline">View</button>
                <button className="hover:underline">Analyze</button>
                <button className="hover:underline flex items-center gap-1">
                  <Download size={12} /> Report
                </button>
              </div>
            ),
          },
        ]}
        rows={INSPECTIONS}
      />
    </div>
  );
}

export default DashboardSection;