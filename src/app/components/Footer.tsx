import { Link } from "react-router";
import { Instagram, Twitter, Facebook, Youtube, Linkedin } from "lucide-react";
import { useState } from "react";
import { useCMS } from "../context/CMSContext";

export function Footer() {
  const { content } = useCMS();
  const globalData = content.global;
  const [policyModal, setPolicyModal] = useState<{ title: string; text: string } | null>(null);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/destinations", label: "Destinations" },
    { href: "/experiences", label: "Reviews" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <footer className="bg-[#0a0a0a] text-white border-t border-white/5 py-16 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-8">
        
        {/* Brand/Logo Section */}
        <div className="flex flex-col items-center">
          <span
            className="text-2xl tracking-[0.2em] uppercase text-white"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
          >
            {globalData.logoText}
          </span>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-accent-secondary)] mt-1">
            {globalData.logoSubtext}
          </p>
        </div>

        {/* Navigation Page Titles Links */}
        <div 
          className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-[12px] tracking-[0.2em] uppercase font-semibold text-white/50" 
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              to={link.href} 
              className="hover:text-white transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Social Media Links */}
        <div className="flex gap-4">
          {[
            { Icon: Instagram, url: globalData.socialLinks?.instagram },
            { Icon: Twitter, url: globalData.socialLinks?.twitter },
            { Icon: Facebook, url: globalData.socialLinks?.facebook },
            { Icon: Youtube, url: globalData.socialLinks?.youtube },
            { Icon: Linkedin, url: globalData.socialLinks?.linkedin },
          ]
            .filter(({ url }) => url && url.trim() !== "" && url.trim() !== "#")
            .map(({ Icon, url }, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-300"
              >
                <Icon size={15} />
              </a>
            ))}
        </div>

        {/* Bottom copyright & policies */}
        <div className="w-full border-t border-white/5 pt-8 mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-white/30 tracking-wider font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
            © {new Date().getFullYear()} {globalData.logoText}. All rights reserved.
          </p>
          <p className="text-[10px] text-white/25 tracking-[0.15em] font-medium uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
            DEVELOPED BY <a href="https://avaialable.com" target="_blank" rel="noopener noreferrer" className="hover:text-white/50 transition-colors underline decoration-white/10">AVAIALABLE.COM</a>
          </p>
          <div className="flex gap-6">
            <button 
              onClick={() => setPolicyModal({
                title: "Privacy Policy",
                text: globalData.privacyPolicy || "Privacy Policy details are being updated."
              })}
              className="text-[11px] text-white/30 hover:text-white/60 transition-colors font-medium cursor-pointer" 
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => setPolicyModal({
                title: "Terms of Service",
                text: globalData.termsOfService || "Terms of Service details are being updated."
              })}
              className="text-[11px] text-white/30 hover:text-white/60 transition-colors font-medium cursor-pointer" 
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Terms of Service
            </button>
          </div>
        </div>

      </div>

      {/* Policies Modal */}
      {policyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            onClick={() => setPolicyModal(null)}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
          />
          {/* Modal Container */}
          <div className="relative w-full max-w-2xl bg-white text-gray-900 rounded-xl shadow-2xl p-8 max-h-[80vh] flex flex-col z-10 border border-gray-100">
            <button
              onClick={() => setPolicyModal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors text-lg font-bold p-1 cursor-pointer"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold mb-6 font-serif border-b pb-4 text-gray-900">
              {policyModal.title}
            </h3>
            <div className="overflow-y-auto text-sm leading-relaxed text-gray-600 pr-2 whitespace-pre-line font-sans">
              {policyModal.text}
            </div>
            <div className="mt-8 border-t pt-4 flex justify-end">
              <button
                onClick={() => setPolicyModal(null)}
                className="bg-[#0a0a0a] text-white text-xs px-6 py-3 uppercase tracking-wider font-semibold rounded hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
