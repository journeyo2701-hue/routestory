import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { initialSiteContent } from "../data/initialContent";

export type SiteContent = typeof initialSiteContent;

interface CMSContextType {
  content: SiteContent;
  updateContent: (newContent: SiteContent, isAutosave?: boolean) => void;
  updateHomeHero: (data: Partial<SiteContent["home"]["hero"]>) => void;
  hasChanges: boolean;
  isSaving: boolean;
  saveStatus: 'success' | 'error' | null;
  setSaveStatus: React.Dispatch<React.SetStateAction<'success' | 'error' | null>>;
  saveChanges: () => Promise<void>;
  discardChanges: () => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export function CMSProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(initialSiteContent);
  const [dbContent, setDbContent] = useState<SiteContent>(initialSiteContent);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'success' | 'error' | null>(null);

  useEffect(() => {
    // Fetch initial content from backend
    fetch("/api/content")
      .then(res => {
        if (!res.ok) throw new Error("Content not found");
        return res.json();
      })
      .then(parsed => {
        const loadedContent = {
          ...initialSiteContent,
          ...parsed,
          global: {
            ...initialSiteContent.global,
            ...parsed.global,
            socialLinks: {
              ...initialSiteContent.global.socialLinks,
              ...(parsed.global?.socialLinks || {})
            }
          },
          aboutPage: {
            ...initialSiteContent.aboutPage,
            ...parsed.aboutPage
          },
          destinationsPage: {
            ...initialSiteContent.destinationsPage,
            ...parsed.destinationsPage
          },
          experiencesPage: {
            ...initialSiteContent.experiencesPage,
            ...parsed.experiencesPage
          },
          contactPage: {
            ...initialSiteContent.contactPage,
            ...parsed.contactPage
          },
          featuredJourneysData: parsed.featuredJourneysData?.length >= 10 
            ? parsed.featuredJourneysData.map((j: any, idx: number) => ({
                ...initialSiteContent.featuredJourneysData[idx],
                ...j
              }))
            : initialSiteContent.featuredJourneysData,
          destinationsData: parsed.destinationsData
            ? Array.from(
                new Set([
                  ...Object.keys(initialSiteContent.destinationsData),
                  ...Object.keys(parsed.destinationsData),
                ])
              ).reduce((acc, category) => {
                // Flatten all initial destinations for lookup by ID
                const allInitialDests = Object.values(initialSiteContent.destinationsData).flat() as any[];
                acc[category] = (parsed.destinationsData[category] || []).map((dest: any) => {
                  // Find the original destination from initialContent by ID to preserve itinerary & image
                  const original = allInitialDests.find((d: any) => d.id === dest.id) || {};
                  // Use DB image only if it's a custom upload (cloudinary/non-unsplash),
                  // otherwise always use the correct original image from initialContent
                  const isCustomImage = dest.image && !dest.image.includes('images.unsplash.com');
                  return {
                    price: "18500",
                    duration: "6 Days / 5 Nights",
                    difficulty: "Moderate",
                    ...original,   // base: full data including correct image & itinerary from initialContent
                    ...dest,       // override: DB saved fields (name, description, price, etc.)
                    // Preserve original image unless admin uploaded a custom one
                    image: isCustomImage ? dest.image : ((original as any).image || dest.image),
                    // Always prefer initialContent itinerary if DB one is missing/empty
                    itinerary: (dest.itinerary && dest.itinerary.length > 0)
                      ? dest.itinerary
                      : ((original as any).itinerary || []),
                  };
                });
                return acc;
              }, {} as any)
            : initialSiteContent.destinationsData,
          sectionColors: parsed.sectionColors
            ? Object.keys(initialSiteContent.sectionColors).reduce((acc, pageKey) => {
                const initialPageColors = (initialSiteContent.sectionColors as any)[pageKey];
                const parsedPageColors = (parsed.sectionColors as any)[pageKey] || {};
                
                acc[pageKey] = Object.keys(initialPageColors).reduce((secAcc, secKey) => {
                  secAcc[secKey] = {
                    ...initialPageColors[secKey],
                    ...(parsedPageColors[secKey] || {})
                  };
                  return secAcc;
                }, {} as any);
                return acc;
              }, {} as any)
            : initialSiteContent.sectionColors,
        };
        setContent(loadedContent);
        setDbContent(loadedContent);
      })
      .catch(e => {
        console.error("Failed to fetch CMS content from API, falling back to initial", e);
      });
  }, []);

  useEffect(() => {
    if (content.theme && content.theme.colors) {
      const root = document.documentElement;
      root.style.setProperty('--color-bg', content.theme.colors.background);
      root.style.setProperty('--color-bg-dark', content.theme.colors.backgroundDark);
      root.style.setProperty('--color-bg-light', content.theme.colors.backgroundLight);
      root.style.setProperty('--color-text-primary', content.theme.colors.textPrimary);
      root.style.setProperty('--color-text-inverse', content.theme.colors.textInverse);
      root.style.setProperty('--color-accent-primary', content.theme.colors.accentPrimary);
      root.style.setProperty('--color-accent-secondary', content.theme.colors.accentSecondary);
    }
  }, [content]);

  const updateContent = (newContent: SiteContent, isAutosave = false) => {
    setContent(newContent);
    if (isAutosave) {
      setDbContent(newContent);
    } else {
      setHasChanges(true);
    }
  };

  const saveChanges = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    try {
      const token = localStorage.getItem("rs_admin_token");
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify(content)
      });
      if (res.ok) {
        setDbContent(content);
        setHasChanges(false);
        setSaveStatus('success');
      } else {
        setSaveStatus('error');
      }
    } catch (err) {
      console.error("Failed to push content to backend", err);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const discardChanges = () => {
    setContent(dbContent);
    setHasChanges(false);
    setSaveStatus(null);
  };

  const updateHomeHero = (data: Partial<SiteContent["home"]["hero"]>) => {
    updateContent({
      ...content,
      home: {
        ...content.home,
        hero: {
          ...content.home.hero,
          ...data
        }
      }
    });
  };

  return (
    <CMSContext.Provider value={{ 
      content, 
      updateContent, 
      updateHomeHero, 
      hasChanges, 
      isSaving, 
      saveStatus, 
      setSaveStatus,
      saveChanges, 
      discardChanges 
    }}>
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error("useCMS must be used within a CMSProvider");
  }
  return context;
}
