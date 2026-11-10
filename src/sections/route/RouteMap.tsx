import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";
import { cities, type CityId } from "@/data/cities";
import { route } from "@/data/route";
import { cn } from "@/lib/cn";

const VB = { w: 720, h: 540 };
const LAND =
  "M 118,108 C 150,86 210,80 268,90 C 330,100 390,92 448,88 C 495,84 528,102 542,128 C 552,150 548,178 532,200 C 518,228 505,258 488,286 C 470,314 452,334 430,352 C 412,376 404,408 396,438 C 384,468 352,492 318,502 C 280,514 248,516 222,502 C 200,492 192,508 176,516 C 158,508 150,486 142,468 C 128,452 108,448 88,456 C 70,450 58,432 56,408 C 54,378 60,350 68,328 C 72,300 78,272 86,246 C 92,216 98,188 104,162 C 108,140 110,122 118,108 Z";
const PORTUGAL =
  "M 118,160 C 128,200 122,250 108,300 C 100,340 96,380 108,430 C 122,448 138,450 150,438 C 160,400 168,350 160,300 C 152,250 148,200 140,168 C 132,150 124,150 118,160 Z";
const TRAIN = "M 512,208 C 500,240 478,280 452,322";
const FLIGHT = "M 448,328 C 340,300 220,300 128,338";
const INBOUND = "M 600,-10 C 590,90 560,160 524,198";
const OUTBOUND = "M 116,334 C 90,240 150,60 260,-10";

const pct = (v: number, total: number) => `${(v / total) * 100}%`;

interface RouteMapProps {
  selected: CityId;
  onSelect: (id: CityId) => void;
}

export function RouteMap({ selected, onSelect }: RouteMapProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trainRef = useRef<SVGPathElement>(null);
  const flightRef = useRef<SVGPathElement>(null);
  const inView = useInView(wrapRef, { once: true, margin: "0px 0px -20% 0px" });
  const reduce = useReducedMotion();
  const progress = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      progress.set(2);
      return;
    }
    const controls = animate(progress, 2, { duration: 3.4, ease: [0.45, 0, 0.2, 1], delay: 0.3 });
    return () => controls.stop();
  }, [inView, reduce, progress]);

  const trainLen = useTransform(progress, (p) => Math.min(1, Math.max(0, p)));
  const flightLen = useTransform(progress, (p) => Math.min(1, Math.max(0, p - 1)));
  const point = (p: number) => {
    const path = p <= 1 ? trainRef.current : flightRef.current;
    if (!path) return { x: cities[0]?.map.x ?? 0, y: cities[0]?.map.y ?? 0 };
    const local = p <= 1 ? p : p - 1;
    return path.getPointAtLength(path.getTotalLength() * local);
  };
  const tx = useTransform(progress, (p) => point(p).x);
  const ty = useTransform(progress, (p) => point(p).y);
  const travellerOpacity = useTransform(progress, [0, 0.05, 1.95, 2], [0, 1, 1, 0]);

  return (
    <div ref={wrapRef} className="relative">
      <svg
        viewBox={`0 0 ${VB.w} ${VB.h}`}
        className="block h-auto w-full"
        role="img"
        aria-label={route.map.ariaLabel}
      >
        <defs>
          <pattern id="sea-lines" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(-20)">
            <path d="M0 7 Q 3.5 4 7 7 T 14 7" fill="none" stroke="#1c5866" strokeOpacity=".09" strokeWidth="1" />
          </pattern>
          <filter id="wobble" x="-2%" y="-2%" width="104%" height="104%">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="0.8" />
          </filter>
          <mask id="train-mask" maskUnits="userSpaceOnUse">
            <motion.path d={TRAIN} fill="none" stroke="#fff" strokeWidth="10" style={{ pathLength: trainLen }} />
          </mask>
          <mask id="flight-mask" maskUnits="userSpaceOnUse">
            <motion.path d={FLIGHT} fill="none" stroke="#fff" strokeWidth="10" style={{ pathLength: flightLen }} />
          </mask>
        </defs>

        <rect width={VB.w} height={VB.h} fill="#e9dfcc" />
        <rect width={VB.w} height={VB.h} fill="url(#sea-lines)" />

        <g fontFamily="var(--font-display)" fontStyle="italic" fill="#574b40" fontSize="14">
          <text x="548" y="440">Mediterranean</text>
          <text x="22" y="250">Atlantic</text>
        </g>

        <path
          d={LAND}
          filter="url(#wobble)"
          fill="#f7efe0"
          stroke="#2f3f27"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d={PORTUGAL} fill="#eedcb8" fillOpacity=".9" stroke="#2f3f27" strokeWidth="1.2" strokeDasharray="5 4" />
        <g fontFamily="var(--font-sans)" fontSize="10" letterSpacing="3" fill="#574b40" opacity=".75">
          <text x="300" y="250">SPAIN</text>
          <text x="96" y="210" transform="rotate(-82 96 210)">PORTUGAL</text>
        </g>

        <g fill="none" stroke="#574b40" strokeOpacity=".5" strokeWidth="1.3" strokeDasharray="1 6" strokeLinecap="round">
          <path d={INBOUND} />
          <path d={OUTBOUND} />
        </g>

        <path d={TRAIN} fill="none" stroke="#b23f22" strokeOpacity=".16" strokeWidth="3" />
        <path d={FLIGHT} fill="none" stroke="#24508c" strokeOpacity=".16" strokeWidth="3" />
        <path
          ref={trainRef}
          d={TRAIN}
          mask="url(#train-mask)"
          fill="none"
          stroke="#b23f22"
          strokeWidth="3"
          strokeDasharray="8 6"
          strokeLinecap="round"
        />
        <path
          ref={flightRef}
          d={FLIGHT}
          mask="url(#flight-mask)"
          fill="none"
          stroke="#24508c"
          strokeWidth="3"
          strokeDasharray="3 7"
          strokeLinecap="round"
        />

        <g fontFamily="var(--font-display)" fontSize="12" fontStyle="italic">
          <text x="500" y="276" fill="#862e16" transform="rotate(62 500 276)">
            {route.map.trainLabel}
          </text>
          <text x="210" y="292" fill="#24508c" transform="rotate(-7 210 292)">
            {route.map.flightLabel}
          </text>
        </g>

        <motion.g style={{ x: tx, y: ty, opacity: travellerOpacity }}>
          <circle r="9" fill="#d79a34" fillOpacity=".3" />
          <circle r="4.5" fill="#1e1813" stroke="#fbf7ef" strokeWidth="1.5" />
        </motion.g>

        <g fontFamily="var(--font-display)">
          <text x="360" y="40" textAnchor="middle" fontSize="17" fill="#1e1813">
            {route.map.title}
          </text>
          <text x="360" y="60" textAnchor="middle" fontSize="12" fill="#574b40" fontStyle="italic">
            {route.map.subtitle}
          </text>
        </g>
      </svg>

      {cities.map((city) => {
        const isSelected = selected === city.id;
        return (
          <button
            key={city.id}
            type="button"
            onClick={() => onSelect(city.id)}
            aria-pressed={isSelected}
            className="group absolute -translate-x-1/2 -translate-y-1/2 rounded-full p-2.5"
            style={{ left: pct(city.map.x, VB.w), top: pct(city.map.y, VB.h) }}
          >
            <span className="sr-only">
              {city.name}. {city.description} {city.dates}, {city.nights} {city.nights === 1 ? "night" : "nights"}
            </span>
            <span
              aria-hidden="true"
              className={cn(
                "relative block size-4 rounded-full border-2 border-paper-2 shadow-md transition-transform duration-300 group-hover:scale-125 sm:size-5",
                city.id === "lisbon" ? "bg-city-lisbon" : "bg-city-barcelona",
                isSelected && "scale-125",
              )}
            >
              {isSelected && (
                <span className="absolute -inset-2 animate-ping rounded-full border-2 border-current opacity-60 motion-reduce:animate-none" />
              )}
            </span>
          </button>
        );
      })}

      {cities.map((city) => (
        <div
          key={`${city.id}-label`}
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{ left: pct(city.map.labelX, VB.w), top: pct(city.map.labelY, VB.h) }}
        >
          <p
            className={cn(
              "-translate-y-1/2 font-display text-[0.85rem] leading-none font-semibold whitespace-nowrap sm:text-lg",
              selected === city.id ? "text-terra-deep" : "text-ink",
            )}
          >
            {city.name}
          </p>
          <p className="mt-0.5 -translate-y-1/2 text-[0.55rem] tracking-[0.14em] text-ink-soft uppercase sm:text-[0.68rem]">
            {city.dates}
          </p>
        </div>
      ))}
    </div>
  );
}
