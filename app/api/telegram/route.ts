import { NextResponse } from "next/server";
import { normalizeRussianPhone } from "@/lib/phone";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
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

  if (model.length > 120 || condition.length > 220) {
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
    const desc =
      tgData &&
      typeof tgData === "object" &&
      "description" in tgData &&
      typeof (tgData as { description?: string }).description === "string"
        ? (tgData as { description: string }).description
        : "Ошибка Telegram";
    return NextResponse.json({ error: desc }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
