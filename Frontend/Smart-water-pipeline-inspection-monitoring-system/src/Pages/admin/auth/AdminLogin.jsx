
import { useState,useEffect } from "react";
import {
  ShieldCheck,
  Droplets,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ChevronDown,
  Waves,
} from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAppContext } from "../../../Context";
export default function AdminLogin() {
  const navigate = useNavigate();
  const {user } = useAppContext();
  useEffect(() => {
          if (localStorage.getItem("token") != null) {
              const decoded = jwtDecode(localStorage.getItem("token"));
              if (decoded.exp < Date.now() / 1000) {
                  localStorage.removeItem("token");
                  toast.warn("Session Expired! Please login again")
              } else {
                  if (decoded) {
                      navigate("/admin")
                  }
              }
          }
      }, [user]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const data = {
      email:email,
      password:password
    }
    if (!email.trim() || !password) {
      setError("Enter your official email and password.");
      return;
    }

    // Connect this handler to your Spring Boot authentication API.
    fetch(`${import.meta.env.VITE_API_POINT}/api/admin/login`,{
      method:"POST",
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify({ userEmail:email, password:password })
    }).then((responce)=>{
      return responce.json();
    }).then((data)=>{
      console.log(data)
      if(data.success){
        localStorage.setItem("token",data.token)
        toast.success("User Logged in Successfuly!")
        navigate("/admin")
        return;
      }
    }).catch((e)=>{
      console.log(e)
    })
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07111f] px-4 py-10 text-white">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-emerald-500/10 blur-[110px]" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#0c1929]/90 shadow-2xl shadow-black/40 lg:grid-cols-2">
        {/* Branding panel */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-[#102b40] via-[#0c2638] to-[#071722] p-10 lg:flex">
          <div className="absolute -right-20 top-28 h-72 w-72 rounded-full border border-cyan-300/10" />
          <div className="absolute -right-8 top-40 h-48 w-48 rounded-full border border-cyan-300/15" />

          <div className="relative flex items-center gap-3">
            <div className="rounded-xl bg-cyan-400/15 p-3 text-cyan-300">
              <Droplets size={28} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wide">
                AQUA-SENTRY
              </h1>
              <p className="text-xs tracking-[0.2em] text-cyan-200/60">
                WATER INFRASTRUCTURE INTELLIGENCE
              </p>
            </div>
          </div>

          <div className="relative my-14">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-300">
              <Waves size={42} strokeWidth={1.3} />
            </div>
            <h2 className="max-w-sm text-4xl font-semibold leading-tight">
              Monitor smarter.
              <span className="mt-2 block text-cyan-300">
                Protect every pipeline.
              </span> 
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              A centralized workspace for pipeline inspections,
              defect analysis, maintenance operations, and monitoring.
            </p>
          </div>

          <div className="relative flex items-center gap-3 border-t border-white/10 pt-5 text-xs text-slate-400">
            <ShieldCheck size={18} className="text-emerald-400" />
            Restricted access for authorized personnel
          </div>
        </section>

        {/* Login panel */}
        <section className="p-6 sm:p-10 lg:p-12">
          <div className="mb-9 flex items-center gap-3 lg:hidden">
            <div className="rounded-xl bg-cyan-400/15 p-2.5 text-cyan-300">
              <Droplets size={25} />
            </div>
            <div>
              <h1 className="font-bold tracking-wide">AQUA-SENTRY</h1>
              <p className="text-[10px] tracking-widest text-slate-400">
                ADMINISTRATIVE PORTAL
              </p>
            </div>
          </div>

          <div className="mb-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-300/5 px-3 py-1.5 text-xs font-medium text-cyan-300">
              <ShieldCheck size={15} />
              Authorized Personnel Only
            </div>

            <h2 className="text-3xl font-semibold tracking-tight">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Sign in to access the administrative workspace.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Official email
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@organization.com"
                  className="w-full rounded-xl border border-slate-700 bg-[#101f30] py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10"
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-2">
                <label className="text-sm font-medium text-slate-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert("Connect your password-reset flow.")}
                  className="text-xs text-cyan-300 transition hover:text-cyan-200"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-slate-700 bg-[#101f30] py-3.5 pl-11 pr-12 text-sm outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <p role="alert" className="text-sm text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-400 py-3.5 text-sm font-semibold text-[#07111f] transition hover:bg-cyan-300 active:scale-[0.99]"
            >
              <ShieldCheck size={18} />
              Sign in securely
            </button>
          </form>

          <div className="my-7 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[11px] uppercase tracking-wider text-slate-500">
              Secure access
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <p className="text-center text-xs leading-5 text-slate-500">
            Access is restricted to authorized administrative team members.
            Contact your system administrator if you need assistance.
          </p>
        </section>
      </div>
    </main>
  );
}
