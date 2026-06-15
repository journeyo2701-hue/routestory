import { Outlet } from "react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useCMS } from "../context/CMSContext";
import { Phone, MessageCircle } from "lucide-react";

export default function RootLayout() {
  const { content } = useCMS();
  const phone = content.global?.contactPhone || "+91 9928375767";
  const cleanPhone = phone.replace(/\D/g, "");

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg)]">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {/* Call Button */}
        <a
          href={`tel:${phone.replace(/\s/g, "")}`}
          className="w-12 h-12 rounded-full flex items-center justify-center text-white bg-[var(--color-text-primary)] hover:bg-[var(--color-accent-primary)] transition-all duration-300 shadow-lg hover:scale-110 active:scale-95 group relative"
          aria-label="Call Us"
        >
          <Phone size={20} />
          <span className="absolute right-14 bg-gray-900 text-white text-[11px] tracking-wider uppercase px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none shadow-md font-sans">
            Call Us
          </span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${cleanPhone}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full flex items-center justify-center text-white bg-[#25D366] hover:bg-[#20ba5a] transition-all duration-300 shadow-lg hover:scale-110 active:scale-95 group relative"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={22} />
          <span className="absolute right-14 bg-gray-900 text-white text-[11px] tracking-wider uppercase px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none shadow-md font-sans">
            WhatsApp
          </span>
        </a>
      </div>
    </div>
  );
}
