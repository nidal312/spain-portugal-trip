import { MotionConfig } from "motion/react";
import { LightboxProvider } from "@/components/Lightbox";
import { ChecklistSection } from "@/sections/ChecklistSection";
import { DaysSection } from "@/sections/DaysSection";
import { FlightsSection } from "@/sections/FlightsSection";
import { CafesSection } from "@/sections/CafesSection";
import { FoodSection } from "@/sections/FoodSection";
import { Footer } from "@/sections/Footer";
import { Header } from "@/sections/Header";
import { Hero } from "@/sections/Hero";
import { MosquesSection } from "@/sections/MosquesSection";
import { RouteSection } from "@/sections/route/RouteSection";
import { SlotsSection } from "@/sections/SlotsSection";
import { SpotsSection } from "@/sections/SpotsSection";
import { StaySection } from "@/sections/StaySection";
import { WeatherSection } from "@/sections/WeatherSection";
import { useTrip } from "@/state/contexts";
import { TripProvider } from "@/state/TripProvider";

function Main() {
  const { planId } = useTrip();
  return (
    <main id="main">
      <Hero />
      <RouteSection />
      <FlightsSection key={`flights-${planId}`} />
      <ChecklistSection key={`checklist-${planId}`} />
      <SlotsSection key={`slots-${planId}`} />
      <DaysSection key={`days-${planId}`} />
      <SpotsSection />
      <FoodSection />
      <CafesSection key={`cafes-${planId}`} />
      <MosquesSection />
      <StaySection />
      <WeatherSection />
    </main>
  );
}

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <TripProvider>
        <LightboxProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-paper-2 focus:px-4 focus:py-2 focus:text-ink"
          >
            Skip to content
          </a>
          <Header />
          <Main />
          <Footer />
        </LightboxProvider>
      </TripProvider>
    </MotionConfig>
  );
}
