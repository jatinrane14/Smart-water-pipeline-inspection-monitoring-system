import { useState } from "react";
import PageHeader from "../../common/Shared UI Primitives/PageHeader";
import { AlertTriangle } from "lucide-react";
import DataTable
 from "../../common/Shared UI Primitives/DataTable";
 import StatusBadge from "../../common/Shared UI Primitives/StatusBadge";
 import RowActions from "../../common/RowActions";
function EventsSection({INITIAL_EVENTS}) {
  const [events, setEvents] = useState(INITIAL_EVENTS);

  function simulateEvent() {
    const id = `EV-SIM-${Math.floor(Math.random() * 9000 + 1000)}`;
    const pool = PIPELINES;
    const p = pool[Math.floor(Math.random() * pool.length)];
    const types = ["Leak", "Pressure Abnormality", "Flow Abnormality", "Acoustic Alert", "Optical Alert"];
    const newEvent = {
      id,
      pipelineId: p.id,
      type: `Simulated Leak (${types[Math.floor(Math.random() * types.length)]})`,
      location: p.location,
      detected: new Date().toISOString().slice(0, 16).replace("T", " "),
      source: "Simulation Engine",
      severity: "Critical",
      status: "Open",
      simulated: true,
    };
    setEvents([newEvent, ...events]);
  }

  return (
    <div>
      <PageHeader
        title="Leak / Abnormal Events"
        subtitle="Real-time and simulated anomaly feed across the network"
        action={
          <button
            onClick={simulateEvent}
            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium px-3 py-1.5 rounded"
          >
            <AlertTriangle size={14} /> Simulate Leak Event
          </button>
        }
      />
      <p className="text-xs text-gray-400 mb-3">
        Events marked <span className="font-semibold">SIMULATED</span> are generated for prototype demonstration only and do not represent real sensor readings.
      </p>
      <DataTable
        columns={[
          { key: "id", label: "Event ID" },
          { key: "pipelineId", label: "Pipeline ID" },
          { key: "type", label: "Event Type" },
          { key: "location", label: "Location" },
          { key: "detected", label: "Detected Time" },
          {
            key: "source",
            label: "Source",
            render: (r) => (
              <span className="flex items-center gap-1">
                {r.source}
                {r.simulated && (
                  <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded px-1 py-0.5 ml-1">
                    SIMULATED
                  </span>
                )}
              </span>
            ),
          },
          { key: "severity", label: "Severity", render: (r) => <StatusBadge value={r.severity} /> },
          { key: "status", label: "Status", render: (r) => <StatusBadge value={r.status} /> },
          { key: "action", label: "Action", render: () => <RowActions onView={() => {}} /> },
        ]}
        rows={events}
      />
    </div>
  );
}
export default EventsSection;