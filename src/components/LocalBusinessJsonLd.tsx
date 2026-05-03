import { CITY_LOCATIVE, CITY_NOMINATIVE, getSiteUrl } from "@/lib/site";

/** Семантическая разметка LocalBusiness + ElectronicStore для локального SEO */
export function LocalBusinessJsonLd() {
  const base = getSiteUrl();
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ElectronicStore"],
    name: `Скупка Apple и выкуп iPhone — ${CITY_NOMINATIVE}`,
    description:
      `Выкуп айфонов и скупка Apple в ${CITY_LOCATIVE}: до 95% от рыночной цены, оценка за 15 минут, деньги сразу.`,
    url: base,
    image: `${base}/seo/hero-dagestan-ogni.svg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: CITY_NOMINATIVE,
      addressRegion: "Республика Дагестан",
      addressCountry: "RU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 44.6333,
      longitude: 48.1167,
    },
    areaServed: {
      "@type": "City",
      name: CITY_NOMINATIVE,
    },
    priceRange: "$$",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
