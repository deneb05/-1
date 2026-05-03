"use client";

import Script from "next/script";

const YM_ID = process.env.NEXT_PUBLIC_YM_ID?.trim() || "00000000";
const COUNTER_ID = Number.parseInt(YM_ID, 10);

function isValidCounterId(id: number) {
  return Number.isFinite(id) && id > 0;
}

/**
 * Счётчик Метрики. ID задайте в NEXT_PUBLIC_YM_ID (Vercel → Environment Variables).
 * Заглушка 00000000 не инициализирует счётчик.
 */
export function YandexMetrika() {
  if (!isValidCounterId(COUNTER_ID) || YM_ID === "00000000") {
    return null;
  }

  return (
    <Script
      id="yandex-metrika"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();
for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) { return; } }
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

ym(${COUNTER_ID}, "init", {
  clickmap:true,
  trackLinks:true,
  accurateTrackBounce:true,
  webvisor:true
});
`,
      }}
    />
  );
}
