import "server-only";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

/** Renders a case-study body. Plain Markdown/MDX only: no custom components to maintain. */
export function Prose({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      options={{
        mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] },
      }}
    />
  );
}
