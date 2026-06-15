import { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router";
import { Home, Map, Compass, Info, MessageSquare, Palette, FileText, LogOut, Lock, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCMS } from "../context/CMSContext";

export default function AdminLayout() {
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("rs_admin_logged_in") === "true";
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { hasChanges, isSaving, saveStatus, setSaveStatus, saveChanges, discardChanges } = useCMS();

  useEffect(() => {
    if (saveStatus) {
      const timer = setTimeout(() => {
        setSaveStatus(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [saveStatus, setSaveStatus]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      if (res.ok) {
        localStorage.setItem("rs_admin_logged_in", "true");
        setIsLoggedIn(true);
        setError("");
      } else {
        const data = await res.json();
        setError(data.error || "Invalid username or password");
      }
    } catch (err) {
      setError("Server connection failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("rs_admin_logged_in");
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  const navItems = [
    { name: "Global Settings", path: "/rs-admin/global", icon: <FileText size={20} /> },
    { name: "Theme Settings", path: "/rs-admin/theme", icon: <Palette size={20} /> },
    { name: "Home Page", path: "/rs-admin/home", icon: <Home size={20} /> },
    { name: "Destinations", path: "/rs-admin/destinations", icon: <Map size={20} /> },
    { name: "Reviews", path: "/rs-admin/reviews", icon: <Compass size={20} /> },
    { name: "About Page", path: "/rs-admin/about", icon: <Info size={20} /> },
    { name: "Contact Page", path: "/rs-admin/contact", icon: <MessageSquare size={20} /> },
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#F3F5F7] flex items-center justify-center p-6 relative font-sans">
        {/* Background decorative subtle circles */}
        <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] rounded-full bg-[#7A90A8]/5 blur-[80px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-[#5B6E82]/5 blur-[80px]" />

        <div className="w-full max-w-md bg-white border border-gray-200/80 p-8 rounded-2xl shadow-xl relative z-10">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-[#F3F5F7] border border-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Lock className="text-[#7A90A8] w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold text-[#2D3748] mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Route Story
            </h1>
            <p className="text-gray-500 text-xs tracking-wider uppercase font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
              Admin Portal
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs py-3 px-4 rounded-xl flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                Username
              </label>
              <input
                required
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#F3F5F7] border border-gray-200/60 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#5B6E82] focus:ring-1 focus:ring-[#5B6E82]/20 transition-all"
                placeholder="e.g. admin"
                style={{ fontFamily: "'Inter', sans-serif" }}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] tracking-[0.2em] uppercase text-gray-500 font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                Password
              </label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#F3F5F7] border border-gray-200/60 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#5B6E82] focus:ring-1 focus:ring-[#5B6E82]/20 transition-all"
                placeholder="••••••••"
                style={{ fontFamily: "'Inter', sans-serif" }}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#2D3748] hover:bg-[#5B6E82] text-white font-medium text-xs tracking-widest uppercase py-3.5 px-4 rounded-xl shadow-md active:scale-[0.98] transition-all cursor-pointer mt-2"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Sign In
            </button>
          </form>

          <div className="text-center mt-6">
            <Link to="/" className="text-xs text-gray-400 hover:text-[#2D3748] transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F3F4F6] text-gray-900 font-sans relative overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold tracking-tight text-gray-800">Rute Story Admin</h1>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== "/rs-admin" && location.pathname.startsWith(item.path));
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${isActive
                        ? "bg-gray-100 text-gray-900 font-medium"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                  >
                    {item.icon}
                    <span className="text-sm">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-200 flex flex-col gap-3">
          <Link to="/" className="text-sm text-blue-600 hover:underline flex items-center gap-2">
            <Home size={16} /> Back to Website
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm text-red-600 hover:text-red-800 flex items-center gap-2 font-medium cursor-pointer w-full text-left focus:outline-none"
          >
            <LogOut size={16} /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-8 shadow-sm z-10">
          <h2 className="text-lg font-semibold text-gray-800">
            {navItems.find(i => i.path === location.pathname)?.name || "Admin"}
          </h2>
        </header>
        <div className="flex-1 overflow-y-auto p-8 pb-28">
          <div className="max-w-5xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>

      {/* Floating Save Changes Bar */}
      <AnimatePresence>
        {hasChanges && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 50, x: "-50%" }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-6 left-1/2 z-50 bg-[#0a0a0a] border border-white/10 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-8 min-w-[320px] sm:min-w-[480px] justify-between text-white"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#8F9E92] animate-pulse" />
              <span className="text-[11px] tracking-[0.15em] uppercase font-semibold text-white/90" style={{ fontFamily: "'Inter', sans-serif" }}>
                Unsaved Changes
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={discardChanges}
                disabled={isSaving}
                className="text-[11px] tracking-[0.15em] uppercase font-semibold text-white/50 hover:text-white/80 transition-colors px-3 py-2 cursor-pointer disabled:opacity-50"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Discard
              </button>
              <button
                onClick={saveChanges}
                disabled={isSaving}
                className="bg-[#5B6E82] hover:bg-[#475569] text-white text-[11px] tracking-[0.15em] uppercase font-bold px-5 py-2.5 rounded-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Theme Aligned Notification Toast */}
      <AnimatePresence>
        {saveStatus && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed top-6 right-6 z-50 bg-[#fafafa] border-l-4 border-[#7A90A8] p-5 shadow-2xl rounded-r-xl max-w-sm flex items-start gap-4 border border-gray-250/20"
          >
            {saveStatus === 'success' ? (
              <CheckCircle2 className="text-[#8F9E92] w-5 h-5 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="text-red-500 w-5 h-5 flex-shrink-0 mt-0.5" />
            )}
            
            <div className="flex-1">
              <h4 className="text-gray-900 font-bold text-sm mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                {saveStatus === 'success' ? "Changes Saved Successfully" : "Failed to Save Changes"}
              </h4>
              <p className="text-gray-500 text-[11px] leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                {saveStatus === 'success' 
                  ? "All updates have been written to the database and are now live." 
                  : "An error occurred while pushing changes to the server. Please try again."
                }
              </p>
            </div>
            
            <button 
              onClick={() => setSaveStatus(null)}
              className="text-gray-400 hover:text-gray-600 text-xs font-bold p-1 cursor-pointer"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
