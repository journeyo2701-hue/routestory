import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  ogImage?: string;
}

export function SEO({ title, description, ogImage = "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1200&h=630&fit=crop&auto=format" }: SEOProps) {
  useEffect(() => {
    document.title = title === "Route Story" ? "Route Story" : `${title} | Route Story`;

    const setMeta = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        if (property) el.setAttribute("property", name);
        else el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("og:title", `${title} | Route Story`, true);
    setMeta("og:description", description, true);
    setMeta("og:image", ogImage, true);
    setMeta("og:type", "website", true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", `${title} | Route Story`);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImage);
  }, [title, description, ogImage]);

  return null;
}
