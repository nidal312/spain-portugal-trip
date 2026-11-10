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

export function Photo({ id, sizes, priority = false, className, imgClassName, ...rest }: PhotoProps) {
  const photo = photos[id];
  const { sources, img } = photo.picture;
  return (
    <picture className={cn("block", className)}>
      {Object.entries(sources).map(([format, srcSet]) => (
        <source key={format} type={MIME[format]} srcSet={srcSet} sizes={sizes} />
      ))}
      <img
        src={img.src}
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
