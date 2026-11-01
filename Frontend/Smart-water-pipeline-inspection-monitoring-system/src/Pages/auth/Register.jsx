import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../Context";
import { jwtDecode } from "jwt-decode";
const Register = () => {

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
                    navigate("/")
                }
            }
        }
    }, [user]);
  const [formData, setFormData] = useState({
    name: "",
    userEmail: "",
    password: "",
    confirmPassword: "",
    role:"CITIZEN"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    fetch(`${import.meta.env.VITE_API_POINT}/api/regester`,{
      method:"POST",
      headers:{
        'Content-Type':"application/json"
      },
      body:JSON.stringify(formData)
    }).then((responce)=>{
      return responce.json();
    }).then((res)=>{
      console.log(res)
    }).catch((e)=>{
      console.log(e);
    })
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        {/* Heading */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Create Account
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Sign up to get started
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="userEmail"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>

            <input
              id="userEmail"
              name="userEmail"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2">
            <input
              id="terms"
              type="checkbox"
              required
              className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />

            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the{" "}
              <span className="cursor-pointer text-blue-600 hover:underline">
                Terms & Conditions
              </span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Account
          </button>
        </form>

        {/* Login */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};
export default Register;