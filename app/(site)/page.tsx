import { ContactCTA } from "@/components/home/contact-cta";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { Hero } from "@/components/home/hero";
import { LeadershipBlock } from "@/components/home/leadership-block";
import { SkillsStrip } from "@/components/home/skills-strip";
import { JsonLd } from "@/components/seo/json-ld";
import { getFeaturedProjects } from "@/lib/content";
import { personJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";

export default async function HomePage() {
  const featured = await getFeaturedProjects(3);
  return (
    <>
      <JsonLd data={personJsonLd()} />
      <Hero />
      <FeaturedProjects projects={featured} />
      <SkillsStrip skills={site.skills} />
      <LeadershipBlock leadership={site.leadership} />
      <ContactCTA />
    </>
  );
}
