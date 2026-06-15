import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Clock, ArrowRight, X } from "lucide-react";
import { SEO } from "../components/SEO";
import { useCMS } from "../context/CMSContext";
import { Link } from "react-router";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

// Categories are dynamically generated inside Destinations component

function DestinationCard({ dest, index }: { dest: any; index: number }) {
  const isEven = index % 2 === 0;
  const [showItinerary, setShowItinerary] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center mb-32 ${isEven ? "" : "lg:flex-row-reverse"
          }`}
      >
        {/* Image Side */}
        <div className="w-full lg:w-[55%] relative rounded-2xl overflow-hidden shadow-2xl h-[400px] sm:h-[500px]">
          {/* Route Badge */}
          <div className={`absolute top-6 ${isEven ? "left-6" : "right-6"} z-20`}>
            <div className="bg-[var(--color-accent-primary)] text-[var(--color-text-primary)] w-12 h-14 flex flex-col items-center justify-center rounded-sm shadow-md">
              <span className="text-[13px] font-bold leading-none">{String(index + 1).padStart(2, "0")}</span>
              <span className="text-[8px] uppercase tracking-widest mt-1">Route</span>
            </div>
          </div>

          <img
            src={dest.image}
            alt={dest.name}
            className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
          />

          {/* Subtle Bottom Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

          <div className={`absolute bottom-8 ${isEven ? "left-8" : "right-8 text-right"} z-20`}>
            <p className="text-[var(--color-accent-primary)] text-[10px] tracking-[0.25em] uppercase mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
              {dest.state} · {dest.tag}
            </p>
            <h3 className="text-white" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "1.5rem" }}>
              {dest.name}
            </h3>
          </div>
        </div>

        {/* Content Side */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center px-4 lg:px-0">
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="flex items-center gap-1.5 border border-[var(--color-text-primary)]/20 text-[var(--color-text-primary)]/70 px-3 py-1.5 text-[10px] tracking-wider uppercase rounded-full" style={{ fontFamily: "'Inter', sans-serif" }}>
              <Clock size={12} /> {dest.duration || "6 Days / 5 Nights"}
            </span>
            <span className="flex items-center gap-1.5 border border-[var(--color-accent-secondary)] text-[var(--color-accent-secondary)] px-3 py-1.5 text-[10px] tracking-wider uppercase rounded-full bg-[var(--color-accent-secondary)]/10" style={{ fontFamily: "'Inter', sans-serif" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-secondary)]" /> {dest.difficulty || "Moderate"}
            </span>
          </div>

          <h2 className="text-[var(--color-text-primary)] mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(2rem, 3vw, 2.5rem)", lineHeight: 1.1 }}>
            {dest.name}
          </h2>

          <p className="text-[var(--color-text-primary)]/60 text-[14px] leading-relaxed mb-10 max-w-md" style={{ fontFamily: "'Inter', sans-serif" }}>
            {dest.description}
          </p>

          {/* Footer info (Price & Buttons) */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-t border-[var(--color-text-primary)]/10 pt-8 gap-6 sm:gap-0">
            <div>
              <p className="text-[var(--color-text-primary)]/50 text-[9px] uppercase tracking-[0.2em] mb-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>
                Curation Direct Rate
              </p>
              <p className="text-[var(--color-text-primary)] flex items-baseline gap-1" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "1.6rem" }}>
                ₹{dest.price || "18,500"} <span className="text-[10px] font-normal text-[var(--color-text-primary)]/50 tracking-wider">/person</span>
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowItinerary(true)}
                className="border border-[var(--color-text-primary)] text-[var(--color-text-primary)] px-6 py-3.5 text-[10px] uppercase tracking-[0.2em] hover:bg-[var(--color-text-primary)] hover:text-white transition-colors text-center"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Read More
              </button>
              <Link
                to="/contact"
                className="bg-[var(--color-accent-primary)] text-[var(--color-text-primary)] px-6 py-3.5 text-[10px] uppercase tracking-[0.2em] hover:bg-[#c4b187] transition-colors text-center font-medium"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Enquire Now
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showItinerary && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowItinerary(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-[#f8f9fa] shadow-2xl rounded-lg overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-[var(--color-text-primary)]/10 bg-[#f8f9fa]">
                <div>
                  <h3 className="text-[var(--color-text-primary)] text-2xl" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
                    {dest.name} Itinerary
                  </h3>
                  <p className="text-[var(--color-accent-secondary)] text-[11px] tracking-widest uppercase mt-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {dest.duration || "6 Days / 5 Nights"}
                  </p>
                </div>
                <button
                  onClick={() => setShowItinerary(false)}
                  className="p-2 text-[var(--color-text-primary)]/50 hover:text-[var(--color-text-primary)] hover:bg-[var(--color-text-primary)]/5 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Body */}
              <div className="overflow-y-auto p-6 lg:p-10">
                {dest.itinerary && dest.itinerary.length > 0 ? (
                  <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                    {dest.itinerary.map((day: any, idx: number) => (
                      <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        {/* Icon */}
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-[var(--color-accent-secondary)] text-slate-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                          <span className="text-xs font-bold font-sans">{idx + 1}</span>
                        </div>
                        {/* Card */}
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#f8f9fa] p-5 rounded-lg shadow-sm border border-[var(--color-text-primary)]/5">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[var(--color-accent-secondary)] text-[10px] uppercase tracking-wider font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                              {day.day}
                            </span>
                          </div>
                          <h4 className="text-[var(--color-text-primary)] font-semibold text-lg mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                            {day.title}
                          </h4>
                          <p className="text-[var(--color-text-primary)]/70 text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif" }}>
                            {day.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 text-[var(--color-text-primary)]/50">
                    Itinerary details are currently being curated. Please check back later or contact us for a customized plan.
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-[var(--color-text-primary)]/10 bg-[var(--color-bg-light)] flex justify-between items-center">
                <div className="hidden sm:block">
                  <p className="text-[var(--color-text-primary)]/50 text-[10px] uppercase tracking-[0.2em] mb-1">
                    Ready to book?
                  </p>
                </div>
                <div className="flex gap-4 w-full sm:w-auto">
                  <Link
                    to="/contact"
                    className="flex-1 sm:flex-none bg-[#0a0a0a] text-white px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] hover:bg-[var(--color-accent-primary)] hover:text-black transition-colors text-center font-medium rounded-lg"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Enquire Now
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function Destinations() {
  const { content } = useCMS();
  const destinations = content.destinationsData;
  const destData = content.destinationsPage;

  const heroColors = content.sectionColors?.destinations?.hero;
  const gridColors = content.sectionColors?.destinations?.grid;
  const ctaColors = content.sectionColors?.destinations?.cta;

  const allDestinations = Object.keys(destinations || {}).flatMap((categoryName) => {
    return (destinations[categoryName] || []).map((d: any) => ({
      ...d,
      categoryName
    }));
  });

  const categoriesList = [
    { key: "all", label: "All Experiences" },
    ...Object.keys(destinations || {}).map((key) => ({
      key,
      label: key.charAt(0).toUpperCase() + key.slice(1)
    }))
  ];

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = allDestinations.filter((d) => {
    let matchesCategory = false;
    if (activeCategory === "all") {
      matchesCategory = true;
    } else {
      matchesCategory = d.categoryName === activeCategory;
    }

    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <SEO
        title="Destinations"
        description="Explore India's most extraordinary destinations — from the Himalayas to the backwaters, Rajasthan to the North-East."
        ogImage={destData.heroImage || "https://images.unsplash.com/photo-1469521669194-babb45599def?w=1200&h=630&fit=crop&auto=format"}
      />

      <div className="bg-[var(--color-bg)] min-h-screen" style={{ backgroundColor: heroColors?.bg || undefined }}>
        {/* Hero */}
        <section className="pt-40 pb-16 px-6 lg:px-10" style={{ backgroundColor: heroColors?.bg || undefined, color: heroColors?.text || undefined }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
            className="max-w-7xl mx-auto"
          >
            <motion.p
              variants={fadeUp}
              className="text-[10px] tracking-[0.35em] uppercase text-[var(--color-accent-primary)] font-bold mb-6"
              style={{ fontFamily: "'Inter', sans-serif", color: heroColors?.text || undefined }}
            >
              {destData.heroSubtitle}
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-[var(--color-text-primary)] max-w-3xl mb-6"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "clamp(2.5rem, 4vw, 4rem)",
                lineHeight: 1.1,
                color: heroColors?.text || undefined
              }}
            >
              {destData.heroTitle}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-[var(--color-text-primary)]/70 max-w-2xl text-[14px] leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif", color: heroColors?.text ? `${heroColors.text}b2` : undefined }}
            >
              {destData.heroDescription}
            </motion.p>
          </motion.div>
        </section>

        {/* List View */}
        <section className="px-6 lg:px-10 pb-32" style={{ backgroundColor: gridColors?.bg || undefined, color: gridColors?.text || undefined }}>
          <div className="max-w-7xl mx-auto">
            {/* Filter Categories & Search */}
            <div 
              className="sticky top-[73px] z-40 bg-[var(--color-bg)] pt-4 pb-4 border-b border-black/5 mb-12 -mx-6 px-6 lg:mx-0 lg:px-0"
              style={{ backgroundColor: gridColors?.bg || undefined, borderColor: gridColors?.text ? `${gridColors.text}1a` : undefined }}
            >
              <div className="flex flex-col md:flex-row gap-4 md:items-center max-w-7xl mx-auto">
                {/* Search Bar */}
                <div className="relative w-full md:w-64 flex-none">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40" size={14} style={{ color: gridColors?.text || undefined }} />
                  <input
                    type="text"
                    placeholder="Search destinations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-5 py-3 rounded-full text-[12px] bg-[#fafafa] border border-black/10 focus:border-black/30 outline-none font-medium transition-colors duration-300 placeholder:text-black/30 text-gray-800"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  />
                </div>

                <div className="hidden md:block w-px h-6 bg-black/10 flex-none mx-2" style={{ backgroundColor: gridColors?.text ? `${gridColors.text}1a` : undefined }} />

                {/* Categories */}
                <div className="flex overflow-x-auto gap-3 w-full scrollbar-hide pb-2 md:pb-0">
                  {categoriesList.map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => setActiveCategory(cat.key)}
                      className={`flex-none px-6 py-2.5 rounded-full text-[10px] uppercase tracking-[0.15em] transition-colors duration-300 font-medium ${activeCategory === cat.key
                        ? "bg-[#0a0a0a] text-white border border-[#0a0a0a]"
                        : "bg-transparent border border-black/20 text-black/70 hover:border-black hover:text-black"
                        }`}
                      style={{ 
                        fontFamily: "'Inter', sans-serif",
                        color: activeCategory !== cat.key && gridColors?.text ? gridColors.text : undefined,
                        borderColor: activeCategory !== cat.key && gridColors?.text ? `${gridColors.text}33` : undefined
                      }}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {filtered.length > 0 ? (
              filtered.map((dest, i) => (
                <DestinationCard key={dest.id} dest={dest} index={i} />
              ))
            ) : (
              <div className="text-center py-20">
                <p className="text-[var(--color-text-primary)]/50" style={{ fontFamily: "'Inter', sans-serif", color: gridColors?.text || undefined }}>No destinations found matching your criteria.</p>
              </div>
            )}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-[#e2e4e6] py-24 px-6 text-center" style={{ backgroundColor: ctaColors?.bg || undefined, color: ctaColors?.text || undefined }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          >
            <motion.h2
              variants={fadeUp}
              className="text-black mb-6"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                color: ctaColors?.text || undefined
              }}
            >
              Not Sure Where Your Story Begins?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-black/70 mb-10 max-w-xl mx-auto text-[15px] leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif", color: ctaColors?.text ? `${ctaColors.text}b2` : undefined }}
            >
              Our travel curators will help you find the destination that resonates with your spirit.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 bg-[var(--color-text-primary)] text-white px-8 py-4 text-[12px] tracking-[0.2em] uppercase hover:bg-[var(--color-accent-primary)] hover:text-[var(--color-text-primary)] transition-all duration-300 font-medium"
                style={{ fontFamily: "'Inter', sans-serif", color: ctaColors?.text ? 'var(--color-bg)' : undefined, backgroundColor: ctaColors?.text || undefined }}
              >
                TALK TO AN EXPERT
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </>
  );
}
