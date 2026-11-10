import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useMemo, useState, type ReactNode } from "react";
import { photos, type PhotoId } from "@/data/photos";
import { LightboxContext } from "@/state/contexts";
import { Photo } from "./ui/Photo";
import { PhotoCredit } from "./ui/PhotoCredit";

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [gallery, setGallery] = useState<PhotoId[]>([]);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const openLightbox = useCallback((ids: PhotoId[], start = 0) => {
    setGallery(ids);
    setIndex(start);
    setOpen(true);
  }, []);

  const api = useMemo(() => ({ open: openLightbox }), [openLightbox]);
  const current = gallery[index];
  const many = gallery.length > 1;
  const step = (delta: number) => setIndex((i) => (i + delta + gallery.length) % gallery.length);

  return (
    <LightboxContext.Provider value={api}>
      {children}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-night/92 backdrop-blur-sm data-[state=open]:animate-[fade-in_.2s_ease-out]" />
          <Dialog.Content
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 p-4 outline-none sm:p-10"
            onKeyDown={(e) => {
              if (!many) return;
              if (e.key === "ArrowRight") step(1);
              if (e.key === "ArrowLeft") step(-1);
            }}
          >
            {current && (
              <>
                <Dialog.Title className="sr-only">{photos[current].caption}</Dialog.Title>
                <Dialog.Description className="sr-only">
                  {photos[current].alt}
                  {many && `. Photo ${index + 1} of ${gallery.length}; use the arrow keys to browse.`}
                </Dialog.Description>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.figure
                    key={current}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex max-h-full min-h-0 w-full max-w-5xl flex-col items-center"
                  >
                    <Photo
                      id={current}
                      sizes="(min-width: 1100px) 1024px, 100vw"
                      className="min-h-0 overflow-hidden rounded-lg"
                      imgClassName="max-h-[78vh] w-auto !object-contain"
                    />
                    <figcaption className="mt-3 w-full text-center">
                      <PhotoCredit id={current} tone="light" className="text-sm" />
                    </figcaption>
                  </motion.figure>
                </AnimatePresence>
                {many && (
                  <div className="flex items-center gap-3 text-paper">
                    <button
                      type="button"
                      onClick={() => step(-1)}
                      className="grid size-11 place-items-center rounded-full border border-paper/30 transition hover:bg-paper/10"
                    >
                      <ChevronLeft aria-hidden="true" className="size-5" />
                      <span className="sr-only">Previous photo</span>
                    </button>
                    <span className="tabular w-14 text-center text-sm text-paper/80" aria-hidden="true">
                      {index + 1} / {gallery.length}
                    </span>
                    <button
                      type="button"
                      onClick={() => step(1)}
                      className="grid size-11 place-items-center rounded-full border border-paper/30 transition hover:bg-paper/10"
                    >
                      <ChevronRight aria-hidden="true" className="size-5" />
                      <span className="sr-only">Next photo</span>
                    </button>
                  </div>
                )}
              </>
            )}
            <Dialog.Close className="absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-paper/10 text-paper transition hover:bg-paper/20">
              <X aria-hidden="true" className="size-5" />
              <span className="sr-only">Close</span>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </LightboxContext.Provider>
  );
}
