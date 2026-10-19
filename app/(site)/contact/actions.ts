"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { hit } from "@/lib/ratelimit";

export type ContactState = {
  status: "idle" | "sent" | "error" | "fallback";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "message", string>>;
  values?: { name: string; email: string; message: string };
};

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  message: z
    .string()
    .trim()
    .min(10, "Please write at least a sentence.")
    .max(4000, "Please keep it under 4000 characters."),
});

const clientIp = async (): Promise<string> => {
  const h = await headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown"
  );
};

export async function sendMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: real people never see or fill this field. Pretend success so bots learn nothing.
  if (String(formData.get("website") ?? "") !== "") return { status: "sent" };

  const values = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  if (!hit(`contact:${await clientIp()}`, 3, 10 * 60 * 1000)) {
    return {
      status: "error",
      values,
      message:
        "Too many messages from your connection. Please wait a few minutes, or use email.",
    };
  }

  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    const flat = parsed.error.flatten().fieldErrors;
    return {
      status: "error",
      values,
      errors: {
        name: flat.name?.[0],
        email: flat.email?.[0],
        message: flat.message?.[0],
      },
    };
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL) {
    return {
      status: "fallback",
      values: parsed.data,
      message:
        "The contact form isn't connected yet. Please send your message by email instead.",
    };
  }

  const subjectName = parsed.data.name.replace(/[\r\n]+/g, " ");
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
        to: [CONTACT_TO_EMAIL],
        reply_to: parsed.data.email,
        subject: `Portfolio message from ${subjectName}`,
        text: `From: ${subjectName} <${parsed.data.email}>\n\n${parsed.data.message}`,
      }),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}`);
    return { status: "sent" };
  } catch {
    return {
      status: "fallback",
      values: parsed.data,
      message:
        "Something went wrong sending that. Your message is kept below; please email it instead.",
    };
  }
}
