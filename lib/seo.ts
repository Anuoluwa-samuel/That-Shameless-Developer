import type { Metadata } from "next";
import { site } from "./site";

type Input = {
  title: string;
  description: string;
  /** Path starting with "/", resolved against metadataBase. */
  path: string;
  type?: "website" | "article";
};

/** Title, description, canonical, Open Graph and Twitter in one place so pages can't drift apart. */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: Input): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type,
      siteName: site.name,
      locale: "en_GB",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
