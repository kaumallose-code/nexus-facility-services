import { useEffect } from "react";

type PageMetaProps = {
  title: string;
  description: string;
  canonicalPath: string;
  keywords?: string;
};

const SITE_ORIGIN = "https://www.nexusfacility.au";

function upsertMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

export default function PageMeta({ title, description, canonicalPath, keywords }: PageMetaProps) {
  useEffect(() => {
    const canonicalUrl = `${SITE_ORIGIN}${canonicalPath}`;
    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");
    if (keywords) upsertMeta("name", "keywords", keywords);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", "Nexus Facility Group");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:card", "summary_large_image");

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }, [canonicalPath, description, keywords, title]);

  return null;
}
