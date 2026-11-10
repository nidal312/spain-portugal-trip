import { place, type PlaceId } from "@/data/places";
import { cn } from "@/lib/cn";

export function PlaceBlurb({ id }: { id: PlaceId }) {
  const item = place(id);
  return (
    <article className="rounded-xl border border-line bg-paper px-3.5 py-3">
      <h4 className="font-display text-base font-medium text-ink">{item.name}</h4>
      <p className="mt-1 text-sm leading-snug text-ink-soft">{item.description}</p>
    </article>
  );
}

export function PlaceBlurbList({ ids }: { ids: PlaceId[] }) {
  if (ids.length === 0) return null;
  return (
    <ul className={cn("mt-3 grid gap-2", ids.length > 1 && "sm:grid-cols-2")}>
      {ids.map((id) => (
        <li key={id}>
          <PlaceBlurb id={id} />
        </li>
      ))}
    </ul>
  );
}
