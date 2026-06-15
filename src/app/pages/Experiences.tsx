import { useState, useRef } from "react";
import { motion } from "motion/react";
import { SEO } from "../components/SEO";
import { useCMS } from "../context/CMSContext";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

function ReviewCard({ review, gridColors }: { review: any; gridColors: any }) {
  return (
    <motion.div
      variants={fadeUp}
      className="bg-[var(--brand-mist)] p-8 relative group shadow-sm border border-[var(--color-text-primary)]/5 rounded-2xl flex flex-col justify-between h-full min-h-[260px]"
      style={{ borderColor: gridColors?.text ? `${gridColors.text}1a` : undefined }}
    >
      <div>
        <Quote className="text-[var(--color-accent-primary)]/20 w-6 h-6 absolute top-6 right-6" />
        
        {/* Rating Display */}
        {(review.rating || 5) && (
          <div className="flex gap-1 mb-4">
            {[...Array(review.rating || 5)].map((_, i) => (
              <Star key={i} size={14} className="fill-[#FFC107] text-[#FFC107]" />
            ))}
          </div>
        )}

        <p
          className="text-[var(--color-text-primary)]/80 text-[14px] leading-relaxed mb-6 relative z-10"
          style={{ fontFamily: "'Inter', sans-serif", color: gridColors?.text || undefined }}
        >
          "{review.quote}"
        </p>
      </div>

      <div className="border-t border-[var(--color-text-primary)]/10 pt-4 mt-auto" style={{ borderColor: gridColors?.text ? `${gridColors.text}1a` : undefined }}>
        <p
          className="text-[var(--color-text-primary)] font-semibold text-[13px] tracking-wide mb-1"
          style={{ fontFamily: "'Inter', sans-serif", color: gridColors?.text || undefined }}
        >
          {review.author}
        </p>
        <p
          className="text-[var(--color-text-primary)]/50 text-[11px] tracking-wider uppercase mb-3"
          style={{ fontFamily: "'Inter', sans-serif", color: gridColors?.text ? `${gridColors.text}99` : undefined }}
        >
          {review.location}
        </p>
        <div className="inline-block bg-[var(--color-bg)] px-3 py-1.5 rounded-full shadow-sm">
          <p
            className="text-[var(--color-accent-primary)] text-[9px] tracking-[0.2em] uppercase font-medium"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {review.journey}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Experiences() {
  const { content, updateContent } = useCMS();
  const reviews = content.testimonialsData;
  const heroColors = content.sectionColors?.experiences?.hero;
  const gridColors = content.sectionColors?.experiences?.grid;

  const [formData, setFormData] = useState({ author: "", email: "", location: "", journey: "", quote: "", rating: 5 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const desktopScrollRef = useRef<HTMLDivElement>(null);
  const [desktopActiveIndex, setDesktopActiveIndex] = useState(0);


  const chunkReviews = (arr: any[], size: number) => {
    const chunks = [];
    if (arr) {
      for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
      }
    }
    return chunks;
  };
  const desktopPages = chunkReviews(reviews || [], 4);

  const handleDesktopScroll = () => {
    if (desktopScrollRef.current) {
      const container = desktopScrollRef.current;
      const { scrollLeft, clientWidth } = container;
      const index = Math.round(scrollLeft / clientWidth);
      setDesktopActiveIndex(index);
    }
  };

  const scrollToDesktopPage = (index: number) => {
    if (desktopScrollRef.current) {
      const container = desktopScrollRef.current;
      container.scrollTo({
        left: index * container.clientWidth,
        behavior: "smooth"
      });
      setDesktopActiveIndex(index);
    }
  };

  const desktopScrollLeft = () => {
    const prevIndex = Math.max(0, desktopActiveIndex - 1);
    scrollToDesktopPage(prevIndex);
  };

  const desktopScrollRight = () => {
    const nextIndex = Math.min(desktopPages.length - 1, desktopActiveIndex + 1);
    scrollToDesktopPage(nextIndex);
  };


  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.author || !formData.quote || !formData.email) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        const data = await res.json();
        // Optimistically update frontend context
        updateContent({
          ...content,
          testimonialsData: [data.review, ...content.testimonialsData]
        }, true);
        setFormData({ author: "", email: "", location: "", journey: "", quote: "", rating: 5 });
        setIsSubmitted(true);
      }
    } catch (err) {
      console.error("Failed to add review", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const pageData = content.experiencesPage || {
    heroTitle: "Traveller Stories",
    heroSubtitle: "In Their Words",
    heroDescription: "We don't measure our success in journeys booked, but in stories created. Here is what our travellers have to say about their time with Route Story.",
    heroImage: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=630&fit=crop&auto=format"
  };

  const heroTitle = pageData.heroTitle;
  const heroSubtitle = pageData.heroSubtitle;
  const heroDescription = pageData.heroDescription;

  return (
    <>
      <SEO
        title="Reviews"
        description="Read stories and reviews from our travellers."
        ogImage={pageData.heroImage || "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=630&fit=crop&auto=format"}
      />

      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 lg:px-10 overflow-hidden bg-[var(--color-bg)]" style={{ backgroundColor: heroColors?.bg || undefined, color: heroColors?.text || undefined }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="max-w-7xl mx-auto text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-[11px] tracking-[0.35em] uppercase text-[var(--color-accent-secondary)] mb-5"
            style={{ fontFamily: "'Inter', sans-serif", color: heroColors?.text || undefined }}
          >
            {heroSubtitle}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="text-[var(--color-text-primary)] mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              lineHeight: 1.1,
              color: heroColors?.text || undefined
            }}
          >
            {heroTitle}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-[var(--color-text-primary)]/60 max-w-2xl mx-auto text-[15px] leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif", color: heroColors?.text ? `${heroColors.text}b2` : undefined }}
          >
            {heroDescription}
          </motion.p>
        </motion.div>
      </section>

      {/* Two Column Layout */}
      <section className="bg-[var(--color-bg-light)] py-20 px-6 lg:px-10 min-h-screen" style={{ backgroundColor: gridColors?.bg || undefined, color: gridColors?.text || undefined }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* Left Column: Form */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-[var(--brand-mist)] p-8 lg:p-10 shadow-sm border border-[var(--color-text-primary)]/5 rounded-2xl"
              style={{ borderColor: gridColors?.text ? `${gridColors.text}1a` : undefined }}
            >
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 flex flex-col items-center justify-center"
                >
                  <div className="w-16 h-16 bg-[var(--color-accent-primary)]/10 rounded-full flex items-center justify-center mb-6">
                    <Star className="fill-[#FFC107] text-[#FFC107] w-8 h-8" />
                  </div>
                  <h2
                    className="text-[var(--color-text-primary)] mb-3 text-center"
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "1.8rem", letterSpacing: "-0.02em", color: gridColors?.text || undefined }}
                  >
                    Story Submitted!
                  </h2>
                  <p
                    className="text-[var(--color-text-primary)]/60 mb-8 text-[14px] leading-relaxed text-center max-w-xs"
                    style={{ fontFamily: "'Inter', sans-serif", color: gridColors?.text ? `${gridColors.text}b2` : undefined }}
                  >
                    Thank you for sharing your experience. Your story has been submitted and email notifications have been dispatched.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="w-full bg-[var(--color-text-primary)] text-[var(--color-bg)] px-6 py-4 text-[12px] tracking-[0.2em] uppercase hover:bg-[var(--color-accent-primary)] hover:text-[var(--color-text-primary)] transition-colors duration-300 rounded-xl font-medium"
                    style={{ color: gridColors?.text ? 'var(--color-bg)' : undefined, backgroundColor: gridColors?.text || undefined }}
                  >
                    Write Another Story
                  </button>
                </motion.div>
              ) : (
                <>
                  <h2
                    className="text-[var(--color-text-primary)] mb-2"
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "1.8rem", letterSpacing: "-0.02em", color: gridColors?.text || undefined }}
                  >
                    Share Your Story
                  </h2>
                  <p
                    className="text-[var(--color-text-primary)]/60 mb-8 text-[13px] leading-relaxed"
                    style={{ fontFamily: "'Inter', sans-serif", color: gridColors?.text ? `${gridColors.text}b2` : undefined }}
                  >
                    We would love to hear about your experience with Route Story.
                  </p>

                  <form onSubmit={handleAddReview} className="space-y-6">
                    <div>
                      <label className="block text-[10px] tracking-[0.2em] uppercase text-[var(--color-text-primary)]/70 mb-2 font-medium" style={{ fontFamily: "'Inter', sans-serif", color: gridColors?.text || undefined }}>Name *</label>
                      <input
                        required
                        type="text"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        className="w-full bg-transparent border-b border-[var(--color-text-primary)]/20 py-2 text-[14px] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors text-gray-800"
                        style={{ borderColor: gridColors?.text ? `${gridColors.text}33` : undefined }}
                        placeholder="e.g. Priya Mehta"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-[0.2em] uppercase text-[var(--color-text-primary)]/70 mb-2 font-medium" style={{ fontFamily: "'Inter', sans-serif", color: gridColors?.text || undefined }}>Email *</label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-transparent border-b border-[var(--color-text-primary)]/20 py-2 text-[14px] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors text-gray-800"
                        style={{ borderColor: gridColors?.text ? `${gridColors.text}33` : undefined }}
                        placeholder="e.g. priya@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-[0.2em] uppercase text-[var(--color-text-primary)]/70 mb-2 font-medium" style={{ fontFamily: "'Inter', sans-serif", color: gridColors?.text || undefined }}>Location</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full bg-transparent border-b border-[var(--color-text-primary)]/20 py-2 text-[14px] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors text-gray-800"
                        style={{ borderColor: gridColors?.text ? `${gridColors.text}33` : undefined }}
                        placeholder="e.g. Mumbai"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] tracking-[0.2em] uppercase text-[var(--color-text-primary)]/70 mb-2 font-medium" style={{ fontFamily: "'Inter', sans-serif", color: gridColors?.text || undefined }}>Journey</label>
                      <input
                        type="text"
                        value={formData.journey}
                        onChange={(e) => setFormData({ ...formData, journey: e.target.value })}
                        className="w-full bg-transparent border-b border-[var(--color-text-primary)]/20 py-2 text-[14px] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors text-gray-800"
                        style={{ borderColor: gridColors?.text ? `${gridColors.text}33` : undefined }}
                        placeholder="e.g. Rajasthan Circuit"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] tracking-[0.2em] uppercase text-[var(--color-text-primary)]/70 mb-2 font-medium" style={{ fontFamily: "'Inter', sans-serif", color: gridColors?.text || undefined }}>Your Story *</label>
                      <textarea
                        required
                        value={formData.quote}
                        onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                        rows={4}
                        className="w-full bg-transparent border-b border-[var(--color-text-primary)]/20 py-2 text-[14px] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-primary)] transition-colors resize-none text-gray-800"
                        style={{ borderColor: gridColors?.text ? `${gridColors.text}33` : undefined }}
                        placeholder="Tell us about your favourite moments..."
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] tracking-[0.2em] uppercase text-[var(--color-text-primary)]/70 mb-2 font-medium" style={{ fontFamily: "'Inter', sans-serif", color: gridColors?.text || undefined }}>Rating</label>
                      <div className="flex gap-1 py-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setFormData({ ...formData, rating: star })}
                            className="focus:outline-none transition-transform hover:scale-110"
                          >
                            <Star
                              size={20}
                              className={star <= formData.rating ? "fill-[#FFC107] text-[#FFC107]" : "text-[var(--color-text-primary)]/20"}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[var(--color-text-primary)] text-[var(--color-bg)] px-6 py-4 text-[12px] tracking-[0.2em] uppercase hover:bg-[var(--color-accent-primary)] hover:text-[var(--color-text-primary)] transition-colors duration-300 disabled:opacity-50 mt-4 rounded-xl"
                      style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, color: gridColors?.text ? 'var(--color-bg)' : undefined, backgroundColor: gridColors?.text || undefined }}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Review"}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>

          {/* Right Column: Horizontal Page-based Carousel */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            {/* Desktop Page-based Carousel (2x2 Grid per slide) */}
            <div className="hidden md:flex flex-col justify-between h-full">
              {/* Header with Arrows on the right */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[12px] tracking-[0.25em] uppercase text-[var(--color-text-primary)]/40 font-semibold" style={{ fontFamily: "'Inter', sans-serif", color: gridColors?.text ? `${gridColors.text}66` : undefined }}>
                  Guest Reviews
                </h3>
                {desktopPages.length > 1 && (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={desktopScrollLeft}
                      className="w-10 h-10 border border-[var(--color-text-primary)]/10 rounded-full flex items-center justify-center hover:bg-[var(--color-accent-primary)]/10 text-[var(--color-text-primary)] transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
                      style={{ borderColor: gridColors?.text ? `${gridColors.text}1a` : undefined }}
                    >
                      <ChevronLeft size={18} style={{ color: gridColors?.text || undefined }} />
                    </button>
                    <button
                      onClick={desktopScrollRight}
                      className="w-10 h-10 border border-[var(--color-text-primary)]/10 rounded-full flex items-center justify-center hover:bg-[var(--color-accent-primary)]/10 text-[var(--color-text-primary)] transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
                      style={{ borderColor: gridColors?.text ? `${gridColors.text}1a` : undefined }}
                    >
                      <ChevronRight size={18} style={{ color: gridColors?.text || undefined }} />
                    </button>
                  </div>
                )}
              </div>

              <div className="relative">
                <div
                  ref={desktopScrollRef}
                  onScroll={handleDesktopScroll}
                  className="flex overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-hide"
                  style={{ scrollBehavior: "smooth" }}
                >
                  {desktopPages.map((page, pageIdx) => (
                    <div 
                      key={pageIdx}
                      className="w-full shrink-0 snap-start grid grid-cols-2 gap-6"
                    >
                      {page.map((review) => (
                        <ReviewCard key={review.id} review={review} gridColors={gridColors} />
                      ))}
                      {page.length < 4 && [...Array(4 - page.length)].map((_, i) => (
                        <div key={`empty-${i}`} className="opacity-0 pointer-events-none" />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop Navigation Dots */}
              {desktopPages.length > 1 && (
                <div className="flex justify-center items-center gap-6 mt-4">
                  <div className="flex gap-2">
                    {desktopPages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => scrollToDesktopPage(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                          desktopActiveIndex === index
                            ? "bg-[var(--color-accent-secondary)] w-6"
                            : "bg-[var(--color-text-primary)]/20 hover:bg-[var(--color-text-primary)]/40"
                        } cursor-pointer`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Vertical List */}
            <div className="flex flex-col md:hidden mt-8">
              <h3 className="text-[11px] tracking-[0.25em] uppercase text-[var(--color-text-primary)]/40 font-semibold mb-6" style={{ fontFamily: "'Inter', sans-serif", color: gridColors?.text ? `${gridColors.text}66` : undefined }}>
                Guest Reviews
              </h3>
              <div className="flex flex-col gap-6">
                {(reviews || []).map((review) => (
                  <div key={review.id} className="w-full">
                    <ReviewCard review={review} gridColors={gridColors} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
