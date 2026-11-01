
import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  ShieldCheck,
  Pencil,
  Save,
  X,
  Camera,
  ClipboardList,
  Clock,
  CheckCircle2,
  AlertCircle,
  Droplets,
} from "lucide-react";

export default function CitizenProfile() {
  const [user, setUser] = useState({});
  const [form, setForm] = useState({});
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const storedUser = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      setUser(storedUser);
      setForm({
        name: storedUser.name || storedUser.fullName || "",
        email: storedUser.email || "",
        phone: storedUser.phone || storedUser.mobileNumber || "",
        address: storedUser.address || "",
      });
    } catch {
      setUser({});
      setForm({});
    }
  }, []);

  const displayName =
    user.name || user.fullName || "Citizen";

  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    setEditing(false);
    setMessage("Profile updated locally.");

    setTimeout(() => setMessage(""), 3000);
  };

  const handleCancel = () => {
    setForm({
      name: user.name || user.fullName || "",
      email: user.email || "",
      phone: user.phone || user.mobileNumber || "",
      address: user.address || "",
    });

    setEditing(false);
  };

  const accountDetails = [
    {
      icon: Mail,
      label: "Email Address",
      key: "email",
      placeholder: "Enter email address",
    },
    {
      icon: Phone,
      label: "Phone Number",
      key: "phone",
      placeholder: "Enter phone number",
    },
    {
      icon: MapPin,
      label: "Residential Address",
      key: "address",
      placeholder: "Enter your address",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F5F8FC]">

      {/* Page Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
              <User size={14} />
              CITIZEN ACCOUNT
            </span>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
              My Profile
            </h1>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Manage your personal information and account details.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {message && (
          <div className="mb-6 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
            <CheckCircle2 size={18} />
            {message}
          </div>
        )}

        <div className="grid gap-7 lg:grid-cols-[320px_1fr]">

          {/* Left Profile Card */}
          <aside className="space-y-6">

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

              <div className="h-28 bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500" />

              <div className="px-6 pb-7">

                <div className="-mt-12 flex items-end justify-between">
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-blue-600 text-3xl font-bold text-white shadow-md">
                    {initials || "C"}
                  </div>

                  <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                    <ShieldCheck size={14} />
                    Citizen
                  </span>
                </div>

                <h2 className="mt-4 text-xl font-bold text-slate-900">
                  {displayName}
                </h2>

                <p className="mt-1 break-all text-sm text-slate-500">
                  {user.email || "Email not available"}
                </p>

                <div className="mt-6 border-t border-slate-100 pt-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Account Type</span>
                    <span className="font-semibold text-slate-800">
                      Citizen
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-slate-500">Account Status</span>
                    <span className="flex items-center gap-1.5 font-semibold text-green-600">
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      Active
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick Links */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-bold text-slate-900">
                Quick Access
              </h3>

              <div className="mt-4 space-y-2">

                <a
                  href="/citizen/complaints"
                  className="flex items-center gap-3 rounded-xl p-3 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
                >
                  <ClipboardList size={19} />
                  My Complaints
                </a>

                <a
                  href="/report-issue"
                  className="flex items-center gap-3 rounded-xl p-3 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-600"
                >
                  <AlertCircle size={19} />
                  Report an Issue
                </a>

              </div>
            </div>

          </aside>

          {/* Right Content */}
          <section className="space-y-6">

            {/* Personal Information */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 px-6 py-5 sm:px-8">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Your basic account information.
                  </p>
                </div>

                {!editing ? (
                  <button
                    onClick={() => setEditing(true)}
                    className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-100"
                  >
                    <Pencil size={15} />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleCancel}
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                    >
                      <X size={15} />
                      Cancel
                    </button>

                    <button
                      onClick={handleSave}
                      className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                    >
                      <Save size={15} />
                      Save Changes
                    </button>
                  </div>
                )}
              </div>

              <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">

                <div>
                  <label className="text-sm font-semibold text-slate-600">
                    Full Name
                  </label>

                  <div className="relative mt-2">
                    <User
                      size={17}
                      className="absolute left-4 top-4 text-slate-400"
                    />

                    <input
                      name="name"
                      value={form.name || ""}
                      onChange={handleChange}
                      disabled={!editing}
                      placeholder="Full name"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {accountDetails.map(({ icon: Icon, label, key, placeholder }) => (
                  <div key={key}>
                    <label className="text-sm font-semibold text-slate-600">
                      {label}
                    </label>

                    <div className="relative mt-2">
                      <Icon
                        size={17}
                        className="absolute left-4 top-4 text-slate-400"
                      />

                      <input
                        name={key}
                        value={form[key] || ""}
                        onChange={handleChange}
                        disabled={!editing}
                        placeholder={placeholder}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none focus:border-blue-500 focus:bg-white disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>
                ))}

              </div>
            </div>

            {/* Account Information */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <ShieldCheck size={21} />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    Account Information
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Your account details and identification.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-medium text-slate-400">
                    User ID
                  </p>
                  <p className="mt-2 break-all text-sm font-semibold text-slate-800">
                    {user._id || user.id || "Not available"}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-medium text-slate-400">
                    Account Role
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-800">
                    Citizen
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-medium text-slate-400">
                    Account Created
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-800">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "Not available"}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-medium text-slate-400">
                    Account Status
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-green-600">
                    <CheckCircle2 size={16} />
                    Active
                  </p>
                </div>

              </div>
            </div>

            {/* Bottom Information */}
            <div className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-5">
              <Droplets size={22} className="shrink-0 text-blue-600" />
              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  AQUA-SENTRY Citizen Portal
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Keep your contact information updated to help the
                  responsible team communicate with you regarding
                  submitted complaints.
                </p>
              </div>
            </div>

          </section>
        </div>
      </main>
    </div>
  );
}
