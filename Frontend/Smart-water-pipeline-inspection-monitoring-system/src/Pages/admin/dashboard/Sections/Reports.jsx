import PageHeader from "../../common/Shared UI Primitives/PageHeader";
import { FileText,Download } from "lucide-react";


const REPORT_TYPES = [
  { id: "RPT-1", name: "Pipeline Inspection Report", desc: "Per-pipeline inspection history and findings." },
  { id: "RPT-2", name: "AI Defect Analysis Report", desc: "Aggregated AI-detected defects and confidence scores." },
  { id: "RPT-3", name: "Leakage Report", desc: "Leak events, sources and resolution timelines." },
  { id: "RPT-4", name: "Maintenance Report", desc: "Work orders, teams and completion status." },
  { id: "RPT-5", name: "Complaint Report", desc: "Citizen complaints by type, ward and status." },
  { id: "RPT-6", name: "Monthly Pipeline Condition Report", desc: "Network-wide condition summary for the month." },
];



function ReportsSection() {
  return (
    <div>
      <PageHeader title="Reports" subtitle="Generate and download operational reports" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {REPORT_TYPES.map((r) => (
          <div key={r.id} className="bg-white border border-gray-200 rounded p-4 flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="bg-blue-50 text-blue-700 rounded p-2">
                <FileText size={16} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">{r.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{r.desc}</p>
              </div>
            </div>
            <div className="flex flex-col gap-1 text-xs font-medium text-blue-700 whitespace-nowrap">
              <button className="hover:underline text-left">View</button>
              <button className="hover:underline text-left">Generate</button>
              <button className="hover:underline text-left flex items-center gap-1">
                <Download size={12} /> Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ReportsSection;