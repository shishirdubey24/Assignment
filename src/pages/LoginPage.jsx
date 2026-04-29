import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hook/useAuth";
import { Lock, User } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const res = login(form.username, form.password);

    if (res.success) {
      navigate("/dashboard");
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 relative overflow-hidden">
      {/* Subtle decorative background shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-100/50 blur-3xl"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/50 blur-3xl"></div>
      </div>
      
      <div className="relative w-full max-w-md z-10">
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden border border-gray-100">
          <div className="p-8 sm:p-12">
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-indigo-50 rounded-xl mx-auto flex items-center justify-center mb-5 border border-indigo-100">
                <Lock className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Voucher Management</h2>
              <p className="text-gray-500 mt-2 text-sm font-medium">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1 relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                </div>
                <input
                  name="username"
                  placeholder="Username"
                  value={form.username}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-sm"
                />
              </div>

              <div className="space-y-1 relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                </div>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-gray-800 text-sm font-medium placeholder:text-gray-400 shadow-sm"
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100 flex items-center">
                  <span className="mr-2">⚠️</span> {error}
                </div>
              )}

              <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold shadow-sm hover:bg-indigo-700 hover:shadow-md transition-all duration-200 active:scale-[0.98]">
                Sign In
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex flex-col items-center gap-2">
                <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">Demo Access</p>
                <div className="flex gap-3 w-full mt-2">
                  <div className="flex-1 bg-gray-50 rounded-lg p-3 text-center border border-gray-100 hover:bg-gray-100 transition-colors cursor-default">
                    <p className="text-xs text-gray-800 font-bold">Admin Role</p>
                    <p className="text-[11px] text-gray-500 mt-1 font-mono">admin / admin123</p>
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-lg p-3 text-center border border-gray-100 hover:bg-gray-100 transition-colors cursor-default">
                    <p className="text-xs text-gray-800 font-bold">Staff Role</p>
                    <p className="text-[11px] text-gray-500 mt-1 font-mono">staff / staff123</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;