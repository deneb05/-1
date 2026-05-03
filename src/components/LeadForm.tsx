"use client";

import { motion } from "framer-motion";
import { Loader2, Send } from "lucide-react";
import { useState } from "react";
import { fadeUp } from "@/lib/motion";
import { isValidRussianPhone, normalizeRussianPhone } from "@/lib/phone";
import { reachLeadGoal } from "@/lib/yandex-metrika";
import { CITY_LOCATIVE } from "@/lib/site";

const SELECT_OTHER = "__other__";

const MODEL_OPTIONS = [
  { value: "iPhone 13 Pro Max", label: "iPhone 13 Pro Max" },
  { value: "iPhone 14 Pro Max", label: "iPhone 14 Pro Max" },
  { value: "iPhone 15 Pro Max", label: "iPhone 15 Pro Max" },
  { value: "iPhone 16 Pro Max", label: "iPhone 16 Pro Max" },
  {
    value: SELECT_OTHER,
    label: "Другое - написать свой вариант",
  },
];

const CONDITIONS = [
  { value: "excellent", label: "Отличное — как новый" },
  { value: "good", label: "Хорошее — следы использования" },
  { value: "fair", label: "Удовлетворительное — есть заметный износ" },
  {
    value: SELECT_OTHER,
    label: "Другое - написать свой вариант",
  },
];

export function LeadForm() {
  const [model, setModel] = useState("");
  const [modelOther, setModelOther] = useState("");
  const [condition, setCondition] = useState("");
  const [conditionOther, setConditionOther] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [isApiError, setIsApiError] = useState(false);

  const handlePhoneBlur = () => {
    if (!phone.trim()) {
      setPhoneError(null);
      return;
    }
    setPhoneError(
      isValidRussianPhone(phone) ? null : "Введите корректный номер РФ (+7)",
    );
  };

  const buildPayload = () => {
    let modelOut = "";
    if (model === SELECT_OTHER) {
      modelOut = modelOther.trim();
      if (!modelOut) return null;
      modelOut = `Другое: ${modelOut}`;
    } else {
      modelOut =
        MODEL_OPTIONS.find((o) => o.value === model)?.label ?? model.trim();
    }

    let conditionOut = "";
    if (condition === SELECT_OTHER) {
      conditionOut = conditionOther.trim();
      if (!conditionOut) return null;
      conditionOut = `Другое: ${conditionOut}`;
    } else {
      conditionOut =
        CONDITIONS.find((c) => c.value === condition)?.label ?? condition;
    }

    return { model: modelOut, condition: conditionOut };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsApiError(false);

    if (!model || !condition) {
      setMessage("Выберите модель и состояние");
      return;
    }

    const payload = buildPayload();
    if (!payload) {
      setMessage("Укажите текст для пункта «Другое»");
      return;
    }

    if (!isValidRussianPhone(phone)) {
      setPhoneError("Введите корректный номер РФ (+7)");
      return;
    }

    const normalized = normalizeRussianPhone(phone)!;
    setStatus("loading");

    try {
      const res = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: payload.model,
          condition: payload.condition,
          phone: normalized,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          typeof data.error === "string" ? data.error : "Не удалось отправить",
        );
      }

      reachLeadGoal();
      setStatus("success");
      setMessage("Заявка отправлена — свяжемся в ближайшее время");
      setModel("");
      setModelOther("");
      setCondition("");
      setConditionOther("");
      setPhone("");
      setPhoneError(null);
      window.setTimeout(() => {
        setStatus("idle");
        setMessage(null);
      }, 6000);
    } catch (err) {
      setIsApiError(true);
      setStatus("idle");
      setMessage(err instanceof Error ? err.message : "Ошибка отправки");
    }
  };

  return (
    <section
      id="lead-form"
      className="scroll-mt-8 px-5 py-24 md:px-8"
    >
      <div className="mx-auto max-w-lg">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="mb-10 text-center"
        >
          <h2 className="text-3xl font-semibold tracking-tight text-accent md:text-4xl">
            Заявка на выкуп iPhone в {CITY_LOCATIVE}
          </h2>
          <p className="mt-3 text-accent-muted md:text-lg">
            Перезвоним и озвучим точную сумму — продать айфон в{" "}
            {CITY_LOCATIVE} можно за один визит
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-glass backdrop-blur-xl sm:p-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
        >
          <label className="block">
            <span className="text-sm font-medium text-accent-muted">
              Модель
            </span>
            <select
              required
              value={model}
              onChange={(e) => {
                setModel(e.target.value);
                if (e.target.value !== SELECT_OTHER) setModelOther("");
              }}
              className="mt-2 w-full appearance-none rounded-2xl border border-white/10 bg-surface-elevated/80 px-4 py-3.5 text-accent outline-none ring-offset-surface transition focus:border-white/25 focus:ring-2 focus:ring-white/10"
            >
              <option value="">Выберите модель</option>
              {MODEL_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>

          {model === SELECT_OTHER && (
            <label className="mt-4 block">
              <span className="text-sm font-medium text-accent-muted">
                Ваша модель
              </span>
              <input
                type="text"
                value={modelOther}
                onChange={(e) => setModelOther(e.target.value)}
                placeholder="Например: iPhone 12 mini 128 ГБ"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-surface-elevated/80 px-4 py-3.5 text-accent outline-none ring-offset-surface transition placeholder:text-accent-muted/50 focus:border-white/25 focus:ring-2 focus:ring-white/10"
              />
            </label>
          )}

          <label className="mt-6 block">
            <span className="text-sm font-medium text-accent-muted">
              Состояние
            </span>
            <select
              required
              value={condition}
              onChange={(e) => {
                setCondition(e.target.value);
                if (e.target.value !== SELECT_OTHER) setConditionOther("");
              }}
              className="mt-2 w-full appearance-none rounded-2xl border border-white/10 bg-surface-elevated/80 px-4 py-3.5 text-accent outline-none ring-offset-surface transition focus:border-white/25 focus:ring-2 focus:ring-white/10"
            >
              <option value="">Выберите состояние</option>
              {CONDITIONS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>

          {condition === SELECT_OTHER && (
            <label className="mt-4 block">
              <span className="text-sm font-medium text-accent-muted">
                Опишите состояние
              </span>
              <input
                type="text"
                value={conditionOther}
                onChange={(e) => setConditionOther(e.target.value)}
                placeholder="Трещина на стекле, износ корпуса и т.п."
                className="mt-2 w-full rounded-2xl border border-white/10 bg-surface-elevated/80 px-4 py-3.5 text-accent outline-none ring-offset-surface transition placeholder:text-accent-muted/50 focus:border-white/25 focus:ring-2 focus:ring-white/10"
              />
            </label>
          )}

          <label className="mt-6 block">
            <span className="text-sm font-medium text-accent-muted">
              Телефон
            </span>
            <input
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+7 900 000-00-00"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (phoneError) setPhoneError(null);
              }}
              onBlur={handlePhoneBlur}
              className={`mt-2 w-full rounded-2xl border bg-surface-elevated/80 px-4 py-3.5 text-accent outline-none ring-offset-surface transition placeholder:text-accent-muted/50 focus:ring-2 focus:ring-white/10 ${
                phoneError
                  ? "border-red-400/60 focus:border-red-400/80"
                  : "border-white/10 focus:border-white/25"
              }`}
            />
            {phoneError && (
              <p className="mt-2 text-sm text-red-400/90">{phoneError}</p>
            )}
          </label>

          {message && (
            <p
              className={`mt-6 text-sm ${
                status === "success"
                  ? "text-emerald-400/90"
                  : isApiError
                    ? "text-red-400/90"
                    : "text-amber-400/90"
              }`}
              role="status"
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-accent py-4 text-base font-semibold text-surface transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                Отправка…
              </>
            ) : (
              <>
                <Send className="h-5 w-5" aria-hidden />
                Отправить заявку
              </>
            )}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
