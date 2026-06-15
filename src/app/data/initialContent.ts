import { destinations, experiences, featuredJourneys, testimonials, teamMembers, faqs } from "./index";
import { defaultTheme } from "./theme";

// Map default fields for destinations if not present
// Flatten all destinations from regions in index.ts and map their default fields
const allDests = Object.keys(destinations).flatMap((region) => {
  return (destinations as any)[region].map((dest: any) => ({
    price: "18500",
    duration: "6 Days / 5 Nights",
    difficulty: "Moderate",
    ...dest
  }));
});

// Group them by category
const mappedDestinations = allDests.reduce((acc: any, dest: any) => {
  const category = (dest.tag || "other").toLowerCase();
  if (!acc[category]) {
    acc[category] = [];
  }
  acc[category].push(dest);
  return acc;
}, {} as any);

// Map default fields for featured journeys if not present
const mappedFeaturedJourneys = featuredJourneys.map((j: any) => ({
  description: `Embark on a beautifully curated ${j.duration.toLowerCase()} journey focusing on the essence of ${j.category.toLowerCase()}. This signature route is designed to immerse you deeply in the local culture, landscape, and untold stories of the region. Every day unfolds a new chapter, carefully balanced with exploration and luxurious tranquility.`,
  ...j
}));

export const initialSiteContent = {
  home: {
    hero: {
      subtitle: "Premium Travel Experiences · India",
      title1: "Discover India Through",
      titleHighlight: "Stories",
      title2: ", Not Just Destinations",
      description: "Curated journeys across mountains, deserts, forests, beaches, heritage cities, sacred destinations, and hidden gems.",
      image: "https://res.cloudinary.com/dz9pqjbrx/image/upload/v1781030429/WhatsApp_Image_2026-06-10_at_12.09.11_AM_xdafvb.jpg"
    },
    why: {
      subtitle: "Why Route Story",
      title: "Travel Designed Around You, Not a Catalogue",
      cards: [
        {
          title: "Curated Experiences",
          description: "Handpicked journeys designed around meaningful experiences rather than generic itineraries. Every stop earns its place in your story."
        },
        {
          title: "Local Experts",
          description: "Insights from people who truly know every destination — not just the famous landmarks, but the lanes, the flavours, the people behind the place."
        },
        {
          title: "Seamless Planning",
          description: "From the first conversation to the final farewell, every logistical detail is handled with quiet precision so your mind stays free."
        }
      ]
    },
    featuredJourneys: {
      subtitle: "Featured Journeys",
      title: "Stories Worth Living"
    },
    ourStory: {
      subtitle: "Our Story",
      title1: "Travel Is Not a Transaction.",
      title2: "It Is a Transformation.",
      p1: "We started Route Story because we believed the travel industry had forgotten something essential — that the point of a journey is not to arrive somewhere new, but to return home changed.",
      p2: "India has an extraordinary gift for transformation. Its mountains silence you. Its deserts humble you. Its ancient cities remind you how briefly you exist. Our job is simply to make space for that encounter.",
      image: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=800&h=1000&fit=crop&auto=format"
    },
    testimonials: {
      subtitle: "Traveller Stories"
    },
    cta: {
      subtitle: "Begin Here",
      title: "Let's Create Your Next Story",
      description: "Tell us what you dream of — and we will craft the journey around it.",
      image: "https://images.unsplash.com/photo-1469521669194-babb45599def?w=1800&h=800&fit=crop&auto=format"
    }
  },
  destinationsData: mappedDestinations,
  experiencesData: experiences,
  featuredJourneysData: mappedFeaturedJourneys,
  testimonialsData: testimonials,
  teamMembersData: teamMembers,
  faqsData: faqs,
  theme: defaultTheme,
  global: {
    logoText: "Route Story",
    logoSubtext: "ONE ROUTE, ENDLESS STORIES",
    contactEmail: "hello@routestory.com",
    contactPhone: "+91 9928375767",
    contactAddress: "HARIDWAR, UTTARKHAND",
    footerDescription: "Crafting meaningful journeys across the Indian subcontinent. We don't just plan trips; we curate stories.",
    privacyPolicy: "At Route Story, we take your privacy seriously. We collect personal information (such as name, email, phone number) only when you voluntarily submit it to request details about our travel packages. We do not sell or share your personal information with third parties except as necessary to provide you with services (e.g., hotel bookings, local transport coordination). All personal data is stored securely. We may update this policy from time to time, and changes will be posted on this page.",
    termsOfService: "By accessing or booking travel packages through Route Story, you agree to be bound by these Terms of Service. All bookings are subject to availability. To secure a booking, a deposit must be paid as outlined in your travel proposal. Cancellations and refunds are governed by the specific hotels, flight operators, and local vendors involved in your journey. Route Story acts as an agent to coordinate travel arrangements and is not liable for personal injury, property damage, or delays caused by third-party suppliers.",
    socialLinks: {
      instagram: "#",
      facebook: "#",
      twitter: "#",
      linkedin: "#",
      youtube: "#"
    }
  },
  destinationsPage: {
    heroTitle: "Regions of India",
    heroSubtitle: "Explore The Subcontinent",
    heroDescription: "From the snow-capped Himalayas in the North to the tropical backwaters of the South, discover the diverse landscapes and cultures that make India a world within a world.",
    heroImage: "https://images.unsplash.com/photo-1469521669194-babb45599def?w=1200&h=630&fit=crop&auto=format"
  },
  experiencesPage: {
    heroTitle: "Traveller Stories",
    heroSubtitle: "In Their Words",
    heroDescription: "We don't measure our success in journeys booked, but in stories created. Here is what our travellers have to say about their time with Route Story.",
    heroImage: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=630&fit=crop&auto=format"
  },
  aboutPage: {
    heroTitle: "Our Story",
    heroSubtitle: "The People Behind The Journeys",
    heroDescription: "We are a team of explorers, storytellers, and local experts dedicated to showing you the India we know and love.",
    whyWeStarted: {
      subtitle: "Why We Started",
      title: "Because India Deserves Better Than a Brochure",
      p1: "Rishabh Jain spent two decades as a photojournalist travelling India's most remote corners — not for glossy magazines, but for the love of what he found there. He watched the travel industry reduce this extraordinary country to a list of 'must-sees' and 'package deals' and felt a quiet, persistent outrage.",
      p2: "Route Story was born in 2018 from a single conviction: that the people who truly know a place — the dhow builders of Gujarat, the tea planters of Sikkim, the Brahmin cooks of Varanasi — are more valuable than any five-star concierge. We exist to make those introductions.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=700&h=900&fit=crop&auto=format",
      quote: "Travel should feel like a privilege, not a transaction. Every journey should leave you slightly different from when you began.",
      quoteAuthor: "Rishabh Jain, Founder"
    },
    vision: {
      subtitle: "Our Vision",
      title: "To Make India's Greatest Stories Accessible to Those Ready to Hear Them",
      description: "A world where the depth of travel matches the depth of the traveller — where journeys are measured not in kilometres but in conversations, in dawns, in meals shared with strangers who become friends."
    },
    mission: {
      subtitle: "Our Mission",
      title: "To Design Journeys That Honour the Complexity and Beauty of India",
      description: "Every itinerary we craft must pass a simple test: would we be proud to share it as a story, not just sell it as a service? If not, we start again."
    },
    stats: [
      { number: "2018", label: "Founded" },
      { number: "1,200+", label: "Journeys Crafted" },
      { number: "28", label: "States Covered" },
      { number: "98%", label: "Traveller Satisfaction" }
    ],
    teamSubtitle: "The Team",
    teamTitle: "Meet the Storytellers",
    ctaTitle: "Ready to Begin Your Story?"
  },
  contactPage: {
    heroTitle: "Get In Touch",
    heroSubtitle: "Customize Your Trip",
    heroDescription: "Whether you have a clear vision or just a vague dream of your next journey, we're here to listen and start crafting your story.",
    heroImage: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=900&h=800&fit=crop&auto=format"
  },
  sectionColors: {
    home: {
      hero: { bg: "", text: "" },
      why: { bg: "", text: "" },
      featured: { bg: "", text: "" },
      ourStory: { bg: "", text: "" },
      testimonials: { bg: "", text: "" },
      cta: { bg: "", text: "" }
    },
    destinations: {
      hero: { bg: "", text: "" },
      grid: { bg: "", text: "" },
      cta: { bg: "", text: "" }
    },
    experiences: {
      hero: { bg: "", text: "" },
      grid: { bg: "", text: "" }
    },
    about: {
      hero: { bg: "", text: "" },
      story: { bg: "", text: "" },
      vision: { bg: "", text: "" },
      mission: { bg: "", text: "" },
      team: { bg: "", text: "" },
      cta: { bg: "", text: "" }
    },
    contact: {
      hero: { bg: "", text: "" },
      form: { bg: "", text: "" },
      faq: { bg: "", text: "" }
    }
  }
};
