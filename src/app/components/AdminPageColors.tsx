import { useCMS } from "../context/CMSContext";

interface AdminPageColorsProps {
  pageKey: 'home' | 'destinations' | 'experiences' | 'about' | 'contact';
}

const pageSections: Record<string, { label: string; sections: { key: string; label: string }[] }> = {
  home: {
    label: "Home Page",
    sections: [
      { key: "hero", label: "Hero Section" },
      { key: "why", label: "Why Route Story" },
      { key: "featured", label: "Featured Journeys" },
      { key: "ourStory", label: "Our Story" },
      { key: "testimonials", label: "Testimonials" },
      { key: "cta", label: "CTA Section Overlay" },
    ]
  },
  destinations: {
    label: "Destinations Page",
    sections: [
      { key: "hero", label: "Hero Section" },
      { key: "grid", label: "Destinations List Grid" },
      { key: "cta", label: "Bottom CTA" },
    ]
  },
  experiences: {
    label: "Reviews Page",
    sections: [
      { key: "hero", label: "Hero Section" },
      { key: "grid", label: "Reviews List & Form Grid" },
    ]
  },
  about: {
    label: "About Page",
    sections: [
      { key: "hero", label: "Hero Section" },
      { key: "story", label: "Why We Started" },
      { key: "vision", label: "Vision" },
      { key: "mission", label: "Mission" },
      { key: "team", label: "Team Members List" },
      { key: "cta", label: "Bottom CTA" },
    ]
  },
  contact: {
    label: "Contact Page",
    sections: [
      { key: "hero", label: "Hero Section" },
      { key: "form", label: "Contact Form & Details" },
      { key: "faq", label: "FAQ Section" },
    ]
  }
};

export function AdminPageColors({ pageKey }: AdminPageColorsProps) {
  const { content, updateContent } = useCMS();

  const themeColors = content.theme?.colors || {
    background: "#FAF8F4",
    backgroundDark: "#2D2D2D",
    backgroundLight: "#E8EBEC",
    textPrimary: "#2D2D2D",
    textInverse: "#FFFFFF",
    accentPrimary: "#D8C7A1",
    accentSecondary: "#8F9E92",
  };

  const getSectionDefaults = (page: string, section: string, theme: any) => {
    const bg = theme.background || "#FAF8F4";
    const bgLight = theme.backgroundLight || "#E8EBEC";
    const bgDark = theme.backgroundDark || "#2D2D2D";
    const textPrimary = theme.textPrimary || "#2D2D2D";

    const defaults: Record<string, Record<string, { bg: string; text: string }>> = {
      home: {
        hero: { bg: "#000000", text: "#FFFFFF" },
        why: { bg: bg, text: textPrimary },
        featured: { bg: bgLight, text: textPrimary },
        ourStory: { bg: bg, text: textPrimary },
        testimonials: { bg: "#E5E7EB", text: textPrimary },
        cta: { bg: bgDark, text: "#FFFFFF" }
      },
      destinations: {
        hero: { bg: bg, text: textPrimary },
        grid: { bg: bg, text: textPrimary },
        cta: { bg: "#E2E4E6", text: "#000000" }
      },
      experiences: {
        hero: { bg: bg, text: textPrimary },
        grid: { bg: bgLight, text: textPrimary }
      },
      about: {
        hero: { bg: "#FAFAFA", text: "#000000" },
        story: { bg: "#E2E4E6", text: "#000000" },
        vision: { bg: "#FAFAFA", text: "#000000" },
        mission: { bg: "#FAFAFA", text: "#000000" },
        team: { bg: "#FFFFFF", text: "#000000" },
        cta: { bg: "#FFFFFF", text: "#000000" }
      },
      contact: {
        hero: { bg: bg, text: textPrimary },
        form: { bg: bg, text: textPrimary },
        faq: { bg: bgLight, text: textPrimary }
      }
    };

    return defaults[page]?.[section] || { bg: "#FFFFFF", text: "#000000" };
  };

  const pageMeta = pageSections[pageKey];
  const sectionColors = content.sectionColors || {};
  const pageColors = sectionColors[pageKey] || {};

  const handleSectionUpdate = (sectionKey: string, field: 'bg' | 'text', value: string) => {
    const updated = {
      ...sectionColors,
      [pageKey]: {
        ...pageColors,
        [sectionKey]: {
          ...(pageColors[sectionKey] || { bg: "", text: "" }),
          [field]: value
        }
      }
    };
    updateContent({
      ...content,
      sectionColors: updated
    });
  };

  const handleSectionReset = (sectionKey: string) => {
    const updated = {
      ...sectionColors,
      [pageKey]: {
        ...pageColors,
        [sectionKey]: {
          bg: "",
          text: ""
        }
      }
    };
    updateContent({
      ...content,
      sectionColors: updated
    });
  };

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 border-b pb-4 font-sans">Page Colors Settings</h3>
        <p className="mt-1 text-xs text-gray-500 font-sans">
          Customize individual background and text colors for each section of this page. Resetting will inherit colors from the global theme.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {pageMeta.sections.map((section) => {
          const bgValue = pageColors[section.key]?.bg || "";
          const textValue = pageColors[section.key]?.text || "";
          const defaultColors = getSectionDefaults(pageKey, section.key, themeColors);
          const bgPickerValue = bgValue || defaultColors.bg;
          const textPickerValue = textValue || defaultColors.text;

          return (
            <div key={section.key} className="p-4 border rounded-md bg-gray-50 space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-sm font-semibold text-gray-800 font-sans">{section.label}</span>
                <button
                  type="button"
                  onClick={() => handleSectionReset(section.key)}
                  className="text-[11px] text-red-600 hover:text-red-800 font-medium bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded transition-colors font-sans border border-red-100"
                >
                  Reset
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Background Color */}
                <div>
                  <label className="block text-[11px] font-medium text-gray-600 mb-1 font-sans">
                    Background Color {bgValue === "" && <span className="text-gray-400 font-normal font-sans">(Default: {defaultColors.bg})</span>}
                  </label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={bgPickerValue}
                      onChange={(e) => handleSectionUpdate(section.key, 'bg', e.target.value)}
                      className="w-8 h-8 rounded cursor-pointer border border-gray-300"
                    />
                    <input
                      type="text"
                      value={bgValue}
                      placeholder={`Inherited default: ${defaultColors.bg}`}
                      onChange={(e) => handleSectionUpdate(section.key, 'bg', e.target.value)}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs p-1.5 border uppercase font-mono bg-white"
                    />
                  </div>
                </div>

                {/* Text Color */}
                <div>
                  <label className="block text-[11px] font-medium text-gray-600 mb-1 font-sans">
                    Text Color {textValue === "" && <span className="text-gray-400 font-normal font-sans">(Default: {defaultColors.text})</span>}
                  </label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={textPickerValue}
                      onChange={(e) => handleSectionUpdate(section.key, 'text', e.target.value)}
                      className="w-8 h-8 rounded cursor-pointer border border-gray-300"
                    />
                    <input
                      type="text"
                      value={textValue}
                      placeholder={`Inherited default: ${defaultColors.text}`}
                      onChange={(e) => handleSectionUpdate(section.key, 'text', e.target.value)}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs p-1.5 border uppercase font-mono bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
