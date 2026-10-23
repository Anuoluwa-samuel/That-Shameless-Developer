import { collection, config, fields, singleton } from "@keystatic/core";
import { PROJECT_STATUSES, PROJECT_TAGS } from "@/lib/schema";

const repo = process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO || undefined; // "owner/name"

// GitHub mode in production (edits become commits and trigger a redeploy). Set
// NEXT_PUBLIC_KEYSTATIC_STORAGE=github to use it from `npm run dev` too, e.g. for the one-time GitHub App setup.
const useGithub =
  repo !== undefined &&
  (process.env.NODE_ENV === "production" ||
    process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "github");

export default config({
  storage: useGithub
    ? { kind: "github", repo: repo as `${string}/${string}` }
    : { kind: "local" },
  ui: { brand: { name: "Ayomide — content" } },
  collections: {
    projects: collection({
      label: "Projects",
      slugField: "title",
      path: "content/projects/*",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        summary: fields.text({
          label: "Summary",
          description: "One line for cards and search results. Max 160 characters.",
          multiline: true,
          validation: { isRequired: true, length: { max: 160 } },
        }),
        status: fields.select({
          label: "Status",
          options: PROJECT_STATUSES.map((value) => ({ label: value, value })),
          defaultValue: "shipped",
        }),
        tags: fields.multiselect({
          label: "Tags",
          options: PROJECT_TAGS.map((value) => ({ label: value, value })),
        }),
        featured: fields.checkbox({ label: "Featured on home (first 3 by order)" }),
        order: fields.integer({ label: "Order (lower = earlier)", defaultValue: 100 }),
        date: fields.text({ label: "Date (YYYY-MM)", validation: { isRequired: true } }),
        role: fields.text({ label: "My role", validation: { isRequired: true } }),
        stack: fields.array(fields.text({ label: "Technology" }), {
          label: "Stack",
          itemLabel: (p) => p.value,
        }),
        metrics: fields.array(
          fields.object({
            label: fields.text({ label: "Label" }),
            value: fields.text({ label: "Value" }),
          }),
          {
            label: "Metrics (real numbers only)",
            itemLabel: (p) => p.fields.label.value,
          },
        ),
        links: fields.array(
          fields.object({
            label: fields.text({ label: "Label" }),
            href: fields.text({ label: "URL" }),
            kind: fields.select({
              label: "Kind",
              options: [
                { label: "Live site", value: "live" },
                { label: "Repository", value: "repo" },
                { label: "Docs", value: "docs" },
              ],
              defaultValue: "live",
            }),
          }),
          { label: "Links", itemLabel: (p) => p.fields.label.value },
        ),
        cover: fields.image({
          label: "Cover image",
          directory: "public/images/projects",
          publicPath: "/images/projects/",
        }),
        coverAlt: fields.text({ label: "Cover alt text" }),
        diagram: fields.text({
          label: "Architecture diagram (Mermaid source)",
          multiline: true,
        }),
        content: fields.mdx({
          label: "Case study",
          description:
            "Required H2 sections, in order: Overview, Problem, My role, Architecture, Key decisions & trade-offs, Results, What I'd do next, Stack, Links.",
          extension: "mdx",
        }),
      },
    }),
  },
  singletons: {
    site: singleton({
      label: "Site settings",
      path: "content/site",
      format: { data: "json" },
      schema: {
        name: fields.text({ label: "Full name" }),
        shortName: fields.text({ label: "Short name" }),
        handle: fields.text({ label: "Handle" }),
        role: fields.text({ label: "Role line" }),
        positioning: fields.text({ label: "Positioning", multiline: true }),
        location: fields.text({ label: "Location" }),
        email: fields.text({ label: "Public email" }),
        links: fields.object({
          github: fields.text({ label: "GitHub URL" }),
          linkedin: fields.text({ label: "LinkedIn URL" }),
        }),
        skills: fields.array(
          fields.object({
            group: fields.text({ label: "Group" }),
            items: fields.array(fields.text({ label: "Skill" }), {
              label: "Skills",
              itemLabel: (p) => p.value,
            }),
          }),
          { label: "Skills", itemLabel: (p) => p.fields.group.value },
        ),
        story: fields.text({
          label: "About story",
          description: "Paragraphs separated by a blank line.",
          multiline: true,
        }),
        education: fields.array(
          fields.object({
            school: fields.text({ label: "School" }),
            degree: fields.text({ label: "Degree" }),
            period: fields.text({ label: "Period" }),
            note: fields.text({ label: "Note", multiline: true }),
          }),
          { label: "Education", itemLabel: (p) => p.fields.school.value },
        ),
        experience: fields.array(
          fields.object({
            role: fields.text({ label: "Role" }),
            org: fields.text({ label: "Organisation" }),
            period: fields.text({ label: "Period" }),
            summary: fields.text({ label: "Summary", multiline: true }),
          }),
          { label: "Experience (CV)", itemLabel: (p) => p.fields.role.value },
        ),
        howIWork: fields.array(
          fields.object({
            title: fields.text({ label: "Principle" }),
            text: fields.text({ label: "Explanation", multiline: true }),
          }),
          { label: "How I work", itemLabel: (p) => p.fields.title.value },
        ),
        leadership: fields.array(
          fields.object({
            title: fields.text({ label: "Title" }),
            org: fields.text({ label: "Organisation" }),
            period: fields.text({ label: "Period" }),
            summary: fields.text({ label: "Summary", multiline: true }),
          }),
          { label: "Leadership", itemLabel: (p) => p.fields.title.value },
        ),
      },
    }),
  },
});
