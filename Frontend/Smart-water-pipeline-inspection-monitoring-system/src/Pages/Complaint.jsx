
import React, { useRef, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  Clock,
  FileImage,
  FileText,
  MapPin,
  MessageSquareWarning,
  Paperclip,
  Send,
  ShieldCheck,
  Upload,
  X,
} from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const INITIAL_FORM = {
  title: "",
  pipelineCode: "",
  category: "",
  location: "",
  priority: "MEDIUM",
  description: "",
  contactEmail: "",
};

const CATEGORIES = [
  "Water Leakage",
  "Pipeline Damage",
  "Low Water Flow",
  "Pressure Issue",
  "Water Quality Issue",
  "Sensor Malfunction",
  "Other",
];

export default function Complaint() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const fileRef = useRef(null);

  const updateField = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5 MB.");
      return;
    }

    setError("");
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    if (preview) URL.revokeObjectURL(preview);

    setImage(null);
    setPreview("");

    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess(false);

    if (!form.title.trim() || !form.pipelineCode.trim() ||
        !form.category || !form.location.trim() ||
        !form.description.trim()) {
      setError("Please complete all required fields.");
      return;
    }

    if (form.description.trim().length < 20) {
      setError("Please provide at least 20 characters describing the issue.");
      return;
    }

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (image) {
      formData.append("image", image);
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_BASE_URL}/api/complaints`,
        {
          method: "POST",
          headers: token
            ? { Authorization: `Bearer ${token}` }
            : {},
          body: formData,
        }
      );

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to submit complaint. Please try again."
        );
      }

      setSuccess(true);
      setForm(INITIAL_FORM);
      removeImage();

    } catch (err) {
      setError(
        err.message || "Something went wrong while submitting your complaint."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

  const labelClass =
    "text-sm font-semibold text-slate-700";

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F5F8FC]">

      {/* Page heading */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

          <a
            href="/"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
          >
            <ArrowLeft size={16} />
            Back to Home
          </a>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
                <MessageSquareWarning size={14} />
                CITIZEN SUPPORT PORTAL
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Report an Issue
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                Help us maintain a reliable water pipeline network.
                Submit a complaint with the issue details and supporting
                images so our team can investigate it.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                <ShieldCheck size={22} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Your report matters
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Every submission helps improve monitoring.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">

        {/* Complaint form */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 px-6 py-5 sm:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FileText size={21} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Complaint Details
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Fields marked with * are required.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-7 p-6 sm:p-8">

            {/* Success message */}
            {success && (
              <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
                <CheckCircle2 className="mt-0.5 shrink-0 text-green-600" />
                <div>
                  <p className="font-semibold text-green-800">
                    Complaint submitted successfully!
                  </p>
                  <p className="mt-1 text-sm text-green-700">
                    Your complaint has been sent to the system.
                    You can check its status from My Complaints.
                  </p>
                </div>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
                <AlertCircle className="mt-0.5 shrink-0 text-red-600" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Section 1 */}
            <div>
              <div className="mb-5 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white">
                  01
                </span>
                <h3 className="font-bold text-slate-800">
                  Issue Information
                </h3>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">

                <div className="sm:col-span-2">
                  <label className={labelClass}>
                    Complaint Title *
                  </label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={updateField}
                    placeholder="e.g. Water leakage near main road"
                    className={inputClass}
                    maxLength={120}
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    Pipeline Code *
                  </label>
                  <input
                    name="pipelineCode"
                    value={form.pipelineCode}
                    onChange={updateField}
                    placeholder="e.g. PL-1042"
                    className={inputClass}
                    required
                  />
                  <p className="mt-1.5 text-xs text-slate-400">
                    Enter the pipeline identification code.
                  </p>
                </div>

                <div>
                  <label className={labelClass}>
                    Issue Category *
                  </label>
                  <div className="relative">
                    <select
                      name="category"
                      value={form.category}
                      onChange={updateField}
                      className={`${inputClass} appearance-none pr-10`}
                      required
                    >
                      <option value="">Select category</option>
                      {CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={17}
                      className="pointer-events-none absolute right-4 top-5 text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    Priority Level *
                  </label>
                  <div className="relative">
                    <select
                      name="priority"
                      value={form.priority}
                      onChange={updateField}
                      className={`${inputClass} appearance-none pr-10`}
                    >
                      <option value="LOW">Low</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HIGH">High</option>
                      <option value="CRITICAL">Critical</option>
                    </select>
                    <ChevronDown
                      size={17}
                      className="pointer-events-none absolute right-4 top-5 text-slate-400"
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>
                    Issue Location *
                  </label>
                  <div className="relative">
                    <MapPin
                      size={17}
                      className="absolute left-4 top-5 text-slate-400"
                    />
                    <input
                      name="location"
                      value={form.location}
                      onChange={updateField}
                      placeholder="Street, area or landmark"
                      className={`${inputClass} pl-11`}
                      required
                    />
                  </div>
                </div>

              </div>
            </div>

            <div className="border-t border-slate-100" />

            {/* Section 2 */}
            <div>
              <div className="mb-5 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white">
                  02
                </span>
                <h3 className="font-bold text-slate-800">
                  Issue Description
                </h3>
              </div>

              <label className={labelClass}>
                Describe the issue *
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={updateField}
                rows={5}
                maxLength={1500}
                placeholder="Describe what happened, when you noticed it, and any other relevant information..."
                className={`${inputClass} resize-y`}
                required
              />

              <div className="mt-2 flex justify-between text-xs text-slate-400">
                <span>Minimum 20 characters</span>
                <span>{form.description.length}/1500</span>
              </div>
            </div>

            <div className="border-t border-slate-100" />

            {/* Section 3 */}
            <div>
              <div className="mb-5 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white">
                  03
                </span>
                <h3 className="font-bold text-slate-800">
                  Supporting Evidence
                </h3>
              </div>

              <label className={labelClass}>
                Upload Issue Image
                <span className="ml-2 font-normal text-slate-400">
                  (Optional)
                </span>
              </label>

              {!preview ? (
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="mt-3 flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-5 py-10 text-center transition hover:border-blue-400 hover:bg-blue-50/50"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                    <Upload size={23} />
                  </div>

                  <p className="mt-4 text-sm font-semibold text-slate-700">
                    Click to upload an image
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    JPG, JPEG, PNG or WEBP · Maximum 5 MB
                  </p>
                </button>
              ) : (
                <div className="relative mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <img
                    src={preview}
                    alt="Complaint evidence preview"
                    className="h-56 w-full rounded-xl object-cover"
                  />

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2">
                      <FileImage size={18} className="shrink-0 text-blue-600" />
                      <span className="truncate text-sm text-slate-700">
                        {image?.name}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={removeImage}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-red-500 hover:bg-red-50"
                      aria-label="Remove image"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              )}

              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImage}
                className="hidden"
              />

              <p className="mt-2 text-xs text-slate-400">
                Upload a photograph of the affected pipeline or surrounding area.
              </p>
            </div>

            <div className="border-t border-slate-100" />

            {/* Section 4 */}
            <div>
              <div className="mb-5 flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white">
                  04
                </span>
                <h3 className="font-bold text-slate-800">
                  Contact Information
                </h3>
              </div>

              <label className={labelClass}>
                Email Address
                <span className="ml-2 font-normal text-slate-400">
                  (Optional)
                </span>
              </label>

              <input
                type="email"
                name="contactEmail"
                value={form.contactEmail}
                onChange={updateField}
                placeholder="Enter your email address"
                className={inputClass}
              />
            </div>

            {/* Submit */}
            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">

              <p className="text-xs leading-5 text-slate-400">
                Please ensure the information provided is accurate.
              </p>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Complaint
                    <Send size={16} />
                  </>
                )}
              </button>

            </div>
          </form>
        </section>

        {/* Right sidebar */}
        <aside className="space-y-5">

          {/* Process card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-bold text-slate-900">
              What happens next?
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Your complaint follows this process.
            </p>

            <div className="mt-6 space-y-6">
              {[
                {
                  icon: Send,
                  title: "Complaint Submitted",
                  text: "Your complaint is registered in the system.",
                },
                {
                  icon: Clock,
                  title: "Under Review",
                  text: "The responsible team reviews the reported issue.",
                },
                {
                  icon: ShieldCheck,
                  title: "Investigation",
                  text: "The issue is assessed and assigned for action.",
                },
                {
                  icon: CheckCircle2,
                  title: "Resolution",
                  text: "The complaint is updated after the required action.",
                },
              ].map(({ icon: Icon, title, text }, index) => (
                <div key={title} className="relative flex gap-3">
                  {index !== 3 && (
                    <div className="absolute left-[17px] top-10 h-8 w-px bg-slate-200" />
                  )}

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={18} />
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-slate-800">
                      {title}
                    </h4>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Guidelines */}
          <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-6">
            <div className="flex items-center gap-2">
              <AlertCircle size={19} className="text-blue-600" />
              <h3 className="font-bold text-slate-900">
                Reporting Guidelines
              </h3>
            </div>

            <ul className="mt-4 space-y-3 text-sm leading-5 text-slate-600">
              <li className="flex gap-2">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-blue-600" />
                Provide the correct pipeline code.
              </li>
              <li className="flex gap-2">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-blue-600" />
                Mention the exact issue location.
              </li>
              <li className="flex gap-2">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-blue-600" />
                Explain the problem clearly.
              </li>
              <li className="flex gap-2">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-blue-600" />
                Attach relevant photographs if available.
              </li>
            </ul>
          </div>

          {/* Priority guide */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-bold text-slate-900">
              Priority Guide
            </h3>

            <div className="mt-4 space-y-3">
              {[
                ["LOW", "bg-blue-500", "Minor issue"],
                ["MEDIUM", "bg-amber-500", "Needs attention"],
                ["HIGH", "bg-orange-500", "Urgent attention"],
                ["CRITICAL", "bg-red-500", "Immediate attention"],
              ].map(([name, color, description]) => (
                <div key={name} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
                    <span className="text-xs font-semibold text-slate-700">
                      {name}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">
                    {description}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5">
            <div className="rounded-lg bg-slate-100 p-2 text-slate-600">
              <MessageSquareWarning size={18} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-800">
                Need assistance?
              </h4>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Use the complaint form to report pipeline-related issues
                to the responsible team.
              </p>
            </div>
          </div>

        </aside>
      </main>
    </div>
  );
}
