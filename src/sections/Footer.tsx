import { ExternalLink } from "@/components/ui/ExternalLink";
import { creditOrder, photos } from "@/data/photos";
import { about } from "@/data/trip";

export function Footer() {
  return (
    <footer className="border-t border-line py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="kicker text-terra">{about.kicker}</p>
        <h2 className="mt-2 text-3xl font-medium tracking-tight sm:text-4xl">{about.title}</h2>
        <p className="mt-5 max-w-3xl leading-relaxed text-ink-soft">{about.body}</p>
        <ul className="mt-10 columns-1 gap-x-10 sm:columns-2 lg:columns-3">
          {creditOrder.map((id) => {
            const photo = photos[id];
            return (
              <li key={id} className="mb-4 break-inside-avoid text-sm leading-snug text-ink-soft">
                {photo.creditLabel} — {photo.artist},{" "}
                <ExternalLink href={photo.license.url}>{photo.license.name}</ExternalLink>,{" "}
                <ExternalLink href={photo.fileUrl}>{photo.fileLabel}</ExternalLink>
              </li>
            );
          })}
        </ul>
        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-ink-soft">{about.otherSources}</p>
      </div>
    </footer>
  );
}
