import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import {
  LayoutDashboard,
  Waves,
  ClipboardCheck,
  Map as MapIcon,
  AlertTriangle,
  MessageSquare,
  Wrench,
  FileText,
  Users as UsersIcon,
  Settings as SettingsIcon,
  Database,
  Cpu,
} from "lucide-react";
import "leaflet/dist/leaflet.css";
// Comman
import Header from "../common/Header";
import PageHeader from "../common/Shared UI Primitives/PageHeader";
import Modal from "../common/Model";
import Field from "../common/Field";
import { ShieldAlert } from "lucide-react";
// Sections
import EventsSection from "./Sections/EventSection";
import DashboardSection from "./Sections/Dashboard";
import ComplaintsSection from "./Sections/Complaints";
import MaintenanceSection from "./Sections/Maintenance";
import PipelinesSection from "./Sections/PipelinesSection";
import GISMapSection from "./Sections/GISMapSection";
import ReportsSection from "./Sections/Reports";
import { useContext } from "react";
import { useAppContext } from "../../../Context";
import { jwtDecode } from "jwt-decode";


const INITIAL_EVENTS = [
  { id: "EV-9001", pipelineId: "PL-1005", type: "Leak", location: "Bhawarkuan, Indore", detected: "2026-09-24 09:14", source: "Acoustic Sensor", severity: "Critical", status: "Open", simulated: false },
  { id: "EV-9002", pipelineId: "PL-1003", type: "Pressure Abnormality", location: "Rajwada, Indore", detected: "2026-09-22 16:40", source: "Pressure Sensor", severity: "Moderate", status: "Investigating", simulated: false },
  { id: "EV-9003", pipelineId: "PL-1002", type: "Acoustic Alert", location: "Vijay Nagar, Indore", detected: "2026-09-18 11:05", source: "Acoustic Sensor", severity: "Low", status: "Closed", simulated: false },
];



const MAINTENANCE = [
  { id: "MT-3001", pipelineId: "PL-1003", issue: "Crack repair", severity: "Critical", team: "Field Team A", created: "2026-09-22", due: "2026-09-26", status: "In Progress" },
  { id: "MT-3002", pipelineId: "PL-1006", issue: "Joint reinforcement", severity: "Moderate", team: "Field Team B", created: "2026-09-15", due: "2026-09-21", status: "Overdue" },
  { id: "MT-3003", pipelineId: "PL-1002", issue: "Corrosion treatment", severity: "Moderate", team: "Field Team A", created: "2026-09-18", due: "2026-09-27", status: "Assigned" },
  { id: "MT-3004", pipelineId: "PL-1001", issue: "Routine valve check", severity: "Low", team: "Field Team C", created: "2026-09-12", due: "2026-09-19", status: "Completed" },
];


const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "pipelines", label: "Pipeline Management", icon: Waves },
  { key: "inspections", label: "Inspection Management", icon: ClipboardCheck },
  { key: "gis", label: "GIS Pipeline Map", icon: MapIcon },
  { key: "events", label: "Leak / Abnormal Events", icon: AlertTriangle },
  { key: "complaints", label: "Complaints", icon: MessageSquare },
  { key: "maintenance", label: "Maintenance", icon: Wrench },
  { key: "reports", label: "Reports", icon: FileText },
  { key: "users", label: "Users", icon: UsersIcon },
  { key: "settings", label: "Settings", icon: SettingsIcon },
];

/* ------------------------------------------------------------
   SHARED UI PRIMITIVES
   ------------------------------------------------------------ */















const MOCK_DEFECTS = [
  { type: "Crack", confidence: 92, severity: "Critical", bbox: "x:142,y:88,w:64,h:40" },
  { type: "Corrosion", confidence: 78, severity: "Moderate", bbox: "x:210,y:120,w:50,h:30" },
  { type: "Joint Damage", confidence: 65, severity: "Low", bbox: "x:60,y:200,w:38,h:28" },
];

function SettingsSection() {
  return (
    <div>
      <PageHeader title="Settings" subtitle="Account, system and security preferences" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-200 rounded p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Account Settings</h3>
          <Field label="Name" defaultValue="Admin User" />
          <Field label="Email" defaultValue="admin@aquasentry.gov.in" />
          <Field label="Phone" defaultValue="+91 98765 43210" />
          <Field label="Department" defaultValue="IT Cell" />
          <button className="mt-1 text-sm bg-blue-700 hover:bg-blue-800 text-white px-3 py-1.5 rounded">Save Changes</button>
        </div>

        <div className="bg-white border border-gray-200 rounded p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">System Settings</h3>
          <label className="flex items-center justify-between text-sm text-gray-600 mb-3">
            Notification preferences
            <input type="checkbox" defaultChecked className="accent-blue-700" />
          </label>
          <label className="block mb-3">
            <span className="block text-xs font-medium text-gray-600 mb-1">AI Confidence Threshold</span>
            <input type="range" min="0" max="100" defaultValue="70" className="w-full accent-blue-700" />
          </label>
          <label className="block mb-1">
            <span className="block text-xs font-medium text-gray-600 mb-1">Default Map Settings</span>
            <select className="w-full text-sm border border-gray-300 rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-600">
              <option>Street View</option>
              <option>Satellite</option>
            </select>
          </label>
        </div>

        <div className="bg-white border border-gray-200 rounded p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Security</h3>
          <Field label="Current Password" type="password" />
          <Field label="New Password" type="password" />
          <button className="mt-1 text-sm bg-gray-800 hover:bg-gray-900 text-white px-3 py-1.5 rounded">Change Password</button>
          <label className="flex items-center justify-between text-sm text-gray-600 mt-4">
            Auto logout after inactivity
            <input type="checkbox" defaultChecked className="accent-blue-700" />
          </label>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------
   LAYOUT: SIDEBAR
   ------------------------------------------------------------ */

function Sidebar({
  active,
  onSelect,
  mobileOpen,
  onCloseMobile,
  allowedSections = []
}) {

  // Show only navigation links permitted for the designation
  const filteredNavItems = NAV_ITEMS.filter((item) =>
    allowedSections.includes(item.key)
  );

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed md:static z-40 top-0 left-0 h-full w-64 bg-slate-900 text-slate-200 flex flex-col transition-transform duration-200 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="px-4 py-4 border-b border-slate-800">
          <p className="text-white font-semibold text-sm tracking-wide">
            AQUA-SENTRY
          </p>
          <p className="text-xs text-slate-400">Admin Panel</p>
        </div>

        <nav className="flex-1 overflow-y-auto py-2">
          {filteredNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.key;

            return (
              <button
                key={item.key}
                onClick={() => {
                  onSelect(item.key);
                  onCloseMobile();
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left border-l-2 ${
                  isActive
                    ? "bg-slate-800 border-blue-500 text-white"
                    : "border-transparent text-slate-300 hover:bg-slate-800/60 hover:text-white"
                }`}
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
/* ------------------------------------------------------------
   ROOT COMPONENT
   ------------------------------------------------------------ */

export default function AdminDashboard() {
  const [PIPELINES,setPIPELINE] = useState([]);
  const {user,setUser}= useAppContext();
  const navigate = useNavigate();
  useEffect(() => {
        if (localStorage.getItem("token") != null) {
            const decoded = jwtDecode(localStorage.getItem("token"));
            if (decoded.exp < Date.now() / 1000) {
                localStorage.removeItem("token");
                toast.warn("Session Expired! Please login again")
            } else {
                if (decoded) {
                  if(decoded.role!="ADMIN"){
                    navigate("/");
                  }
                }
            }
        }
    }, [user]);

    useEffect(()=>{
      fetch(`${import.meta.env.VITE_API_POINT}/sensor-data`,{
        method:"GET",
        headers:{
          'Content-Type':"application/json"
        }
      }).then((responce)=>{
        return responce.json();
      }).then((data)=>{
        console.log(data);
        const formattedData = data.map((item) => ({
          ...item,
          route: item.routes
          ? JSON.parse(item.routes).coordinates
        : []
        }));
        console.log(formattedData);
        
        setPIPELINE(formattedData);
      }).catch((e)=>{
        console.log(e);
      })
    },[])


  const [active, setActive] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  function confirmLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLogoutModalOpen(false);
    window.location.href = "/login";
  }
  const ROLE_ACCESS = {
  SYSTEM_ADMIN: [
    "dashboard", "pipelines", "inspections", "gis",
    "events", "complaints", "maintenance", "reports",
    "users", "settings"
  ],

  OPERATIONS_MANAGER: [
    "dashboard", "pipelines", "inspections", "gis",
    "events", "complaints", "maintenance", "reports"
  ],

  ZONE_MANAGER: [
    "dashboard", "pipelines", "inspections", "gis",
    "events", "complaints", "maintenance", "reports"
  ],

  PIPELINE_INSPECTOR: [
    "dashboard", "pipelines", "inspections", "gis",
    "events", "reports"
  ],

  MAINTENANCE_ENGINEER: [
    "dashboard", "pipelines", "inspections", "gis",
    "events", "maintenance", "reports"
  ],

  CONTROL_ROOM_OPERATOR: [
    "dashboard", "pipelines", "inspections", "gis",
    "events", "complaints", "reports"
  ]
};

function renderSection() {
  const allowedSections = ROLE_ACCESS[user?.designation] || [];
  console.log("New",allowedSections );
  
  if (!allowedSections.includes(active)) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
        <ShieldAlert size={48} className="mb-4 text-red-400" />
        <h2 className="text-xl font-semibold">
          Access Restricted
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          You don't have permission to access this section.
        </p>
      </div>
    );
  }

  switch (active) {
    case "dashboard":
      return <DashboardSection PIPELINES={PIPELINES} />;

    case "pipelines":
      return <PipelinesSection PIPELINES={PIPELINES} />;

    // case "inspections":
    //   return <InspectionsSection />;

    case "gis":
      return <GISMapSection PIPELINES={PIPELINES} />;

    case "events":
      return <EventsSection INITIAL_EVENTS={INITIAL_EVENTS}/>;

    case "complaints":
      return <ComplaintsSection />;

    case "maintenance":
      return <MaintenanceSection />;

    case "reports":
      return <ReportsSection />;

    case "users":
      if(user.designation=="SYSTEM_ADMIN"){
        return <UsersSection />;
      }
    case "settings":
        return <SettingsSection />;

    default:
      return <DashboardSection PIPELINES={PIPELINES} />;
  }
}
  return (
    <div id="dashboard" className="flex h-screen bg-gray-50 text-gray-800">
      <Sidebar
  active={active}
  onSelect={setActive}
  mobileOpen={mobileOpen}
  onCloseMobile={() => setMobileOpen(false)}
  allowedSections={ROLE_ACCESS[user?.designation] || []}
/>

      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setMobileOpen(true)} onLogoutRequest={() => setLogoutModalOpen(true)} />
        <main className="flex-1 overflow-y-auto p-5">{renderSection()}</main>
      </div>

      <Modal open={logoutModalOpen} onClose={() => setLogoutModalOpen(false)} title="Confirm Logout">
        <p className="text-sm text-gray-600 mb-4">Are you sure you want to logout?</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setLogoutModalOpen(false)}
            className="text-sm px-3 py-1.5 rounded border border-gray-300 text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={confirmLogout}
            className="text-sm px-3 py-1.5 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </Modal>
    </div>
  );
}