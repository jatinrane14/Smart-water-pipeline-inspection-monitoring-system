import React from 'react'

function MaintenanceSection() {
  const counts = MAINTENANCE.reduce((acc, m) => {
    acc[m.status] = (acc[m.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <PageHeader title="Maintenance" subtitle="Work orders across field teams" />
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
        <SummaryCard label="Pending" value={counts["Pending"] || 0} />
        <SummaryCard label="Assigned" value={counts["Assigned"] || 0} tone="blue" />
        <SummaryCard label="In Progress" value={counts["In Progress"] || 0} tone="amber" />
        <SummaryCard label="Completed" value={counts["Completed"] || 0} tone="green" />
        <SummaryCard label="Overdue" value={counts["Overdue"] || 0} tone="red" />
      </div>
      <DataTable
        columns={[
          { key: "id", label: "Maintenance ID" },
          { key: "pipelineId", label: "Pipeline ID" },
          { key: "issue", label: "Issue" },
          { key: "severity", label: "Severity", render: (r) => <StatusBadge value={r.severity} /> },
          { key: "team", label: "Assigned Team" },
          { key: "created", label: "Created Date" },
          { key: "due", label: "Due Date" },
          { key: "status", label: "Status", render: (r) => <StatusBadge value={r.status} /> },
          {
            key: "action",
            label: "Action",
            render: () => (
              <div className="flex items-center gap-3 text-xs text-blue-700 font-medium">
                <button className="hover:underline">Assign</button>
                <button className="hover:underline">Update</button>
                <button className="hover:underline">View</button>
              </div>
            ),
          },
        ]}
        rows={MAINTENANCE}
      />
    </div>
  );
}

export default MaintenanceSection
