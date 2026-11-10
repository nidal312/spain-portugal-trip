import type { AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function ExternalLink({ className, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a target="_blank" rel="noopener noreferrer" className={cn("prose-link", className)} {...props}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
