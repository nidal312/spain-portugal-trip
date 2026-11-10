import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cityById, cityTextClass } from "@/data/cities";
import { weather, weatherIntro, weatherSources, type CityWeather } from "@/data/weather";
import { cn } from "@/lib/cn";
import { RichText } from "@/lib/rich";

const TEMP_MIN = 5;
const TEMP_MAX = 20;

function tempPct(c: number) {
  return ((c - TEMP_MIN) / (TEMP_MAX - TEMP_MIN)) * 100;
}

function minutes(t: string) {
  const [h = 0, m = 0] = t.split(":").map(Number);
  return h * 60 + m;
}

function TemperatureBar({ city }: { city: CityWeather }) {
  const lowStart = tempPct(city.low[0]);
  const lowWidth = tempPct(city.low[1]) - lowStart;
  const highStart = tempPct(city.high[0]);
  const highWidth = tempPct(city.high[1]) - highStart;
  return (
    <div>
      <div className="flex justify-between text-[0.65rem] tracking-wider text-ink-soft uppercase">
        <span>{TEMP_MIN}°C</span>
        <span>{TEMP_MAX}°C</span>
      </div>
      <div className="relative mt-1 h-3 rounded-full bg-sand">
        <span
          aria-hidden="true"
          className="absolute inset-y-0 rounded-full bg-azulejo/45"
          style={{ left: `${lowStart}%`, width: `${lowWidth}%` }}
        />
        <span
          aria-hidden="true"
          className="absolute inset-y-0 rounded-full bg-terra/70"
          style={{ left: `${highStart}%`, width: `${highWidth}%` }}
        />
      </div>
      <p className="mt-2 text-sm text-ink-soft">
        <span className="tabular">Lows {city.low[0]}–{city.low[1]}°C</span>
        <span className="mx-2 text-line">·</span>
        <span className="tabular">Highs {city.high[0]}–{city.high[1]}°C</span>
      </p>
    </div>
  );
}

function DaylightBar({ sunrise, sunset }: { sunrise: string; sunset: string }) {
  const start = (minutes(sunrise) / 1440) * 100;
  const end = (minutes(sunset) / 1440) * 100;
  return (
    <div className="relative h-2 overflow-hidden rounded-full bg-night/15">
      <span
        aria-hidden="true"
        className="absolute inset-y-0 rounded-full bg-saffron"
        style={{ left: `${start}%`, width: `${end - start}%` }}
      />
    </div>
  );
}

export function WeatherSection() {
  return (
    <section id="weather" aria-labelledby="weather-title" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading index="11" kicker={weatherIntro.kicker} title={weatherIntro.title} id="weather-title">
          <p>{weatherIntro.intro}</p>
        </SectionHeading>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {weather.map((cityWx, i) => {
            const city = cityById(cityWx.city);
            return (
              <Reveal key={cityWx.city} delay={i * 0.06}>
                <article className="h-full rounded-[1.75rem] border border-line bg-paper-2 p-6 shadow-card">
                  <h3 className={cn("text-3xl font-medium", cityTextClass[cityWx.city])}>{city.name}</h3>
                  <div className="mt-5">
                    <TemperatureBar city={cityWx} />
                  </div>
                  <div className="mt-5">
                    <p className="kicker text-ink-soft">Wet-day chance</p>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-sand">
                        <span
                          className="absolute inset-y-0 left-0 rounded-full bg-sea"
                          style={{ width: `${cityWx.wetChance}%` }}
                        />
                      </div>
                      <span className="tabular text-sm font-semibold">{cityWx.wetLabel}</span>
                    </div>
                  </div>
                  <p className="mt-5 text-[0.98rem] leading-relaxed text-ink-soft">
                    <RichText>{cityWx.summary}</RichText>
                  </p>
                  <ul className="mt-5 space-y-3">
                    {cityWx.sun.map((row) => (
                      <li key={row.date}>
                        <div className="flex items-baseline justify-between gap-3 text-sm">
                          <span className="font-medium">{row.date}</span>
                          <span className="tabular text-ink-soft">
                            {row.sunrise} → {row.sunset}
                          </span>
                        </div>
                        <DaylightBar sunrise={row.sunrise} sunset={row.sunset} />
                      </li>
                    ))}
                  </ul>
                  {cityWx.sunFootnote && <p className="mt-3 text-xs text-ink-soft">{cityWx.sunFootnote}</p>}
                </article>
              </Reveal>
            );
          })}
        </div>
        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-ink-soft">
          <RichText>{weatherSources}</RichText>
        </p>
      </div>
    </section>
  );
}
