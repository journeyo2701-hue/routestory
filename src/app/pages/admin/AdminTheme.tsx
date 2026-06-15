import { useState } from "react";
import { useCMS } from "../../context/CMSContext";

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

const getSectionDefaults = (pageKey: string, sectionKey: string, theme: any) => {
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

  return defaults[pageKey]?.[sectionKey] || { bg: "#FFFFFF", text: "#000000" };
};

export default function AdminTheme() {
  const { content, updateContent } = useCMS();
  const [activeTab, setActiveTab] = useState<'global' | 'sections'>('global');
  const [selectedPage, setSelectedPage] = useState<'home' | 'destinations' | 'experiences' | 'about' | 'contact'>('home');

  // Handle case where theme might not exist in older local storage saves
  const themeColors = content.theme?.colors || {
    background: "#FAF8F4",
    backgroundDark: "#2D2D2D",
    backgroundLight: "#E8EBEC",
    textPrimary: "#2D2D2D",
    textInverse: "#FFFFFF",
    accentPrimary: "#D8C7A1",
    accentSecondary: "#8F9E92",
  };

  const handleUpdate = (field: string, value: string) => {
    updateContent({
      ...content,
      theme: {
        ...content.theme,
        colors: {
          ...themeColors,
          [field]: value
        }
      }
    });
  };

  const sectionColors = content.sectionColors || {};
  const pageColors = sectionColors[selectedPage] || {};

  const handleSectionUpdate = (sectionKey: string, field: 'bg' | 'text', value: string) => {
    const updated = {
      ...sectionColors,
      [selectedPage]: {
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
      [selectedPage]: {
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
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 font-sans">Theme & Styles</h2>
          <p className="mt-1 text-sm text-gray-500 font-sans">
            Customize the global color palette and section-wise styling of the website.
          </p>
        </div>
        
        {/* Tabs */}
        <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
          <button
            onClick={() => setActiveTab('global')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'global'
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Global Palette
          </button>
          <button
            onClick={() => setActiveTab('sections')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'sections'
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            Section Colors
          </button>
        </div>
      </div>

      {activeTab === 'global' ? (
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 space-y-6">
          <h3 className="text-lg font-medium text-gray-900">Global Color Palette</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Background Colors */}
            <div className="space-y-3 p-4 border rounded-md">
              <h4 className="font-semibold text-gray-700">Backgrounds</h4>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Primary Background</label>
                <div className="flex gap-2 items-center">
                  <input type="color" value={themeColors.background} onChange={(e) => handleUpdate("background", e.target.value)} className="w-8 h-8 rounded cursor-pointer" />
                  <input type="text" value={themeColors.background} onChange={(e) => handleUpdate("background", e.target.value)} className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-1.5 border uppercase" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Dark Background</label>
                <div className="flex gap-2 items-center">
                  <input type="color" value={themeColors.backgroundDark} onChange={(e) => handleUpdate("backgroundDark", e.target.value)} className="w-8 h-8 rounded cursor-pointer" />
                  <input type="text" value={themeColors.backgroundDark} onChange={(e) => handleUpdate("backgroundDark", e.target.value)} className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-1.5 border uppercase" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Light Alternate</label>
                <div className="flex gap-2 items-center">
                  <input type="color" value={themeColors.backgroundLight} onChange={(e) => handleUpdate("backgroundLight", e.target.value)} className="w-8 h-8 rounded cursor-pointer" />
                  <input type="text" value={themeColors.backgroundLight} onChange={(e) => handleUpdate("backgroundLight", e.target.value)} className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-1.5 border uppercase" />
                </div>
              </div>
            </div>

            {/* Text Colors */}
            <div className="space-y-3 p-4 border rounded-md">
              <h4 className="font-semibold text-gray-700">Typography</h4>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Primary Text</label>
                <div className="flex gap-2 items-center">
                  <input type="color" value={themeColors.textPrimary} onChange={(e) => handleUpdate("textPrimary", e.target.value)} className="w-8 h-8 rounded cursor-pointer" />
                  <input type="text" value={themeColors.textPrimary} onChange={(e) => handleUpdate("textPrimary", e.target.value)} className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-1.5 border uppercase" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Inverse Text (on dark bg)</label>
                <div className="flex gap-2 items-center">
                  <input type="color" value={themeColors.textInverse} onChange={(e) => handleUpdate("textInverse", e.target.value)} className="w-8 h-8 rounded cursor-pointer" />
                  <input type="text" value={themeColors.textInverse} onChange={(e) => handleUpdate("textInverse", e.target.value)} className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-1.5 border uppercase" />
                </div>
              </div>
            </div>

            {/* Accent Colors */}
            <div className="space-y-3 p-4 border rounded-md">
              <h4 className="font-semibold text-gray-700">Accents</h4>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Primary Accent (Gold/Highlight)</label>
                <div className="flex gap-2 items-center">
                  <input type="color" value={themeColors.accentPrimary} onChange={(e) => handleUpdate("accentPrimary", e.target.value)} className="w-8 h-8 rounded cursor-pointer" />
                  <input type="text" value={themeColors.accentPrimary} onChange={(e) => handleUpdate("accentPrimary", e.target.value)} className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-1.5 border uppercase" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Secondary Accent (Green/Subtle)</label>
                <div className="flex gap-2 items-center">
                  <input type="color" value={themeColors.accentSecondary} onChange={(e) => handleUpdate("accentSecondary", e.target.value)} className="w-8 h-8 rounded cursor-pointer" />
                  <input type="text" value={themeColors.accentSecondary} onChange={(e) => handleUpdate("accentSecondary", e.target.value)} className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border uppercase" />
                </div>
              </div>
            </div>

          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Page Selector */}
          <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 font-sans">Select Website Page</label>
              <p className="text-xs text-gray-500 font-sans">Pick a page to configure individual colors for its sections.</p>
            </div>
            <select
              value={selectedPage}
              onChange={(e) => setSelectedPage(e.target.value as any)}
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border min-w-[200px] bg-white text-gray-800 font-medium"
            >
              {Object.entries(pageSections).map(([key, page]) => (
                <option key={key} value={key}>
                  {page.label}
                </option>
              ))}
            </select>
          </div>

          {/* Section list */}
          <div className="space-y-6">
            {pageSections[selectedPage].sections.map((section) => {
              const bgValue = pageColors[section.key]?.bg || "";
              const textValue = pageColors[section.key]?.text || "";
              const defaultColors = getSectionDefaults(selectedPage, section.key, themeColors);
              const bgPickerValue = bgValue || defaultColors.bg;
              const textPickerValue = textValue || defaultColors.text;

              return (
                <div key={section.key} className="bg-white shadow-sm rounded-lg border border-gray-200 p-6 space-y-4">
                  <div className="flex justify-between items-center border-b pb-4">
                    <h3 className="text-base font-semibold text-gray-900 font-sans">{section.label}</h3>
                    <button
                      onClick={() => handleSectionReset(section.key)}
                      className="text-xs text-red-600 hover:text-red-800 font-medium bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded transition-colors cursor-pointer font-sans"
                    >
                      Reset to Default
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Background Color */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5 font-sans">
                        Background Color {bgValue === "" && <span className="text-gray-400 font-normal font-sans">(Default: {defaultColors.bg})</span>}
                      </label>
                      <div className="flex gap-2 items-center">
                        <input
                          type="color"
                          value={bgPickerValue}
                          onChange={(e) => handleSectionUpdate(section.key, 'bg', e.target.value)}
                          className="w-9 h-9 rounded cursor-pointer border border-gray-300"
                        />
                        <input
                          type="text"
                          value={bgValue}
                          placeholder={`Inherited default: ${defaultColors.bg}`}
                          onChange={(e) => handleSectionUpdate(section.key, 'bg', e.target.value)}
                          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border uppercase font-mono"
                        />
                      </div>
                    </div>

                    {/* Text Color */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5 font-sans">
                        Text Color {textValue === "" && <span className="text-gray-400 font-normal font-sans">(Default: {defaultColors.text})</span>}
                      </label>
                      <div className="flex gap-2 items-center">
                        <input
                          type="color"
                          value={textPickerValue}
                          onChange={(e) => handleSectionUpdate(section.key, 'text', e.target.value)}
                          className="w-9 h-9 rounded cursor-pointer border border-gray-300"
                        />
                        <input
                          type="text"
                          value={textValue}
                          placeholder={`Inherited default: ${defaultColors.text}`}
                          onChange={(e) => handleSectionUpdate(section.key, 'text', e.target.value)}
                          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border uppercase font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
