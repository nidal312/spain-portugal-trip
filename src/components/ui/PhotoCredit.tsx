import { photos, type PhotoId } from "@/data/photos";
import { cn } from "@/lib/cn";
import { ExternalLink } from "./ExternalLink";

interface PhotoCreditProps {
  id: PhotoId;
  className?: string;
  /** Prefix the caption (e.g. "Gothic Quarter.") before the credit. */
  withCaption?: boolean;
  tone?: "default" | "light";
}

export function PhotoCredit({ id, className, withCaption = true, tone = "default" }: PhotoCreditProps) {
  const p = photos[id];
  return (
    <p
      className={cn(
        "text-[0.72rem] leading-snug",
        tone === "light" ? "text-paper/80 [&_a]:!text-paper [&_a]:!decoration-paper/50" : "text-ink-soft",
        className,
      )}
    >
      {withCaption && <>{p.caption}. </>}
      Photo: {p.artist}, <ExternalLink href={p.license.url}>{p.license.name}</ExternalLink>,{" "}
      <ExternalLink href={p.fileUrl}>Wikimedia Commons</ExternalLink>.
    </p>
  );
}
