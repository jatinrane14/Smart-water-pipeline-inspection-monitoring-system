import { useState } from "react";
import PageHeader from "../../common/Shared UI Primitives/PageHeader";
import Toolbar from "../../common/ToolBar";
import DataTable from "../../common/Shared UI Primitives/DataTable";
import Header from "../../common/Header";
import StatusBadge from "../../common/Shared UI Primitives/StatusBadge";
import statusTone from "../../common/StatusTone";
import SummaryCard from "../../common/SummaryCard";
import Modal from "../../common/Model";
import Field from "../../common/Field";
import RowActions from "../../common/RowActions";

import { Trash2 } from "lucide-react";

function PipelinesSection({PIPELINES}) {
  const [pipelines, setPipelines] = useState(PIPELINES);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    pipelineCode: "", pipelineName: "", diameterMm: "", material: "", location: "", length: "", installDate: "", operationalStatus: "Active",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  } 
  console.log(form);
  
  function handleSubmit(e) {
    e.preventDefault();
    if (!form.id || !form.name) return;
    setPipelines([
      { ...form, conditionStatus: "Normal", lastInspection: "-", path: [] },
      ...pipelines,
    ]);
    setForm({ id: "", name: "", diameterMm: "", material: "", location: "", lengthM: "", installDate: "", status: "Active" });
    setShowAdd(false);
  }

  return (
    <div>
      <PageHeader title="Pipeline Management" subtitle="Register and track distribution line assets" />
      <Toolbar searchPlaceholder="Search pipelines..." onAddClick={() => setShowAdd(true)} addLabel="Add Pipeline" />
      <DataTable
        columns={[
          { key: "pipelineCode", label: "Pipeline ID" },
          { key: "pipelineName", label: "Pipeline Name" },
          { key: "diameterMm", label: "Diameter" },
          { key: "material", label: "Material" },
          { key: "location", label: "Location" },
          { key: "length", label: "Length" },
          { key: "conditionStatus", label: "Condition", render: (r) => <StatusBadge value={r.conditionStatus} /> },
          { key: "recordedAt", label: "Last Inspection" },
          { key: "status", label: "Status", render: (r) => <StatusBadge value={r.operationalStatus} /> },
          { key: "actions", label: "Actions", render: () => <RowActions onView={() => {}} onEdit={() => {}} onDelete={() => {}} /> },
        ]}
        rows={pipelines}
      />

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="Add Pipeline" wide>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-4">
          <Field label="Pipeline ID" name="id" value={form.pipelineCode} onChange={handleChange} required />
          <Field label="Pipeline Name" name="name" value={form.name} onChange={handleChange} required />
          <Field label="Diameter (e.g. 150mm)" name="diameter" value={form.diameter} onChange={handleChange} />
          <Field label="Material" name="material" value={form.material} onChange={handleChange} />
          <Field label="Location" name="location" value={form.location} onChange={handleChange} />
          <Field label="Length" name="length" value={form.lengthM} onChange={handleChange} />
          <Field label="Installation Date" name="installDate" type="date" value={form.installDate} onChange={handleChange} />
          <label className="block mb-3">
            <span className="block text-xs font-medium text-gray-600 mb-1">Status</span>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full text-sm border border-gray-300 rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-600"
            >
              <option>Active</option>
              <option>Under Repair</option>
              <option>Flagged</option>
              <option>Decommissioned</option>
            </select>
          </label>
          <div className="col-span-2 flex justify-end gap-2 mt-2 border-t border-gray-100 pt-3">
            <button type="button" onClick={() => setShowAdd(false)} className="text-sm px-3 py-1.5 rounded border border-gray-300 text-gray-600 hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" className="text-sm px-3 py-1.5 rounded bg-blue-700 text-white hover:bg-blue-800">
              Save Pipeline
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default PipelinesSection;