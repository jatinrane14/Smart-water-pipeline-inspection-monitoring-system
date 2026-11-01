
import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Cpu,
  Database,
  FileBarChart,
  Gauge,
  Globe2,
  Layers,
  Map as MapIcon,
  Radio,
  ScanSearch,
  ShieldCheck,
  Thermometer,
  Upload,
  Waves,
  Activity,
  Workflow,
  Server,
  Code2,
  Eye,
  Boxes,
  Route as RouteIcon,
  Mail,
  MapPin,
  Send,
} from "lucide-react";

const COLORS = {
  navy: "#071525",
  dark: "#0D2033",
  cyan: "#00C9D8",
  green: "#16C79A",
  background: "#F4F8FB",
  text: "#172B3A",
};

function Wrap({ children, className = "" }) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

function SectionHeading({ title, text, light = false }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2
        className={`text-3xl font-semibold tracking-tight sm:text-4xl ${
          light ? "text-white" : "text-[#172B3A]"
        }`}
      >
        {title}
      </h2>

      {text && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            light ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {text}
        </p>
      )}
    </div>
  );
}

function PrimaryLink({ to, children }) {
  return (
    <a
      href={to}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00C9D8] px-6 py-3 text-sm font-semibold text-[#071525] shadow-lg transition hover:bg-[#16C79A]"
    >
      {children}
    </a>
  );
}

/* ----------------------------- DATA ----------------------------- */

const TRUST = [
  { icon: ScanSearch, label: "AI-Based Inspection" },
  { icon: MapIcon, label: "GIS-Powered Monitoring" },
  { icon: Gauge, label: "Intelligent Condition Assessment" },
];

const STATS = [
  { label: "Total Pipelines", value: "1,248", color: "text-[#172B3A]" },
  { label: "Healthy Pipelines", value: "1,012", color: "text-[#0E9F7A]" },
  { label: "Moderate Condition", value: "168", color: "text-amber-600" },
  { label: "Critical Condition", value: "68", color: "text-red-600" },
];

const ABOUT_POINTS = [
  { icon: Layers, text: "Pipeline infrastructure management" },
  { icon: Radio, text: "Sensor-data monitoring" },
  { icon: ScanSearch, text: "AI-assisted visual inspection" },
  { icon: Globe2, text: "GIS-based pipeline visualization" },
  { icon: FileBarChart, text: "Condition assessment and reporting" },
];

const FEATURES = [
  {
    icon: Boxes,
    title: "Pipeline Management",
    text: "Manage pipeline records, codes, diameters, materials, zones, streets, and routes.",
  },
  {
    icon: Brain,
    title: "AI-Based Inspection",
    text: "Analyze uploaded pipeline images to identify visible defects and estimate severity.",
  },
  {
    icon: Activity,
    title: "Sensor Monitoring",
    text: "Monitor pressure, flow rate, water temperature, motion, and vibration readings.",
  },
  {
    icon: MapIcon,
    title: "GIS Visualization",
    text: "Visualize pipeline routes geographically with condition-based color indicators.",
  },
  {
    icon: FileBarChart,
    title: "Reports and Analytics",
    text: "Generate inspection reports and review historical pipeline conditions.",
  },
];

const STEPS = [
  {
    icon: RouteIcon,
    title: "Pipeline Registration",
    text: "Add pipeline information and geographic routes.",
  },
  {
    icon: Upload,
    title: "Data Collection",
    text: "Upload inspection images and collect available sensor readings.",
  },
  {
    icon: Cpu,
    title: "AI Analysis",
    text: "Analyze images and assess potential visible defects.",
  },
  {
    icon: FileBarChart,
    title: "Monitoring and Reporting",
    text: "Visualize pipeline conditions and generate reports.",
  },
];

const TECH = [
  { name: "React.js", role: "Frontend UI", icon: Code2 },
  { name: "Tailwind CSS", role: "Styling", icon: Layers },
  { name: "Java Spring Boot", role: "Backend API", icon: Server },
  { name: "Python FastAPI", role: "AI Service", icon: Workflow },
  { name: "PostgreSQL", role: "Database", icon: Database },
  { name: "PostGIS", role: "Spatial Data", icon: Globe2 },
  { name: "OpenCV", role: "Image Processing", icon: Eye },
  { name: "YOLO", role: "Defect Detection", icon: ScanSearch },
  { name: "React Leaflet", role: "Map Components", icon: MapIcon },
  { name: "OpenStreetMap", role: "Map Tiles", icon: Globe2 },
];

const SENSOR_DATA = [
  { label: "Pressure", value: "4.2", unit: "bar", icon: Gauge },
  { label: "Flow Rate", value: "86", unit: "L/min", icon: Waves },
  { label: "Temperature", value: "24.5", unit: "°C", icon: Thermometer },
  { label: "Vibration", value: "0.9", unit: "mm/s", icon: Activity },
];

/* ----------------------------- HERO VISUAL ----------------------------- */

function HeroVisual() {
  const [selected, setSelected] = useState(0);
  const sensors = [
    { id: "P-01", pressure: 4.2, flow: 86, vibration: 0.4 },
    { id: "P-02", pressure: 3.1, flow: 61, vibration: 1.7 },
    { id: "P-03", pressure: 4.4, flow: 90, vibration: 0.5 },
  ];

  const current = sensors[selected];

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="absolute -inset-6 rounded-3xl bg-[#00C9D8]/10 blur-3xl" />

      <div className="relative overflow-hidden rounded-3xl border border-[#00C9D8]/20 bg-[#0D2033] shadow-2xl">
        <div className="border-b border-white/10 px-5 py-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-white">
              Pipeline Monitoring
            </span>
            <span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs text-amber-300">
              Demo Data
            </span>
          </div>
        </div>

        <svg viewBox="0 0 560 280" className="w-full">
          <defs>
            <linearGradient id="pipelineWater" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#00C9D8" />
              <stop offset="100%" stopColor="#16C79A" />
            </linearGradient>
          </defs>

          <g stroke="#00C9D8" strokeOpacity="0.08">
            {[40, 80, 120, 160, 200, 240].map((y) => (
              <line key={y} x1="0" y1={y} x2="560" y2={y} />
            ))}
          </g>

          <path
            d="M0 100 C100 70 180 130 280 95 S450 60 560 90"
            stroke="#16C79A"
            strokeOpacity="0.3"
            fill="none"
            strokeWidth="2"
          />

          <rect
            x="25"
            y="145"
            width="510"
            height="85"
            rx="42"
            fill="#183A52"
            stroke="#00C9D8"
            strokeOpacity="0.6"
            strokeWidth="2"
          />

          <rect x="42" y="164" width="476" height="47" rx="23" fill="#06121F" />

          <line
            x1="55"
            y1="188"
            x2="505"
            y2="188"
            stroke="url(#pipelineWater)"
            strokeWidth="13"
            strokeLinecap="round"
          />

          {sensors.map((sensor, index) => (
            <g
              key={sensor.id}
              onClick={() => setSelected(index)}
              className="cursor-pointer"
            >
              <line
                x1={100 + index * 180}
                y1="100"
                x2={100 + index * 180}
                y2="145"
                stroke="#00C9D8"
                strokeDasharray="4 4"
              />

              <circle
                cx={100 + index * 180}
                cy="100"
                r="13"
                fill={selected === index ? "#16C79A" : "#00C9D8"}
                stroke="white"
                strokeWidth={selected === index ? "3" : "1"}
              />

              <text
                x={100 + index * 180}
                y="75"
                textAnchor="middle"
                fill="white"
                fontSize="12"
              >
                {sensor.id}
              </text>
            </g>
          ))}
        </svg>

        <div className="border-t border-white/10 bg-[#071525] p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">
              Sensor {current.id}
            </h3>
            <span className="text-xs text-amber-300">Simulated</span>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              ["Pressure", current.pressure, "bar"],
              ["Flow", current.flow, "L/min"],
              ["Vibration", current.vibration, "mm/s"],
            ].map(([label, value, unit]) => (
              <div key={label} className="rounded-xl bg-white/5 p-3 text-center">
                <p className="text-xs text-slate-400">{label}</p>
                <p className="mt-1 font-semibold text-white">
                  {value} <span className="text-xs text-slate-400">{unit}</span>
                </p>
              </div>
            ))}
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Select a sensor point to inspect its sample readings.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- DASHBOARD ----------------------------- */

function DashboardPreview() {
  const [filter, setFilter] = useState("All");

  const distribution = [
    { label: "Healthy", value: 1012, color: "#16C79A" },
    { label: "Moderate", value: 168, color: "#FBBF24" },
    { label: "Critical", value: 68, color: "#EF4444" },
  ];

  const activities = [
    ["PL-1042", "Surface corrosion flagged", "Moderate"],
    ["PL-0877", "Crack candidate, review needed", "Critical"],
    ["PL-0311", "No visible defects", "Healthy"],
    ["PL-0654", "Joint deposit detected", "Moderate"],
  ];

  const visibleActivities = activities.filter(
    (item) => filter === "All" || item[2] === filter
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0D2033] shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 bg-[#0A1B2C] px-5 py-4">
        <span className="font-semibold text-white">AQUA-SENTRY Dashboard</span>
        <span className="text-xs text-amber-300">Sample / Demo Data</span>
      </div>

      <div className="grid gap-4 p-5 lg:grid-cols-3">
        <div className="grid grid-cols-3 gap-3 lg:col-span-3">
          {distribution.map((item) => (
            <div key={item.label} className="rounded-xl bg-white/5 p-4">
              <p className="text-xs text-slate-400">{item.label}</p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {item.value.toLocaleString()}
              </p>
              <span
                className="mt-2 block h-1 rounded-full"
                style={{ background: item.color }}
              />
            </div>
          ))}
        </div>

        <div className="rounded-xl bg-white/5 p-4">
          <h3 className="font-semibold text-white">Sensor Readings</h3>
          <p className="mt-1 text-xs text-slate-400">Simulated values</p>

          <div className="mt-5 space-y-4">
            {SENSOR_DATA.map(({ label, value, unit, icon: Icon }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-slate-300">
                  <Icon size={16} className="text-[#00C9D8]" />
                  {label}
                </span>
                <span className="text-sm font-semibold text-white">
                  {value} {unit}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-white/5 p-4">
          <h3 className="font-semibold text-white">Condition Distribution</h3>

          <div className="mt-5 flex flex-col items-center">
            <div
              className="flex h-36 w-36 items-center justify-center rounded-full"
              style={{
                background:
                  "conic-gradient(#16C79A 0% 81%, #FBBF24 81% 94.5%, #EF4444 94.5% 100%)",
              }}
            >
              <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-[#0D2033]">
                <span className="text-xl font-bold text-white">1,248</span>
                <span className="text-xs text-slate-400">Pipelines</span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap justify-center gap-3">
              {distribution.map((item) => (
                <span key={item.label} className="flex items-center gap-1 text-xs text-slate-300">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: item.color }}
                  />
                  {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white/5 p-4">
          <h3 className="font-semibold text-white">Pipeline Map Preview</h3>

          <div className="mt-4 flex flex-wrap gap-2">
            {["All", "Healthy", "Moderate", "Critical"].map((value) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
                className={`rounded-full border px-3 py-1 text-xs ${
                  filter === value
                    ? "border-[#00C9D8] bg-[#00C9D8]/20 text-white"
                    : "border-white/10 text-slate-400"
                }`}
              >
                {value}
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-lg bg-[#071525] p-3">
            <svg viewBox="0 0 320 170" className="w-full">
              <path d="M10 130 L90 105 L150 115 L230 55 L310 30" fill="none" stroke="#16C79A" strokeWidth="5" opacity={filter === "All" || filter === "Healthy" ? 1 : 0.15} />
              <path d="M20 30 L90 65 L150 50 L240 115 L300 105" fill="none" stroke="#FBBF24" strokeWidth="5" opacity={filter === "All" || filter === "Moderate" ? 1 : 0.15} />
              <path d="M150 115 L180 150 L250 160" fill="none" stroke="#EF4444" strokeWidth="5" opacity={filter === "All" || filter === "Critical" ? 1 : 0.15} />
            </svg>
          </div>
        </div>

        <div className="rounded-xl bg-white/5 p-4 lg:col-span-3">
          <h3 className="font-semibold text-white">Recent Inspection Activity</h3>

          <div className="mt-4 space-y-3">
            {visibleActivities.map(([id, note, status]) => (
              <div
                key={id}
                className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3"
              >
                <div>
                  <span className="font-semibold text-white">{id}</span>
                  <p className="mt-1 text-sm text-slate-400">{note}</p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs ${
                    status === "Healthy"
                      ? "bg-emerald-400/10 text-emerald-400"
                      : status === "Moderate"
                      ? "bg-amber-400/10 text-amber-300"
                      : "bg-red-400/10 text-red-400"
                  }`}
                >
                  {status}
                </span>
              </div>
            ))}

            {visibleActivities.length === 0 && (
              <p className="text-sm text-slate-400">No matching activity.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- ABOUT VISUAL ----------------------------- */

function AboutVisual() {
  const items = [
    ["Pipeline Records", "Codes, materials and routes"],
    ["Sensor and Image Data", "Readings and inspection photos"],
    ["AI-Assisted Analysis", "Visible defect detection"],
  ];

  return (
    <div className="rounded-3xl border border-[#00C9D8]/20 bg-[#071525] p-8 shadow-xl">
      <div className="space-y-5">
        {items.map(([title, subtitle], index) => (
          <div key={title}>
            <div className="rounded-xl border border-[#00C9D8]/30 bg-[#0D2033] p-5">
              <h3 className="font-semibold text-white">{title}</h3>
              <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
            </div>

            {index !== items.length - 1 && (
              <div className="ml-10 h-5 w-px bg-[#00C9D8]" />
            )}
          </div>
        ))}

        <div className="rounded-xl bg-gradient-to-r from-[#00C9D8] to-[#16C79A] p-5 text-center font-bold text-[#071525]">
          AQUA-SENTRY PLATFORM
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- CONTACT SECTION ----------------------------- */

function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setSubmitted(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Replace with your Spring Boot API integration.
    // Example:
    // await axios.post("http://localhost:8080/api/contact", formData);

    alert(
      "Contact form UI is ready. Connect your Spring Boot API to receive messages."
    );

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    setSubmitted(true);
  }

  return (
    <section
      id="contact"
      className="scroll-mt-20 bg-[#F4F8FB] px-4 py-20 sm:px-6 sm:py-24"
    >
      <Wrap>
        <SectionHeading
          title="Get in Touch"
          text="Have a question, suggestion, or collaboration idea? Contact the AQUA-SENTRY team. We are here to help."
        />

        <div className="mx-auto mt-12 grid max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl lg:grid-cols-5">

          {/* Contact Information */}
          <div className="relative overflow-hidden bg-[#071525] p-8 text-white sm:p-10 lg:col-span-2">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#00C9D8]/10 blur-3xl" />

            <div className="relative">
              <span className="inline-flex rounded-full border border-[#00C9D8]/30 bg-[#00C9D8]/10 px-3 py-1 text-xs font-semibold text-[#00C9D8]">
                CONTACT AQUA-SENTRY
              </span>

              <h3 className="mt-6 text-2xl font-semibold">
                Let's start a conversation.
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                Reach out to us for project-related queries, technical
                information, feedback, or collaboration.
              </p>

              <div className="mt-10 space-y-8">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#00C9D8]/10 text-[#00C9D8]">
                    <Mail size={21} />
                  </span>
                  <div>
                    <h4 className="font-semibold">Email Address</h4>
                    <p className="mt-1 break-all text-sm text-slate-400">
                      Replace with project email
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#00C9D8]/10 text-[#00C9D8]">
                    <MapPin size={21} />
                  </span>
                  <div>
                    <h4 className="font-semibold">Location</h4>
                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      SVVV University, Indore,
                      Madhya Pradesh, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#00C9D8]/10 text-[#00C9D8]">
                    <ShieldCheck size={21} />
                  </span>
                  <div>
                    <h4 className="font-semibold">Our Platform</h4>
                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      Smart Water Pipeline Inspection
                      and Monitoring System
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="font-semibold text-[#16C79A]">
                  AQUA-SENTRY
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Building smarter and more reliable water infrastructure
                  through technology.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 sm:p-10 lg:col-span-3">
            <h3 className="text-2xl font-semibold text-[#172B3A]">
              Send Us a Message
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Fill out the details below.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#00C9D8] focus:ring-4 focus:ring-[#00C9D8]/10"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#00C9D8] focus:ring-4 focus:ring-[#00C9D8]/10"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What is your query about?"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#00C9D8] focus:ring-4 focus:ring-[#00C9D8]/10"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  placeholder="Write your message..."
                  className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#00C9D8] focus:ring-4 focus:ring-[#00C9D8]/10"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00C9D8] px-7 py-3.5 text-sm font-semibold text-[#071525] shadow-lg shadow-[#00C9D8]/20 transition hover:bg-[#16C79A]"
              >
                Send Message
                <Send size={17} />
              </button>

              {submitted && (
                <p className="text-sm text-emerald-600">
                  Form submitted.
                </p>
              )}

              <p className="text-xs text-slate-400">
                Required fields are marked with an asterisk (*).
              </p>
            </form>
          </div>
        </div>
      </Wrap>
    </section>
  );
}

/* ----------------------------- FOOTER ----------------------------- */

function SiteFooter() {
  const footerLinks = [
    ["Home", "/#home"],
    ["About", "/#about"],
    ["How It Works", "/#how-it-works"],
    ["Contact", "/#contact"],
  ];

  return (
    <footer className="bg-[#071525] text-slate-300">
      <Wrap className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <a href="/#home" className="flex items-center gap-2 text-white">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00C9D8] text-[#071525]">
                <Waves size={21} />
              </span>
              <span className="text-xl font-semibold">AQUA-SENTRY</span>
            </a>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              Smart water pipeline inspection and monitoring.
              An academic software prototype for AI-assisted visual
              inspection, simulated sensor monitoring, and GIS visualization.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-slate-400 transition hover:text-[#00C9D8]"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white">Technology</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li>React and Tailwind CSS</li>
              <li>Spring Boot and FastAPI</li>
              <li>PostgreSQL and PostGIS</li>
              <li>OpenCV and YOLO</li>
              <li>Leaflet and OpenStreetMap</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-slate-500 sm:flex sm:justify-between">
          <p>© 2026 AQUA-SENTRY. Academic Project.</p>
          <p className="mt-2 sm:mt-0">
            Intelligent Pipeline Inspection and Monitoring
          </p>
        </div>
      </Wrap>
    </footer>
  );
}

/* ----------------------------- HOME PAGE ----------------------------- */

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F4F8FB] text-[#172B3A] antialiased">
      <style>{`
        html {
          scroll-behavior: smooth;
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }
        }
      `}</style>

      <main>
        {/* HERO */}
        <section
          id="home"
          className="relative overflow-hidden bg-[#071525]"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_80%_20%,rgba(0,201,216,0.16),transparent),radial-gradient(40%_40%_at_10%_90%,rgba(22,199,154,0.10),transparent)]" />

          <Wrap>
            <div className="relative grid items-center gap-12 py-16 lg:min-h-[calc(100vh-4rem)] lg:grid-cols-2 lg:py-20">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#00C9D8]/30 bg-[#00C9D8]/10 px-4 py-2 text-xs font-semibold tracking-widest text-[#00C9D8]">
                  <Waves size={15} />
                  SMART WATER INFRASTRUCTURE
                </span>

                <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Intelligent Pipeline Monitoring.
                  <span className="text-[#00C9D8]">
                    {" "}Smarter Water Management.
                  </span>
                </h1>

                <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
                  AQUA-SENTRY combines AI-powered pipeline inspection,
                  sensor-based condition assessment, and geospatial
                  visualization to help monitor pipeline infrastructure
                  and identify potential issues efficiently.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <PrimaryLink to="#preview">
                    Explore Platform <ArrowRight size={17} />
                  </PrimaryLink>

                  <a
                    href="/login"
                    className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#00C9D8] hover:bg-white/10"
                  >
                    Administrative Login
                  </a>
                </div>

                <div className="mt-10 flex flex-wrap gap-5">
                  {TRUST.map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-2 text-sm text-slate-300"
                    >
                      <Icon size={17} className="text-[#16C79A]" />
                      {label}
                    </div>
                  ))}
                </div>
              </div>

              <HeroVisual />
            </div>
          </Wrap>
        </section>

        {/* STATISTICS */}
        <section className="relative z-10 -mt-8">
          <Wrap>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {STATS.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg"
                >
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <p className={`mt-2 text-3xl font-semibold ${item.color}`}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-3 text-center text-xs text-slate-500">
              Illustrative dashboard metrics. These are not actual monitored
              infrastructure data.
            </p>
          </Wrap>
        </section>

        {/* ABOUT */}
        <section id="about" className="scroll-mt-20 py-20 sm:py-24">
          <Wrap>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <AboutVisual />

              <div>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Making Water Infrastructure Smarter
                </h2>

                <p className="mt-5 text-base leading-relaxed text-slate-600">
                  AQUA-SENTRY brings pipeline records, sensor readings,
                  inspection images, and geographic information into
                  one platform, helping engineers understand where
                  attention may be needed.
                </p>

                <ul className="mt-8 space-y-4">
                  {ABOUT_POINTS.map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-center gap-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00C9D8]/10 text-[#0891A0]">
                        <Icon size={20} />
                      </span>
                      <span className="font-medium">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Wrap>
        </section>

        {/* FEATURES */}
        <section id="features" className="bg-white py-20 sm:py-24">
          <Wrap>
            <SectionHeading
              title="Core Features"
              text="Explore the capabilities of the AQUA-SENTRY platform."
            />

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
              {FEATURES.map(({ icon: Icon, title, text }, index) => (
                <article
                  key={title}
                  className={`group rounded-2xl border border-slate-200 bg-[#F4F8FB] p-7 transition hover:-translate-y-1 hover:border-[#00C9D8]/60 hover:shadow-xl ${
                    index >= 3 ? "lg:col-span-2" : "lg:col-span-2"
                  }`}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#071525] text-[#00C9D8] transition group-hover:bg-[#00C9D8] group-hover:text-[#071525]">
                    <Icon size={22} />
                  </span>

                  <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {text}
                  </p>
                </article>
              ))}
            </div>
          </Wrap>
        </section>

        {/* DASHBOARD PREVIEW */}
        <section id="preview" className="scroll-mt-20 bg-[#071525] py-20 sm:py-24">
          <Wrap>
            <SectionHeading
              light
              title="See Pipeline Condition at a Glance"
              text="A preview of the monitoring dashboard, including sensor readings, condition distribution, inspection activity, and pipeline visualization."
            />

            <div className="mt-12">
              <DashboardPreview />
            </div>

            <p className="mt-4 text-center text-xs text-slate-400">
              Sample interface populated with simulated readings.
              No live telemetry or deployed hardware is shown.
            </p>
          </Wrap>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="scroll-mt-20 py-20 sm:py-24">
          <Wrap>
            <SectionHeading
              title="How It Works"
              text="From registering a pipeline to reviewing its condition report."
            />

            <div className="mt-14 grid gap-8 md:grid-cols-4">
              {STEPS.map(({ icon: Icon, title, text }, index) => (
                <div key={title} className="text-center">
                  <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#00C9D8]/40 bg-white text-[#0891A0] shadow-md">
                    <Icon size={26} />
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#071525] text-xs font-semibold text-white">
                      {index + 1}
                    </span>
                  </div>

                  <h3 className="mt-5 font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </Wrap>
        </section>

        {/* TECHNOLOGY */}
        <section id="technology" className="scroll-mt-20 bg-white py-20 sm:py-24">
          <Wrap>
            <SectionHeading
              title="Built on a Proven Technology Stack"
              text="Open and widely used technologies across the application, backend, database, AI, and mapping layers."
            />

            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {TECH.map(({ name, role, icon: Icon }) => (
                <div
                  key={name}
                  className="flex flex-col items-center rounded-2xl border border-slate-200 bg-[#F4F8FB] p-5 text-center transition hover:border-[#00C9D8]/60 hover:shadow-lg"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#071525] text-[#00C9D8]">
                    <Icon size={21} />
                  </span>

                  <span className="mt-3 text-sm font-semibold">{name}</span>
                  <span className="mt-1 text-xs text-slate-500">{role}</span>
                </div>
              ))}
            </div>
          </Wrap>
        </section>

        {/* CONTACT */}
        <ContactSection />
      </main>

      <SiteFooter />
    </div>
  );
}
