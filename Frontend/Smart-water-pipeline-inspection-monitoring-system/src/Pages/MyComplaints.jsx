
import React, { useEffect, useState } from "react";
import {
  Search,
  ClipboardList,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  CalendarDays,
  MapPin,
  Filter,
  RefreshCw,
  FileText,
  X,
  MessageSquare,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

// Demo records for initial UI testing.
// Replace with API data when backend is connected.
const DEMO_COMPLAINTS = [
  {
    id: "CMP-1001",
    title: "Water leakage near main road",
    pipelineCode: "PL-1042",
    category: "Water Leakage",
    location: "Vijay Nagar, Indore",
    priority: "HIGH",
    status: "IN_REVIEW",
    description:
      "Water leakage has been observed near the main road. Water is continuously flowing from the pipeline joint.",
    createdAt: "2026-10-28T10:30:00",
  },
  {
    id: "CMP-1002",
    title: "Low water pressure in residential area",
    pipelineCode: "PL-0877",
    category: "Pressure Issue",
    location: "Palasia, Indore",
    priority: "MEDIUM",
    status: "PENDING",
    description:
      "Residents are experiencing low water pressure during regular supply hours.",
    createdAt: "2026-10-26T14:20:00",
  },
  {
    id: "CMP-1003",
    title: "Damaged pipeline connection",
    pipelineCode: "PL-0311",
    category: "Pipeline Damage",
    location: "Bhawarkua, Indore",
    priority: "CRITICAL",
    status: "RESOLVED",
    description:
      "A damaged pipeline connection was reported and the maintenance team inspected it.",
    createdAt: "2026-10-22T09:15:00",
  },
  {
    id: "CMP-1004",
    title: "Unusual water flow detected",
    pipelineCode: "PL-0654",
    category: "Low Water Flow",
    location: "Rau, Indore",
    priority: "LOW",
    status: "PENDING",
    description:
      "Unusual changes in water flow have been noticed in this area.",
    createdAt: "2026-10-20T11:45:00",
  },
];

const STATUS_CONFIG = {
  PENDING: {
    label: "Pending",
    color: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
    icon: Clock,
  },
  IN_REVIEW: {
    label: "In Review",
    color: "bg-blue-50 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
    icon: Eye,
  },
  RESOLVED: {
    label: "Resolved",
    color: "bg-green-50 text-green-700 border-green-200",
    dot: "bg-green-500",
    icon: CheckCircle2,
  },
  REJECTED: {
    label: "Rejected",
    color: "bg-red-50 text-red-700 border-red-200",
    dot: "bg-red-500",
    icon: AlertCircle,
  },
};

const PRIORITY_CONFIG = {
  LOW: "bg-slate-100 text-slate-600",
  MEDIUM: "bg-amber-50 text-amber-700",
  HIGH: "bg-orange-50 text-orange-700",
  CRITICAL: "bg-red-50 text-red-700",
};

function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.PENDING;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${config.color}`}
    >
      <Icon size={13} />
      {config.label}
    </span>
  );
}

function PriorityBadge({ priority }) {
  return (
    <span
      className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
        PRIORITY_CONFIG[priority] || PRIORITY_CONFIG.MEDIUM
      }`}
    >
      {priority || "MEDIUM"}
    </span>
  );
}

export default function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [loading, setLoading] = useState(false);
  const [usingDemoData, setUsingDemoData] = useState(true);
  const [error, setError] = useState("");

  const fetchComplaints = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_BASE_URL}/api/complaints/my`,
        {
          headers: token
            ? { Authorization: `Bearer ${token}` }
            : {},
        }
      );

      if (!response.ok) {
        throw new Error("Unable to fetch complaints.");
      }

      const result = await response.json();

      const records = Array.isArray(result)
        ? result
        : result.data || result.complaints || [];

      setComplaints(records);
      setUsingDemoData(false);
    } catch (err) {
      // Keep the UI usable before the API is implemented.
      setComplaints(DEMO_COMPLAINTS);
      setUsingDemoData(true);
      setError("Showing sample complaints. Live records are not connected.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const normalizedStatus = (status) => {
    if (!status) return "PENDING";

    const value = status.toUpperCase().replaceAll(" ", "_");

    if (value === "INREVIEW") return "IN_REVIEW";

    return value;
  };

  const filteredComplaints = complaints.filter((complaint) => {
    const status = normalizedStatus(complaint.status);
    const priority = (complaint.priority || "MEDIUM").toUpperCase();

    const query = search.toLowerCase();

    const matchesSearch = [
      complaint.id,
      complaint.complaintId,
      complaint.title,
      complaint.pipelineCode,
      complaint.location,
      complaint.category,
    ].some((value) => String(value || "").toLowerCase().includes(query));

    const matchesStatus =
      statusFilter === "ALL" || status === statusFilter;

    const matchesPriority =
      priorityFilter === "ALL" || priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const stats = [
    {
      label: "Total Complaints",
      value: complaints.length,
      icon: ClipboardList,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Pending",
      value: complaints.filter(
        (c) => normalizedStatus(c.status) === "PENDING"
      ).length,
      icon: Clock,
      color: "bg-amber-50 text-amber-600",
    },
    {
      label: "In Review",
      value: complaints.filter(
        (c) => normalizedStatus(c.status) === "IN_REVIEW"
      ).length,
      icon: Eye,
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      label: "Resolved",
      value: complaints.filter(
        (c) => normalizedStatus(c.status) === "RESOLVED"
      ).length,
      icon: CheckCircle2,
      color: "bg-green-50 text-green-600",
    },
  ];

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) return "Date unavailable";

    return parsed.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getComplaintId = (complaint) =>
    complaint.complaintId || complaint.id || complaint._id || "N/A";

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F5F8FC]">

      {/* Page heading */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
                <ClipboardList size={14} />
                CITIZEN PORTAL
              </span>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
                My Complaints
              </h1>

              <p className="mt-2 text-sm text-slate-500 sm:text-base">
                Track your submitted complaints and monitor their progress.
              </p>
            </div>

            <a
              href="/report-issue"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
            >
              <MessageSquare size={17} />
              Report New Issue
            </a>

          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl space-y-7 px-4 py-9 sm:px-6 lg:px-8">

        {/* Demo warning */}
        {usingDemoData && (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-center gap-2 text-sm text-amber-800">
              <AlertCircle size={18} />
              <span>
                {error || "Showing illustrative sample records, not live complaints."}
              </span>
            </div>

            <button
              onClick={fetchComplaints}
              className="text-sm font-semibold text-amber-800 underline"
            >
              Retry API
            </button>
          </div>
        )}

        {/* Statistics */}
        <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-2">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${color}`}>
                  <Icon size={21} />
                </div>

                <span className="text-2xl font-bold text-slate-900">
                  {value}
                </span>
              </div>

              <p className="mt-4 text-sm font-medium text-slate-500">
                {label}
              </p>
            </div>
          ))}
        </section>

        {/* Complaints list */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="flex flex-col justify-between gap-4 border-b border-slate-100 px-6 py-5 lg:flex-row lg:items-center">

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Complaint History
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                View and track all your submitted reports.
              </p>
            </div>

            <button
              onClick={fetchComplaints}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
            >
              <RefreshCw
                size={15}
                className={loading ? "animate-spin" : ""}
              />
              Refresh
            </button>

          </div>

          {/* Filters */}
          <div className="grid gap-3 border-b border-slate-100 bg-slate-50/60 p-5 md:grid-cols-3">

            <div className="relative">
              <Search
                size={17}
                className="absolute left-3.5 top-3.5 text-slate-400"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search complaints..."
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div className="relative">
              <Filter
                size={16}
                className="absolute left-3.5 top-3.5 text-slate-400"
              />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-9 text-sm text-slate-700 outline-none focus:border-blue-500"
              >
                <option value="ALL">All Statuses</option>
                <option value="PENDING">Pending</option>
                <option value="IN_REVIEW">In Review</option>
                <option value="RESOLVED">Resolved</option>
                <option value="REJECTED">Rejected</option>
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-3.5 text-slate-400"
              />
            </div>

            <div className="relative">
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-9 text-sm text-slate-700 outline-none focus:border-blue-500"
              >
                <option value="ALL">All Priorities</option>
                <option value="LOW">Low Priority</option>
                <option value="MEDIUM">Medium Priority</option>
                <option value="HIGH">High Priority</option>
                <option value="CRITICAL">Critical Priority</option>
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-3.5 text-slate-400"
              />
            </div>

          </div>

          {/* Results */}
          <div className="px-5 py-4 sm:px-6">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-800">
                {filteredComplaints.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-800">
                {complaints.length}
              </span>{" "}
              complaints
            </p>
          </div>

          {/* Table */}
          {loading ? (
            <div className="flex min-h-64 flex-col items-center justify-center">
              <div className="h-9 w-9 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
              <p className="mt-4 text-sm text-slate-500">
                Loading complaints...
              </p>
            </div>
          ) : filteredComplaints.length === 0 ? (
            <div className="flex min-h-72 flex-col items-center justify-center px-5 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <ClipboardList size={30} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-800">
                No complaints found
              </h3>

              <p className="mt-2 max-w-sm text-sm text-slate-500">
                There are no complaints matching your search or filters.
                Submit a new complaint if you need to report an issue.
              </p>

              <a
                href="/report-issue"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Report an Issue
                <ArrowRight size={16} />
              </a>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left">

                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Complaint</th>
                    <th className="px-6 py-4 font-semibold">Pipeline</th>
                    <th className="px-6 py-4 font-semibold">Priority</th>
                    <th className="px-6 py-4 font-semibold">Submitted</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 text-right font-semibold">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredComplaints.map((complaint) => (
                    <tr
                      key={getComplaintId(complaint)}
                      className="transition hover:bg-blue-50/40"
                    >
                      <td className="px-6 py-5">
                        <p className="font-semibold text-slate-800">
                          {complaint.title || complaint.subject || "Untitled complaint"}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {getComplaintId(complaint)}
                        </p>

                        <p className="mt-2 flex items-center gap-1 text-xs text-slate-400">
                          <MapPin size={12} />
                          {complaint.location || "Location unavailable"}
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        <span className="text-sm font-semibold text-slate-700">
                          {complaint.pipelineCode || "N/A"}
                        </span>

                        <p className="mt-1 text-xs text-slate-400">
                          {complaint.category || "General"}
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        <PriorityBadge priority={complaint.priority} />
                      </td>

                      <td className="px-6 py-5">
                        <span className="flex items-center gap-2 text-sm text-slate-600">
                          <CalendarDays size={15} className="text-slate-400" />
                          {formatDate(
                            complaint.createdAt || complaint.submittedAt
                          )}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <StatusBadge
                          status={normalizedStatus(complaint.status)}
                        />
                      </td>

                      <td className="px-6 py-5 text-right">
                        <button
                          onClick={() => setSelectedComplaint(complaint)}
                          className="inline-flex items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
                        >
                          <Eye size={14} />
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}

          <div className="border-t border-slate-100 bg-slate-50/50 px-6 py-4">
            <p className="text-xs text-slate-400">
              Complaint records are displayed according to their latest available status.
            </p>
          </div>

        </section>
      </main>

      {/* Complaint Details Modal */}
      {selectedComplaint && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onClick={() => setSelectedComplaint(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  Complaint Details
                </p>
                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  {getComplaintId(selectedComplaint)}
                </h2>
              </div>

              <button
                onClick={() => setSelectedComplaint(null)}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200"
              >
                <X size={19} />
              </button>
            </div>

            <div className="space-y-6 p-6">

              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {selectedComplaint.title || selectedComplaint.subject}
                </h3>

                <div className="mt-3 flex flex-wrap gap-2">
                  <StatusBadge
                    status={normalizedStatus(selectedComplaint.status)}
                  />
                  <PriorityBadge priority={selectedComplaint.priority} />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Pipeline Code", selectedComplaint.pipelineCode],
                  ["Category", selectedComplaint.category],
                  ["Location", selectedComplaint.location],
                  [
                    "Submitted Date",
                    formatDate(
                      selectedComplaint.createdAt ||
                      selectedComplaint.submittedAt
                    ),
                  ],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl bg-slate-50 p-4">
                    <p className="text-xs font-medium text-slate-400">
                      {label}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-800">
                      {value || "Not available"}
                    </p>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-800">
                  Issue Description
                </h4>
                <p className="mt-2 rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">
                  {selectedComplaint.description || "No description available."}
                </p>
              </div>

              {selectedComplaint.imageUrl && (
                <div>
                  <h4 className="mb-3 text-sm font-bold text-slate-800">
                    Attached Image
                  </h4>
                  <img
                    src={selectedComplaint.imageUrl}
                    alt="Complaint evidence"
                    className="max-h-64 w-full rounded-xl border border-slate-200 object-contain"
                  />
                </div>
              )}

              <button
                onClick={() => setSelectedComplaint(null)}
                className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Close Details
              </button>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
