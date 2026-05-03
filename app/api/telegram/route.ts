import { NextResponse } from "next/server";
import { normalizeRussianPhone } from "@/lib/phone";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Telegram принимает chat_id числом или строкой; группы — отрицательные id вида -100… */
function normalizeTelegramChatId(raw: string): string | number {
  const s = raw.trim();
  if (/^-?\d+$/.test(s)) {
    const n = Number(s);
    if (Number.isSafeInteger(n)) return n;
  }
  return s;
}

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatIdRaw = process.env.TELEGRAM_CHAT_ID?.trim();

  if (!token || !chatIdRaw) {
    return NextResponse.json(
      { error: "Сервер не настроен: задайте TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID" },
      { status: 503 },
    );
  }

  let body: { model?: string; condition?: string; phone?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректный JSON" }, { status: 400 });
  }

  const model = typeof body.model === "string" ? body.model.trim() : "";
  const condition =
    typeof body.condition === "string" ? body.condition.trim() : "";
  const phoneRaw = typeof body.phone === "string" ? body.phone.trim() : "";

  if (!model || !condition) {
    return NextResponse.json(
      { error: "Укажите модель и состояние" },
      { status: 400 },
    );
  }

  if (model.length > 200 || condition.length > 280) {
    return NextResponse.json({ error: "Слишком длинный текст" }, { status: 400 });
  }

  const phone = normalizeRussianPhone(phoneRaw);
  if (!phone) {
    return NextResponse.json(
      { error: "Некорректный номер телефона" },
      { status: 400 },
    );
  }

  const text = [
    "<b>Заявка — выкуп iPhone</b>",
    "",
    `<b>Модель:</b> ${escapeHtml(model)}`,
    `<b>Состояние:</b> ${escapeHtml(condition)}`,
    `<b>Телефон:</b> ${escapeHtml(phone)}`,
  ].join("\n");

  const chatId = normalizeTelegramChatId(chatIdRaw);

  const tgUrl = `https://api.telegram.org/bot${token}/sendMessage`;
  const tgRes = await fetch(tgUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  const tgData = await tgRes.json().catch(() => null);

  if (!tgRes.ok) {
    const apiDesc =
      tgData &&
      typeof tgData === "object" &&
      "description" in tgData &&
      typeof (tgData as { description?: string }).description === "string"
        ? (tgData as { description: string }).description
        : "Ошибка Telegram";

    let desc = apiDesc;
    if (/chat not found/i.test(apiDesc)) {
      desc =
        "Telegram: чат не найден. Откройте бота в Telegram и нажмите «Запустить» (/start). Для группы: добавьте бота в группу и укажите id группы (часто начинается с -100).";
    }

    return NextResponse.json({ error: desc }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
