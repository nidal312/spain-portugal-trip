import * as Collapsible from "@radix-ui/react-collapsible";
import { ChevronDown, Ticket } from "lucide-react";
import { useState } from "react";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { PhotoCredit } from "@/components/ui/PhotoCredit";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ZoomablePhoto } from "@/components/ui/ZoomablePhoto";
import { spots, spotsIntro, type Spot } from "@/data/spots";
import { cn } from "@/lib/cn";
import { RichText } from "@/lib/rich";
import { scrollToId } from "@/state/contexts";

function OpenSlotsButton({ slotId }: { slotId: string }) {
  return (
    <button
      type="button"
      onClick={() => scrollToId(slotId)}
      className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-1.5 text-sm text-paper transition hover:bg-ink-soft"
    >
      <Ticket aria-hidden="true" className="size-3.5" />
      Open slots
    </button>
  );
}

function SpotCard({ spot }: { spot: Spot }) {
  const [open, setOpen] = useState(true);
  return (
    <article className="flex flex-col overflow-hidden rounded-[1.75rem] border border-line bg-paper-2 shadow-card">
      {spot.photo ? (
        <figure>
          <ZoomablePhoto
            id={spot.photo}
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
            className="aspect-[3/2]"
          />
          <figcaption className="px-5 pt-2">
            <PhotoCredit id={spot.photo} />
          </figcaption>
        </figure>
      ) : (
        <div className="flex aspect-[3/2] items-end bg-sand px-5 py-6">
          <p className="font-display text-4xl leading-none text-terra/40 italic sm:text-5xl">{spot.name}</p>
        </div>
      )}
      <Collapsible.Root open={open} onOpenChange={setOpen} className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3 px-5 pt-4">
          <div className="min-w-0">
            <h3 className="text-2xl font-medium tracking-tight">{spot.name}</h3>
            <p className="mt-2 text-sm leading-snug text-ink-soft">{spot.description}</p>
          </div>
          <span className="tabular shrink-0 rounded-full bg-ink px-2.5 py-1 text-xs font-semibold tracking-wide text-paper">
            {spot.price}
          </span>
        </div>
        <Collapsible.Trigger className="mx-5 mt-3 inline-flex items-center gap-1.5 self-start text-sm font-medium text-ink-soft hover:text-ink">
          {open ? "Hide details" : "Show details"}
          <ChevronDown aria-hidden="true" className={cn("size-4 transition-transform", open && "rotate-180")} />
        </Collapsible.Trigger>
        <Collapsible.Content forceMount className="collapse-content flex-1">
          <div className="min-h-0 overflow-hidden">
            <div className="px-5 pt-3 pb-5">
              <p className="text-[0.98rem] leading-relaxed text-ink-soft">
                <RichText>{spot.body}</RichText>
              </p>
              {(spot.links.length > 0 || spot.slotId) && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {spot.links.map((link) => (
                    <ExternalLink
                      key={link.href}
                      href={link.href}
                      className="rounded-full border border-line px-3.5 py-1.5 text-sm !no-underline transition hover:border-ink"
                    >
                      {link.label}
                    </ExternalLink>
                  ))}
                  {spot.slotId && (
                    <OpenSlotsButton slotId={spot.slotId} />
                  )}
                </div>
              )}
            </div>
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
    </article>
  );
}

export function SpotsSection() {
  return (
    <section id="tickets" aria-labelledby="tickets-title" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index="06" kicker={spotsIntro.kicker} title={spotsIntro.title} id="tickets-title">
          <p>{spotsIntro.intro}</p>
        </SectionHeading>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {spots.map((spot, i) => (
            <Reveal key={spot.id} delay={i * 0.05}>
              <SpotCard spot={spot} />
            </Reveal>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-ink-soft">
          <RichText>{spotsIntro.footnote}</RichText>
        </p>
      </div>
    </section>
  );
}
