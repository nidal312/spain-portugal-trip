import { Fragment, type ReactNode } from "react";
import { ExternalLink } from "@/components/ui/ExternalLink";

/**
 * Inline rich text used by the content modules. Supported markup:
 * `**bold**`, `*italic*`, `==highlight==` and `[label](https://…)`.
 */
export type Rich = string;

const TOKEN =
  /(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|==[^=]+==|\[[^\]]+\]\((?:[^()\s]|\([^()\s]*\))+\))/g;
const LINK = /^\[([^\]]+)\]\((.+)\)$/;

function renderRich(text: Rich): ReactNode {
  const parts = text.split(TOKEN).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("==") && part.endsWith("==")) {
      return (
        <mark key={i} className="rounded-sm bg-olive/12 px-1 font-semibold text-olive-deep">
          {part.slice(2, -2)}
        </mark>
      );
    }
    const link = LINK.exec(part);
    if (link) {
      return (
        <ExternalLink key={i} href={link[2] ?? ""}>
          {link[1]}
        </ExternalLink>
      );
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export function RichText({ children }: { children: Rich }) {
  return <>{renderRich(children)}</>;
}
