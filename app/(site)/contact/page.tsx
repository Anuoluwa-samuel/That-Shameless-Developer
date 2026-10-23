import type { Metadata } from "next";
import ContactWithGlobe from "@/components/ui/contact-with-globe";
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
      subtitle="Contact"
      title="Let's talk"
      description="Hiring for a graduate full-stack or ML role, or have something to build? Tell me what you need and I'll reply."
      email={clean(site.email)}
      github={clean(site.links.github)}
      linkedin={clean(site.links.linkedin)}
      location={site.location}
    />
  );
}
