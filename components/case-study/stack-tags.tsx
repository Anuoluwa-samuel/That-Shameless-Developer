export function StackTags({ stack }: { stack: string[] }) {
  if (stack.length === 0) return null;
  return (
    <ul className="my-6 flex flex-wrap gap-2" aria-label="Technologies used">
      {stack.map((tech) => (
        <li key={tech} className="border-border border px-3 py-1 font-mono text-xs">
          {tech}
        </li>
      ))}
    </ul>
  );
}
