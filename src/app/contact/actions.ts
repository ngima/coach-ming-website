"use server";

import { site } from "@/config/site";

export type ContactState = { status: "idle" | "sent" | "error" | "unconfigured"; message?: string };

const MAX = { name: 80, phone: 30, message: 1500 };

export async function sendEnquiry(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: real users never fill this hidden field.
  if (formData.get("website")) return { status: "sent" };

  const name = String(formData.get("name") ?? "").trim().slice(0, MAX.name);
  const phone = String(formData.get("phone") ?? "").trim().slice(0, MAX.phone);
  const goal = String(formData.get("goal") ?? "").trim().slice(0, 60);
  const message = String(formData.get("message") ?? "").trim().slice(0, MAX.message);

  if (name.length < 2 || phone.length < 6) {
    return { status: "error", message: "Please add your name and a phone number so I can reply." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;
  if (!apiKey) return { status: "unconfigured" };

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "Website <onboarding@resend.dev>",
      to,
      subject: `New enquiry from ${name} · ${goal || "General"}`,
      text: `Name: ${name}\nPhone: ${phone}\nGoal: ${goal}\n\n${message}`,
    });
    if (error) throw error;
    return { status: "sent" };
  } catch (err) {
    console.error("[contact] send failed", err);
    return { status: "error", message: "Something went wrong sending your message. Please use WhatsApp instead." };
  }
}
