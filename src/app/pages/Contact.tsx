import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SEO } from "../components/SEO";
import { useCMS } from "../context/CMSContext";
import { Mail, Phone, MapPin, MessageCircle, ChevronDown, ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    travelDate: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send enquiry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-20"
      >
        <div className="w-16 h-16 border border-[var(--color-accent-secondary)] flex items-center justify-center mx-auto mb-8">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 12l5 5L19 7" stroke="var(--color-accent-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3
          className="text-[var(--color-text-primary)] mb-4"
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "1.6rem" }}
        >
          Your Story Begins Here
        </h3>
        <p
          className="text-[var(--color-text-primary)]/55 max-w-sm mx-auto text-[14px] leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          We've received your enquiry and will reach out within 24 hours to begin crafting your journey.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            className="block text-[11px] tracking-[0.2em] uppercase text-[var(--color-text-primary)]/50 mb-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Full Name *
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full bg-transparent border-b border-[var(--color-text-primary)]/20 py-3 text-[14px] text-[var(--color-text-primary)] placeholder-[var(--color-text-primary)]/30 focus:outline-none focus:border-[var(--color-text-primary)] transition-colors"
            style={{ fontFamily: "'Inter', sans-serif" }}
            placeholder="Your name"
          />
        </div>
        <div>
          <label
            className="block text-[11px] tracking-[0.2em] uppercase text-[var(--color-text-primary)]/50 mb-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Email Address *
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full bg-transparent border-b border-[var(--color-text-primary)]/20 py-3 text-[14px] text-[var(--color-text-primary)] placeholder-[var(--color-text-primary)]/30 focus:outline-none focus:border-[var(--color-text-primary)] transition-colors"
            style={{ fontFamily: "'Inter', sans-serif" }}
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            className="block text-[11px] tracking-[0.2em] uppercase text-[var(--color-text-primary)]/50 mb-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Phone Number
          </label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-[var(--color-text-primary)]/20 py-3 text-[14px] text-[var(--color-text-primary)] placeholder-[var(--color-text-primary)]/30 focus:outline-none focus:border-[var(--color-text-primary)] transition-colors"
            style={{ fontFamily: "'Inter', sans-serif" }}
            placeholder="+91 98765 43210"
          />
        </div>
        <div>
          <label
            className="block text-[11px] tracking-[0.2em] uppercase text-[var(--color-text-primary)]/50 mb-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Preferred Destination
          </label>
          <input
            list="destinations-list"
            name="destination"
            value={form.destination}
            onChange={handleChange}
            placeholder="Select or type a destination"
            className="w-full bg-transparent border-b border-[var(--color-text-primary)]/20 py-3 text-[14px] text-[var(--color-text-primary)] placeholder-[var(--color-text-primary)]/30 focus:outline-none focus:border-[var(--color-text-primary)] transition-colors"
            style={{ fontFamily: "'Inter', sans-serif" }}
          />
          <datalist id="destinations-list">
            <option value="North India" />
            <option value="South India" />
            <option value="East India" />
            <option value="West India" />
            <option value="North-East India" />
            <option value="Pan India" />
            <option value="Not sure yet" />
          </datalist>
        </div>
      </div>

      <div>
        <label
          className="block text-[11px] tracking-[0.2em] uppercase text-[var(--color-text-primary)]/50 mb-2"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Intended Travel Date
        </label>
        <input
          name="travelDate"
          type="date"
          value={form.travelDate}
          onChange={handleChange}
          className="w-full bg-transparent border-b border-[var(--color-text-primary)]/20 py-3 text-[14px] text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-text-primary)] transition-colors"
          style={{ fontFamily: "'Inter', sans-serif" }}
        />
      </div>

      <div>
        <label
          className="block text-[11px] tracking-[0.2em] uppercase text-[var(--color-text-primary)]/50 mb-2"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Tell Us Your Story
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={5}
          className="w-full bg-transparent border-b border-[var(--color-text-primary)]/20 py-3 text-[14px] text-[var(--color-text-primary)] placeholder-[var(--color-text-primary)]/30 focus:outline-none focus:border-[var(--color-text-primary)] transition-colors resize-none"
          style={{ fontFamily: "'Inter', sans-serif" }}
          placeholder="What kind of journey are you dreaming of? Any specific experiences, places, or feelings you want to capture?"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="group flex items-center gap-3 bg-[var(--color-text-primary)] text-white px-8 py-4 text-[12px] tracking-[0.25em] uppercase hover:bg-[var(--color-accent-primary)] hover:text-[var(--color-text-primary)] transition-all duration-300 mt-4 disabled:opacity-50"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {isSubmitting ? "Sending..." : "Send My Enquiry"}
        <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
      </button>
    </form>
  );
}

function FAQItem({ q, a, index, customTextColor }: { q: string; a: string; index: number; customTextColor?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="border-b border-[var(--color-text-primary)]/10"
      style={{ borderColor: customTextColor ? `${customTextColor}1a` : undefined }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span
          className="text-[var(--color-text-primary)] text-[15px] group-hover:text-[var(--color-accent-secondary)] transition-colors duration-200"
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500, color: customTextColor || undefined }}
        >
          {q}
        </span>
        <ChevronDown
          size={16}
          className={`text-[var(--color-accent-secondary)] flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p
              className="text-[var(--color-text-primary)]/60 text-[14px] leading-relaxed pb-6"
              style={{ fontFamily: "'Inter', sans-serif", color: customTextColor ? `${customTextColor}99` : undefined }}
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Contact() {
  const { content } = useCMS();
  const faqs = content.faqsData;
  const contactData = content.contactPage;
  const globalData = content.global;

  const heroColors = content.sectionColors?.contact?.hero;
  const formColors = content.sectionColors?.contact?.form;
  const whatsappColors = content.sectionColors?.contact?.whatsappBox;
  const whatsappButtonColors = content.sectionColors?.contact?.whatsappButton;
  const faqColors = content.sectionColors?.contact?.faq;

  return (
    <>
      <SEO
        title="Contact Us"
        description="Reach out to Route Story and let's craft your next unforgettable journey across India."
        ogImage="https://images.unsplash.com/photo-1544015759-237f57b15e11?w=1200&h=630&fit=crop&auto=format"
      />

      {/* Hero */}
      <section className="pt-40 pb-16 px-6 lg:px-10 bg-[var(--color-bg)]" style={{ backgroundColor: heroColors?.bg || undefined, color: heroColors?.text || undefined }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="max-w-7xl mx-auto"
        >
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-[11px] tracking-[0.35em] uppercase text-[var(--color-accent-secondary)] mb-5"
            style={{ fontFamily: "'Inter', sans-serif", color: heroColors?.text || undefined }}
          >
            {contactData.heroSubtitle}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.8 }}
            className="text-[var(--color-text-primary)] max-w-2xl"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              lineHeight: 1.1,
              color: heroColors?.text || undefined
            }}
          >
            {contactData.heroTitle}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.9 }}
            className="text-[var(--color-text-primary)]/70 max-w-2xl mt-6 text-lg"
            style={{ color: heroColors?.text ? `${heroColors.text}d4` : undefined }}
          >
            {contactData.heroDescription}
          </motion.p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="bg-[var(--color-bg)] pb-28 px-6 lg:px-10" style={{ backgroundColor: formColors?.bg || undefined, color: formColors?.text || undefined }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2
              className="text-[var(--color-text-primary)] mb-10"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "1.8rem", color: formColors?.text || undefined }}
            >
              Customize Your Trip
            </h2>
            <ContactForm />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-10"
          >
            {/* WhatsApp CTA */}
            <div className="bg-[var(--color-text-primary)] p-8" style={{ backgroundColor: whatsappColors?.bg || undefined, color: whatsappColors?.text || undefined }}>
              <p
                className="text-[11px] tracking-[0.3em] uppercase text-[var(--color-accent-secondary)] mb-3"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Prefer to chat?
              </p>
              <h3
                className="text-white mb-4"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: "1.3rem", color: whatsappColors?.text || undefined }}
              >
                Reach Us on WhatsApp
              </h3>
              <a
                href={`https://wa.me/${globalData.contactPhone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-[var(--color-accent-primary)] text-[var(--color-text-primary)] px-6 py-3 text-[12px] tracking-[0.2em] uppercase hover:bg-white hover:text-[var(--color-text-primary)] transition-all duration-300"
                style={{ fontFamily: "'Inter', sans-serif", backgroundColor: whatsappButtonColors?.bg || undefined, color: whatsappButtonColors?.text || undefined }}
              >
                <MessageCircle size={14} />
                Chat on WhatsApp
              </a>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex gap-5 items-start">
                <div className="w-10 h-10 border border-[var(--color-bg-light)] flex items-center justify-center flex-shrink-0 mt-0.5" style={{ borderColor: formColors?.text ? `${formColors.text}1a` : undefined }}>
                  <Mail size={14} className="text-[var(--color-accent-secondary)]" />
                </div>
                <div>
                  <p
                    className="text-[11px] tracking-[0.2em] uppercase text-[var(--color-accent-secondary)] mb-1"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Email
                  </p>
                  <a
                    href={`mailto:${globalData.contactEmail}`}
                    className="text-[var(--color-text-primary)] text-[15px] hover:text-[var(--color-accent-secondary)] transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif", color: formColors?.text || undefined }}
                  >
                    {globalData.contactEmail}
                  </a>
                </div>
              </div>

              <div className="flex gap-5 items-start">
                <div className="w-10 h-10 border border-[var(--color-bg-light)] flex items-center justify-center flex-shrink-0 mt-0.5" style={{ borderColor: formColors?.text ? `${formColors.text}1a` : undefined }}>
                  <Phone size={14} className="text-[var(--color-accent-secondary)]" />
                </div>
                <div>
                  <p
                    className="text-[11px] tracking-[0.2em] uppercase text-[var(--color-accent-secondary)] mb-1"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Phone
                  </p>
                  <a
                    href={`tel:${globalData.contactPhone.replace(/\s/g, '')}`}
                    className="text-[var(--color-text-primary)] text-[15px] hover:text-[var(--color-accent-secondary)] transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif", color: formColors?.text || undefined }}
                  >
                    {globalData.contactPhone}
                  </a>
                </div>
              </div>

              <div className="flex gap-5 items-start">
                <div className="w-10 h-10 border border-[var(--color-bg-light)] flex items-center justify-center flex-shrink-0 mt-0.5" style={{ borderColor: formColors?.text ? `${formColors.text}1a` : undefined }}>
                  <MapPin size={14} className="text-[var(--color-accent-secondary)]" />
                </div>
                <div>
                  <p
                    className="text-[11px] tracking-[0.2em] uppercase text-[var(--color-accent-secondary)] mb-1"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Office
                  </p>
                  <p
                    className="text-[var(--color-text-primary)] text-[14px] leading-relaxed"
                    style={{ fontFamily: "'Inter', sans-serif", color: formColors?.text || undefined }}
                  >
                    {globalData.contactAddress}
                  </p>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--color-bg-light)] py-28 px-6 lg:px-10" style={{ backgroundColor: faqColors?.bg || undefined, color: faqColors?.text || undefined }}>
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            className="mb-14"
          >
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="text-[11px] tracking-[0.35em] uppercase text-[var(--color-accent-secondary)] mb-5"
              style={{ fontFamily: "'Inter', sans-serif", color: faqColors?.text || undefined }}
            >
              Frequently Asked
            </motion.p>
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="text-[var(--color-text-primary)]"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                color: faqColors?.text || undefined
              }}
            >
              Questions We're Asked Often
            </motion.h2>
          </motion.div>

          <div>
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} index={i} customTextColor={faqColors?.text} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
