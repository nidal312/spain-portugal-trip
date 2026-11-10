import { Expand } from "lucide-react";
import { photos, type PhotoId } from "@/data/photos";
import { cn } from "@/lib/cn";
import { useLightbox } from "@/state/contexts";
import { Photo } from "./Photo";

interface ZoomablePhotoProps {
  id: PhotoId;
  gallery?: PhotoId[];
  sizes: string;
  className?: string;
  imgClassName?: string;
}

/** A photo that opens in the lightbox. The button wraps only the image so captions stay selectable. */
export function ZoomablePhoto({ id, gallery, sizes, className, imgClassName }: ZoomablePhotoProps) {
  const { open } = useLightbox();
  const list = gallery ?? [id];
  return (
    <button
      type="button"
      onClick={() => open(list, Math.max(0, list.indexOf(id)))}
      className={cn("group relative block w-full cursor-zoom-in overflow-hidden bg-sand", className)}
    >
      <Photo
        id={id}
        sizes={sizes}
        imgClassName={cn("transition duration-700 ease-out-soft group-hover:scale-[1.03]", imgClassName)}
      />
      <span
        aria-hidden="true"
        className="absolute right-3 bottom-3 grid size-9 place-items-center rounded-full bg-ink/55 text-paper opacity-0 backdrop-blur transition group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        <Expand className="size-4" />
      </span>
      <span className="sr-only">Enlarge photo: {photos[id].caption}</span>
    </button>
  );
}
