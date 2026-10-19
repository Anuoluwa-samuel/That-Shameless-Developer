import type { ElementType, ReactNode } from "react";

type Props = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

export function Container({ as: Tag = "div", className = "", children }: Props) {
  return (
    <Tag className={`max-w-page mx-auto w-full px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </Tag>
  );
}
