import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LocalBusinessJsonLd } from "@/components/LocalBusinessJsonLd";
import { YandexMetrika } from "@/components/YandexMetrika";
import {
  CITY_LOCATIVE,
  CITY_NOMINATIVE,
  getSiteUrl,
  SEO_KEYWORDS,
} from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Выкуп айфонов Дагестанские Огни — скупка Apple iPhone до 95% от рынка",
    template: "%s | Выкуп iPhone Дагестанские Огни",
  },
  description: `Продать айфон в ${CITY_LOCATIVE}: выкуп iPhone за 15 минут, платим до 95% от рыночной цены. Оставьте заявку — перезвоним и назовём сумму. Работаем по городу и районам.`,
  keywords: SEO_KEYWORDS,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "/",
    siteName: `Выкуп iPhone ${CITY_NOMINATIVE}`,
    title:
      "Выкуп айфонов Дагестанские Огни | Скупка Apple — продать iPhone с выгодой",
    description: `Скупка Apple и выкуп айфонов в ${CITY_LOCATIVE}. До 95% от рынка, деньги сразу на руки или на карту.`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `Выкуп iPhone в ${CITY_LOCATIVE}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Выкуп айфонов Дагестанские Огни | Скупка Apple — продать iPhone с выгодой",
    description: `Скупка Apple и выкуп айфонов в ${CITY_LOCATIVE}. До 95% от рынка.`,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width" as const,
  initialScale: 1,
  themeColor: "#0a0a0b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark">
      <body className={`${inter.variable} font-sans min-h-screen`}>
        <YandexMetrika />
        <LocalBusinessJsonLd />
        {children}
      </body>
    </html>
  );
}
