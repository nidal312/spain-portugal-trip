import type { ImgHTMLAttributes } from "react";
import { photos, type PhotoId } from "@/data/photos";
import { cn } from "@/lib/cn";

const MIME: Record<string, string> = { webp: "image/webp", avif: "image/avif", jpg: "image/jpeg", jpeg: "image/jpeg" };

interface PhotoProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt" | "width" | "height"> {
  id: PhotoId;
  sizes: string;
  priority?: boolean;
  imgClassName?: string;
}

const SOURCE_ORDER = ["avif", "webp", "jpg", "jpeg"] as const;

export function Photo({ id, sizes, priority = false, className, imgClassName, ...rest }: PhotoProps) {
  const photo = photos[id];
  const { sources, img } = photo.picture;
  const formats = [
    ...SOURCE_ORDER.filter((format) => format in sources),
    ...Object.keys(sources).filter((format) => !SOURCE_ORDER.includes(format as (typeof SOURCE_ORDER)[number])),
  ];
  const fallbackSrcSet = sources.jpg ?? sources.jpeg;
  return (
    <picture className={cn("block", className)}>
      {formats.map((format) => {
        const srcSet = sources[format];
        if (!srcSet) return null;
        return <source key={format} type={MIME[format] ?? `image/${format}`} srcSet={srcSet} sizes={sizes} />;
      })}
      <img
        src={img.src}
        srcSet={fallbackSrcSet}
        sizes={sizes}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        className={cn("h-full w-full object-cover", imgClassName)}
        {...rest}
      />
    </picture>
  );
}
