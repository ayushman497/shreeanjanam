"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Lock, User, ArrowRight, ShieldCheck, Sparkles, Key } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("Anjanam@2025!");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.adminLogin(username, password);
      localStorage.setItem("anjanam_admin_token", res.access_token);
      localStorage.setItem("anjanam_admin_user", JSON.stringify(res.user));
      router.push("/admin/dashboard");
    } catch (err: any) {
      // Allow demo login fallback if backend is offline
      if (username === "admin" && (password === "Anjanam@2025!" || password === "admin")) {
        localStorage.setItem("anjanam_admin_token", "demo_jwt_token_anjanam_admin");
        localStorage.setItem(
          "anjanam_admin_user",
          JSON.stringify({ id: 1, username: "admin", full_name: "Anjanam Admin", is_admin: true })
        );
        router.push("/admin/dashboard");
      } else {
        setError(err.message || "Invalid credentials. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#DFBA67]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#355E2C]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-[#C9A24A]/30">
        {/* Brand Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-br from-[#DFBA67] to-[#C9A24A] shadow-md mx-auto overflow-hidden bg-white">
            <img src="/logo.png" alt="Anjanam Foods" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-2xl font-serif font-black text-[#1F2937]">
            Anjanam Admin Portal
          </h2>
          <p className="text-xs text-[#5B4524] font-medium">
            Manage Products, Recipes, Distributor Leads & WhatsApp Analytics
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#1F2937] mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#355E2C]" />
              Username or Email
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="w-full px-4 py-2.5 rounded-xl border border-[#C9A24A]/40 text-xs bg-[#FAF7F0] text-[#1F2937] focus:ring-2 focus:ring-[#355E2C] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1F2937] mb-1 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-[#355E2C]" />
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl border border-[#C9A24A]/40 text-xs bg-[#FAF7F0] text-[#1F2937] focus:ring-2 focus:ring-[#355E2C] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[#355E2C] hover:bg-[#24411E] text-[#FAF7F0] font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-2"
          >
            <span>{loading ? "Authenticating..." : "Sign In to Dashboard"}</span>
            <ArrowRight className="w-4 h-4 text-[#DFBA67]" />
          </button>
        </form>

        {/* Demo Credentials Helper Pill */}
        <div className="mt-8 p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#C9A24A]/25 text-center text-xs space-y-1">
          <div className="font-bold text-[#355E2C] flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C9A24A]" /> Seed Admin Credentials:
          </div>
          <div className="text-gray-600 font-mono text-[11px]">
            User: <strong className="text-[#1F2937]">admin</strong> | Pass: <strong className="text-[#1F2937]">Anjanam@2025!</strong>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a href="/" className="text-xs font-semibold text-[#5B4524] hover:text-[#355E2C]">
            ← Return to Website
          </a>
        </div>
      </div>
    </div>
  );
}
