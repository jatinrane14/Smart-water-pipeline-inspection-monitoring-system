import React, { useEffect, useState } from 'react';

// Icons
import { Eye } from 'lucide-react';

import PageHeader from '../../common/Shared UI Primitives/PageHeader';
import Toolbar from '../../common/ToolBar';
import DataTable from '../../common/Shared UI Primitives/DataTable';
import RowActions from '../../common/RowActions';
import statusTone from '../../common/StatusTone';
function StatusBadge({ value }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${statusTone(value)}`}>
      {value}
    </span>
  );
}
const ComplaintsSection = () => {
    const COMPLAINTS = [
  { id: "CM-201", source: "Citizen (Ward 12)", location: "MG Road, Indore", pipelineId: "PL-1001", type: "Contamination", date: "2026-09-25", priority: "High", status: "New", officer: "Unassigned" },
  { id: "CM-202", source: "Citizen (Ward 6)", location: "Rajwada, Indore", pipelineId: "PL-1003", type: "Leakage", date: "2026-09-23", priority: "High", status: "Assigned", officer: "R. Mehta" },
  { id: "CM-203", source: "Citizen (Ward 9)", location: "Sudama Nagar, Indore", pipelineId: "PL-1006", type: "Low Pressure", date: "2026-09-20", priority: "Medium", status: "Under Review", officer: "A. Verma" },
  { id: "CM-204", source: "Citizen (Ward 3)", location: "Palasia, Indore", pipelineId: "PL-1004", type: "Water Quality", date: "2026-09-14", priority: "Low", status: "Resolved", officer: "S. Kulkarni" },
];
    const [complaints,setComplaints] = useState(null)
    useEffect(()=>{

    },[])
  return (
    <React.Fragment>
        <div>
      <PageHeader title="Complaints" subtitle="Citizen-reported issues and resolution tracking" />
      <Toolbar searchPlaceholder="Search complaints..." />
      <DataTable
        columns={[
          { key: "id", label: "Complaint ID" },
          { key: "source", label: "Citizen / Source" },
          { key: "location", label: "Location" },
          { key: "pipelineId", label: "Pipeline ID" },
          { key: "type", label: "Complaint Type" },
          { key: "date", label: "Date" },
          { key: "priority", label: "Priority", render: (r) => <StatusBadge value={r.priority} /> },
          { key: "status", label: "Status", render: (r) => <StatusBadge value={r.status} /> },
          { key: "officer", label: "Assigned Officer" },
          { key: "action", label: "Action", render: () => <RowActions onView={() => {}} onEdit={() => {}} /> },
        ]}
        rows={COMPLAINTS}
      />
    </div>
    </React.Fragment>
  )
}

export default ComplaintsSection
