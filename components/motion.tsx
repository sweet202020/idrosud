import type { ReactNode } from "react";

// Declarative marker; the shared ScrollExperience handles observation and cleanup.
export function RevealOnScroll({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div data-reveal className={className}>
      {children}
    </div>
  );
}
