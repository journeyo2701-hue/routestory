import { useRef, useState } from "react";
import { Link } from "react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { SEO } from "../components/SEO";
import { useCMS, SiteContent } from "../context/CMSContext";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

function HeroSection() {
  const { content } = useCMS();
  const heroData = content.home.hero;
  
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const colors = content.sectionColors?.home?.hero;

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] overflow-hidden" style={{ backgroundColor: colors?.bg || undefined, color: colors?.text || undefined }}>
      {/* Parallax Image */}
      <motion.div className="absolute inset-0" style={{ y: yImg }}>
        <img
          src={heroData.image}
          alt="India — Himalayas, Rajasthan, Kerala and beyond"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/55" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 pt-20"
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.35em" }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-[11px] tracking-[0.35em] uppercase text-white mb-8"
          style={{ fontFamily: "'Inter', sans-serif", color: colors?.text || undefined }}
        >
          {heroData.subtitle}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-white max-w-5xl leading-tight mb-8"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "clamp(2.4rem, 6vw, 5.5rem)",
            lineHeight: 1.1,
            color: colors?.text || undefined
          }}
        >
          {heroData.title1}
          <br />
          <em className="not-italic text-white" style={{ color: colors?.text || undefined }}>{heroData.titleHighlight}</em>{heroData.title2}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-white/70 max-w-2xl mx-auto leading-relaxed mb-12"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)", color: colors?.text || undefined }}
        >
          {heroData.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <Link
            to="/destinations"
            className="group flex items-center gap-3 bg-white text-[var(--color-text-primary)] px-8 py-4 text-[12px] tracking-[0.2em] uppercase hover:bg-[var(--color-accent-primary)] transition-all duration-300"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Explore Packages
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/contact"
            className="flex items-center gap-3 border border-white/50 text-white px-8 py-4 text-[12px] tracking-[0.2em] uppercase hover:bg-white/10 transition-all duration-300"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Customize My Trip
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

function WhySection() {
  const { content } = useCMS();
  const whyData = content.home.why;
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -scrollRef.current.clientWidth * 0.85 : scrollRef.current.clientWidth * 0.85;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };
  
  const cards = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 4C9.373 4 4 9.373 4 16s5.373 12 12 12 12-5.373 12-12S22.627 4 16 4z" stroke="var(--color-accent-secondary)" strokeWidth="1.5" fill="none" />
          <path d="M16 10v6l4 2" stroke="var(--color-accent-secondary)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      title: whyData.cards[0].title,
      description: whyData.cards[0].description,
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="11" r="5" stroke="var(--color-accent-secondary)" strokeWidth="1.5" fill="none" />
          <path d="M6 28c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="var(--color-accent-secondary)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
      ),
      title: whyData.cards[1].title,
      description: whyData.cards[1].description,
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="5" y="8" width="22" height="16" rx="2" stroke="var(--color-accent-secondary)" strokeWidth="1.5" fill="none" />
          <path d="M11 8V6M21 8V6M5 14h22" stroke="var(--color-accent-secondary)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      title: whyData.cards[2].title,
      description: whyData.cards[2].description,
    },
  ];

  const colors = content.sectionColors?.home?.why;

  return (
    <section className="bg-[var(--color-bg)] pt-16 pb-0 md:py-28 px-6 lg:px-10" style={{ backgroundColor: colors?.bg || undefined, color: colors?.text || undefined }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="text-center mb-10 md:mb-20"
        >
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-[11px] tracking-[0.35em] uppercase text-[var(--color-accent-secondary)] mb-4"
            style={{ fontFamily: "'Inter', sans-serif", color: colors?.text || undefined }}
          >
            {whyData.subtitle}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="text-[var(--color-text-primary)] max-w-2xl mx-auto"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: colors?.text || undefined
            }}
          >
            {whyData.title}
          </motion.h2>
        </motion.div>

        {/* Mobile Navigation Arrows */}
        <div className="flex justify-end gap-2 mb-6 md:hidden">
          <button
            onClick={() => handleScroll("left")}
            className="w-10 h-10 border border-[var(--color-text-primary)]/20 flex items-center justify-center text-[var(--color-text-primary)]/50 active:text-[var(--color-text-primary)] active:border-[var(--color-text-primary)] transition-all bg-white"
            aria-label="Scroll left"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => handleScroll("right")}
            className="w-10 h-10 border border-[var(--color-text-primary)]/20 flex items-center justify-center text-[var(--color-text-primary)]/50 active:text-[var(--color-text-primary)] active:border-[var(--color-text-primary)] transition-all bg-white"
            aria-label="Scroll right"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <motion.div
          ref={scrollRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 gap-4 md:gap-px bg-transparent md:bg-[var(--color-bg-light)] -mx-6 px-6 md:mx-0 md:px-0 pb-4 md:pb-0"
        >
          {cards.map((card) => (
            <motion.div
              key={card.title}
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="group bg-[var(--color-bg)] p-10 hover:bg-[var(--color-text-primary)] transition-all duration-500 cursor-default shrink-0 w-[85vw] snap-center md:w-auto md:shrink"
              style={{ backgroundColor: colors?.bg || undefined }}
            >
              <div className="mb-8 group-hover:[&_path]:stroke-[var(--color-accent-primary)] group-hover:[&_circle]:stroke-[var(--color-accent-primary)] group-hover:[&_rect]:stroke-[var(--color-accent-primary)] transition-colors duration-500">
                {card.icon}
              </div>
              <h3
                className="text-[var(--color-text-primary)] group-hover:text-white mb-4 transition-colors duration-500"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "1.3rem", color: colors?.text || undefined }}
              >
                {card.title}
              </h3>
              <p
                className="text-sm text-[var(--color-text-primary)]/60 group-hover:text-white/60 leading-relaxed transition-colors duration-500"
                style={{ fontFamily: "'Inter', sans-serif", color: colors?.text ? `${colors.text}aa` : undefined }}
              >
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedJourneys() {
  const { content } = useCMS();
  const featuredData = content.home.featuredJourneys;
  const featuredJourneys = content.featuredJourneysData;

  const [selectedJourney, setSelectedJourney] = useState<typeof featuredJourneys[0] | null>(null);

  const colors = content.sectionColors?.home?.featured;

  return (
    <>
      <section className="bg-[var(--color-bg-light)] pt-10 pb-16 md:py-28 px-6 lg:px-10" style={{ backgroundColor: colors?.bg || undefined, color: colors?.text || undefined }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          >
            <div>
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="text-[11px] tracking-[0.35em] uppercase text-[var(--color-accent-secondary)] mb-4"
                style={{ fontFamily: "'Inter', sans-serif", color: colors?.text || undefined }}
              >
                {featuredData.subtitle}
              </motion.p>
              <motion.h2
                variants={fadeUp}
                transition={{ duration: 0.7 }}
                className="text-[var(--color-text-primary)]"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  color: colors?.text || undefined
                }}
              >
                {featuredData.title}
              </motion.h2>
            </div>
            <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
              <Link
                to="/experiences"
                className="group flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase text-[var(--color-text-primary)]/60 hover:text-[var(--color-text-primary)] transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                View All Journeys
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Structural Grid Layout (Perfect Rectangle on all screens) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 auto-rows-[60px] sm:auto-rows-[80px] md:auto-rows-[100px] lg:auto-rows-[130px] grid-flow-row-dense"
          >
            {featuredJourneys.map((j, i) => {
              // Perfectly crafted spans to fill an 8-row x 3-column grid without gaps
              // Total 24 row units. 
              const spanClass = 
                i === 0 ? "row-span-3" : // c1
                i === 1 ? "row-span-2" : // c2
                i === 2 ? "row-span-2" : // c3
                i === 3 ? "row-span-2" : // c2 (Sacred Ganges - shorter)
                i === 4 ? "row-span-4" : // c3 (Tall)
                i === 5 ? "row-span-2" : // c1
                i === 6 ? "row-span-2" : // c2
                i === 7 ? "row-span-3" : // c1
                i === 8 ? "row-span-2" : // c2
                i === 9 ? "row-span-2" : // c3
                "row-span-2";

              return (
                <motion.div
                  key={j.id}
                  variants={fadeUp}
                  transition={{ duration: 0.7 }}
                  onClick={() => setSelectedJourney(j)}
                  className={`group relative overflow-hidden cursor-pointer w-full bg-[var(--color-text-primary)] ${spanClass}`}
                >
                  <img
                    src={j.image}
                    alt={j.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 lg:p-8">
                    <p
                      className="text-[6px] sm:text-[8px] md:text-[10px] tracking-[0.1em] sm:tracking-[0.3em] uppercase text-[var(--color-accent-primary)] mb-1 sm:mb-2 font-medium truncate"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {j.category} · {j.duration}
                    </p>
                    <h3
                      className="text-white tracking-wide text-sm sm:text-base md:text-xl lg:text-[1.4rem] leading-tight"
                      style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
                    >
                      {j.title}
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Information Modal */}
      <AnimatePresence>
        {selectedJourney && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
              onClick={() => setSelectedJourney(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-5xl bg-[var(--color-bg)] flex flex-col md:flex-row overflow-hidden shadow-2xl z-10"
              style={{ maxHeight: "90vh" }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedJourney(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/10 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X size={20} className="text-[var(--color-text-primary)] md:text-white" />
              </button>

              {/* Image Half */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                <img
                  src={selectedJourney.image}
                  alt={selectedJourney.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Half */}
              <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-[var(--color-bg)] overflow-y-auto">
                <p
                  className="text-[11px] tracking-[0.3em] uppercase text-[var(--color-accent-secondary)] mb-4"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {selectedJourney.category} · {selectedJourney.duration}
                </p>
                <h2
                  className="text-[var(--color-text-primary)] mb-8"
                  style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "2.5rem", lineHeight: 1.1 }}
                >
                  {selectedJourney.title}
                </h2>
                
                <div className="w-12 h-px bg-[var(--color-accent-primary)] mb-8" />

                <p
                  className="text-[var(--color-text-primary)]/70 text-[15px] leading-relaxed mb-10"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {selectedJourney.description || `Embark on a beautifully curated ${selectedJourney.duration.toLowerCase()} journey focusing on the essence of ${selectedJourney.category.toLowerCase()}. This signature route is designed to immerse you deeply in the local culture, landscape, and untold stories of the region. Every day unfolds a new chapter, carefully balanced with exploration and luxurious tranquility.`}
                </p>

                <div className="mt-auto pt-8 border-t border-[var(--color-text-primary)]/10">
                  <Link
                    to="/contact"
                    className="group inline-flex items-center gap-3 bg-[var(--color-text-primary)] text-white px-8 py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-[var(--color-accent-primary)] hover:text-[var(--color-text-primary)] transition-all duration-300"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Enquire About This Journey
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
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

function OurStorySection() {
  const { content } = useCMS();
  const storyData = content.home.ourStory;

  const colors = content.sectionColors?.home?.ourStory;

  return (
    <section className="bg-[var(--color-bg)] py-16 md:py-28 px-6 lg:px-10" style={{ backgroundColor: colors?.bg || undefined, color: colors?.text || undefined }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="relative"
        >
          <div className="relative overflow-hidden aspect-[4/5]">
            <img
              src={storyData.image}
              alt="Our Story"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Decorative offset box */}
          <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[var(--color-accent-primary)]/30 -z-10" />
          <div className="absolute -top-6 -left-6 w-32 h-32 border border-[var(--color-accent-secondary)]/30 -z-10" />
        </motion.div>

        {/* Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-[11px] tracking-[0.35em] uppercase text-[var(--color-accent-secondary)] mb-6"
            style={{ fontFamily: "'Inter', sans-serif", color: colors?.text || undefined }}
          >
            {storyData.subtitle}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="text-[var(--color-text-primary)] mb-8"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
              lineHeight: 1.15,
              color: colors?.text || undefined
            }}
          >
            {storyData.title1}
            <br />
            <span>{storyData.title2}</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="text-[var(--color-text-primary)]/65 leading-relaxed mb-6 text-[15px]"
            style={{ fontFamily: "'Inter', sans-serif", color: colors?.text ? `${colors.text}b2` : undefined }}
          >
            {storyData.p1}
          </motion.p>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="text-[var(--color-text-primary)]/65 leading-relaxed mb-10 text-[15px]"
            style={{ fontFamily: "'Inter', sans-serif", color: colors?.text ? `${colors.text}b2` : undefined }}
          >
            {storyData.p2}
          </motion.p>
          <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
            <Link
              to="/about"
              className="group inline-flex items-center gap-3 text-[12px] tracking-[0.2em] uppercase text-[var(--color-text-primary)] border-b border-[var(--color-text-primary)]/30 pb-1 hover:border-[var(--color-text-primary)] transition-colors duration-300"
              style={{ fontFamily: "'Inter', sans-serif", color: colors?.text || undefined, borderColor: colors?.text || undefined }}
            >
              Read Our Full Story
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const { content } = useCMS();
  const testData = content.home.testimonials;
  const testimonials = content.testimonialsData;

  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  const colors = content.sectionColors?.home?.testimonials;

  return (
    <section className="bg-gray-200 py-16 md:py-28 px-6 lg:px-10 overflow-hidden" style={{ backgroundColor: colors?.bg || undefined, color: colors?.text || undefined }}>
      <div className="max-w-4xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[11px] tracking-[0.35em] uppercase text-[var(--color-accent-secondary)] text-center mb-16"
          style={{ fontFamily: "'Inter', sans-serif", color: colors?.text || undefined }}
        >
          {testData.subtitle}
        </motion.p>

        <div className="relative min-h-[260px] flex items-center justify-center">
          <AnimatedTestimonial testimonial={testimonials[current]} customTextColor={colors?.text} key={current} />
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-16">
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-300 ${i === current
                    ? "w-8 h-px bg-[var(--color-accent-primary)]"
                    : "w-4 h-px bg-[var(--color-text-primary)]/20 hover:bg-[var(--color-text-primary)]/40"
                  }`}
              />
            ))}
          </div>
          <div className="flex gap-4">
            <button
              onClick={prev}
              className="w-10 h-10 border border-[var(--color-text-primary)]/20 flex items-center justify-center text-[var(--color-text-primary)]/50 hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-primary)]/50 transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 border border-[var(--color-text-primary)]/20 flex items-center justify-center text-[var(--color-text-primary)]/50 hover:text-[var(--color-text-primary)] hover:border-[var(--color-text-primary)]/50 transition-all"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function AnimatedTestimonial({ testimonial, customTextColor }: { testimonial: SiteContent["testimonialsData"][number]; customTextColor?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center w-full"
    >
      <p
        className="text-[var(--color-text-primary)]/90 mb-10"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: "italic",
          fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)",
          lineHeight: 1.5,
          color: customTextColor || undefined
        }}
      >
        "{testimonial.quote}"
      </p>
      <p
        className="text-[var(--color-accent-primary)] text-[13px] tracking-wider"
        style={{ fontFamily: "'Inter', sans-serif", color: customTextColor || undefined }}
      >
        {testimonial.author}
      </p>
      <p
        className="text-[var(--color-text-primary)]/50 text-[11px] tracking-[0.2em] uppercase mt-1"
        style={{ fontFamily: "'Inter', sans-serif", color: customTextColor ? `${customTextColor}80` : undefined }}
      >
        {testimonial.location} · {testimonial.journey}
      </p>
    </motion.div>
  );
}

function CTASection() {
  const { content } = useCMS();
  const ctaData = content.home.cta;

  const colors = content.sectionColors?.home?.cta;

  return (
    <section className="relative py-20 md:py-40 px-6 overflow-hidden">
      <img
        src={ctaData.image}
        alt="CTA Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/55" />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        className="relative z-10 text-center max-w-3xl mx-auto"
      >
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="text-[11px] tracking-[0.35em] uppercase text-white mb-6"
          style={{ fontFamily: "'Inter', sans-serif", color: colors?.text || undefined }}
        >
          {ctaData.subtitle}
        </motion.p>
        <motion.h2
          variants={fadeUp}
          transition={{ duration: 0.7 }}
          className="text-white mb-8"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            lineHeight: 1.1,
            color: colors?.text || undefined
          }}
        >
          {ctaData.title}
        </motion.h2>
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.7 }}
          className="text-white/60 mb-12 text-[15px] leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif", color: colors?.text ? `${colors.text}aa` : undefined }}
        >
          {ctaData.description}
        </motion.p>
        <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 bg-[#E9EEF3] text-[#2D3748] px-10 py-5 text-[12px] tracking-[0.25em] uppercase hover:bg-[#DCE4EC] transition-all duration-300"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Plan My Journey
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <SEO
        title="Route Story"
        description="Route Story crafts immersive, handpicked journeys across India — from the Himalayas to the backwaters. Every journey has a story."
      />
      <HeroSection />
      <WhySection />
      <FeaturedJourneys />
      <OurStorySection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
