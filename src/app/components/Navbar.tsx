import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/experiences", label: "Reviews" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

import { useCMS } from "../context/CMSContext";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { content } = useCMS();
  const globalData = content.global;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  const transparent = isHome && !scrolled && !mobileOpen;

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        transparent
          ? "bg-transparent"
          : "bg-[var(--brand-mist)] border-b border-black/8 shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-18 py-4">
          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none group">
            <span
              className={`text-xl tracking-widest uppercase transition-colors duration-300 ${
                transparent ? "text-white" : "text-[var(--color-text-primary)]"
              }`}
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
            >
              {globalData.logoText}
            </span>
            <span
              className={`text-[10px] tracking-[0.3em] uppercase mt-0.5 transition-colors duration-300 ${
                transparent ? "text-white/60" : "text-[var(--color-accent-secondary)]"
              }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {globalData.logoSubtext}
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-[13px] tracking-[0.15em] uppercase transition-colors duration-300 relative group ${
                  transparent ? "text-white/80 hover:text-white" : "text-[var(--color-text-primary)]/70 hover:text-[var(--color-text-primary)]"
                } ${location.pathname === link.href ? (transparent ? "text-white" : "text-[var(--color-text-primary)]") : ""}`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px transition-all duration-300 bg-[var(--color-accent-primary)] ${
                    location.pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
            <Link
              to="/contact"
              className={`text-[12px] tracking-[0.2em] uppercase px-5 py-2.5 border transition-all duration-300 ${
                transparent
                  ? "border-white/50 text-white hover:bg-white hover:text-[var(--color-text-primary)]"
                  : "border-[var(--color-text-primary)] text-[var(--color-text-primary)] hover:bg-[var(--color-text-primary)] hover:text-white"
              }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Customize Your Trip
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 transition-colors ${transparent ? "text-white" : "text-[var(--color-text-primary)]"}`}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[var(--brand-mist)] border-t border-black/8 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-[13px] tracking-[0.2em] uppercase text-[var(--color-text-primary)]/70 hover:text-[var(--color-text-primary)] transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="text-[12px] tracking-[0.2em] uppercase px-5 py-3 border border-[var(--color-text-primary)] text-[var(--color-text-primary)] text-center mt-2"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Customize Your Trip
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
