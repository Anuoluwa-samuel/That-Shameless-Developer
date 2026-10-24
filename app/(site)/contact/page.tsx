import type { Metadata } from "next";
import ContactWithGlobe from "@/components/ui/contact-with-globe";
import { contactCopy } from "@/lib/contact-copy";
import { clean } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Get in touch about graduate full-stack or ML roles, or a freelance project.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <ContactWithGlobe
      titleAs="h1"
      subtitle={contactCopy.subtitle}
      title={contactCopy.title}
      description={contactCopy.description}
      email={clean(site.email)}
      github={clean(site.links.github)}
      linkedin={clean(site.links.linkedin)}
      location={site.location}
    />
  );
}
