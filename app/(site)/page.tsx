import { ContactCTA } from "@/components/home/contact-cta";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { Hero } from "@/components/home/hero";
import { LeadershipBlock } from "@/components/home/leadership-block";
import { SkillsStrip } from "@/components/home/skills-strip";
import { getFeaturedProjects } from "@/lib/content";
import { site } from "@/lib/site";

export default async function HomePage() {
  const featured = await getFeaturedProjects(3);
  return (
    <>
      <Hero />
      <FeaturedProjects projects={featured} />
      <SkillsStrip skills={site.skills} />
      <LeadershipBlock leadership={site.leadership} />
      <ContactCTA />
    </>
  );
}
