import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { motion } from "motion/react";
import { useId } from "react";
import { cn } from "@/lib/cn";

export interface SegmentedOption<T extends string> {
  value: T;
  label: string;
  count?: number;
}

interface SegmentedProps<T extends string> {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: SegmentedOption<T>[];
  className?: string;
  tone?: "light" | "dark";
}

/** Single-select pill toggle with an animated thumb. */
export function Segmented<T extends string>({
  label,
  value,
  onChange,
  options,
  className,
  tone = "light",
}: SegmentedProps<T>) {
  const layoutId = useId();
  const dark = tone === "dark";
  return (
    <ToggleGroup.Root
      type="single"
      aria-label={label}
      value={value}
      onValueChange={(v) => v && onChange(v as T)}
      className={cn(
        "no-scrollbar inline-flex max-w-full gap-1 overflow-x-auto rounded-full p-1",
        dark ? "bg-paper/10" : "border border-line bg-paper-2",
        className,
      )}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <ToggleGroup.Item
            key={opt.value}
            value={opt.value}
            className={cn(
              "relative shrink-0 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
              active
                ? dark
                  ? "text-ink"
                  : "text-paper"
                : dark
                  ? "text-paper/75 hover:text-paper"
                  : "text-ink-soft hover:text-ink",
            )}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                className={cn("absolute inset-0 -z-0 rounded-full", dark ? "bg-paper" : "bg-ink")}
                transition={{ type: "spring", stiffness: 420, damping: 36 }}
              />
            )}
            <span className="relative">
              {opt.label}
              {opt.count !== undefined && <span className="ml-1.5 tabular opacity-60">{opt.count}</span>}
            </span>
          </ToggleGroup.Item>
        );
      })}
    </ToggleGroup.Root>
  );
}
