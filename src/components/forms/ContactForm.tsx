"use client";

import { useActionState } from "react";
import { sendEnquiry, type ContactState } from "@/app/contact/actions";
import { services, site } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";

const field =
  "w-full rounded-control border border-line-strong bg-ink px-4 py-3 text-fg placeholder:text-muted-2 transition-colors focus:border-lime focus:outline-none";
const label = "eyebrow mb-2 block";

export function ContactForm() {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendEnquiry, { status: "idle" });

  if (state.status === "sent") {
    return (
      <div role="status" className="rounded-card border border-lime/40 bg-lime/5 p-8">
        <p className="display text-2xl text-lime">Message received.</p>
        <p className="mt-3 text-muted">Thank you. I reply to every enquiry personally, usually within 24 hours.</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>Name</label>
          <input id="name" name="name" required minLength={2} autoComplete="name" className={field} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="phone" className={label}>Phone / WhatsApp</label>
          <input id="phone" name="phone" required inputMode="tel" autoComplete="tel" className={field} placeholder="+971 50 000 0000" />
        </div>
      </div>
      <div>
        <label htmlFor="goal" className={label}>I am interested in</label>
        <select id="goal" name="goal" className={field} defaultValue={services[0].name}>
          {services.map((s) => (
            <option key={s.id} value={s.name}>{s.name}</option>
          ))}
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className={label}>Tell me about your goal</label>
        <textarea id="message" name="message" rows={5} className={field} placeholder="Where are you now, where do you want to be, and when can you train?" />
      </div>
      {/* Honeypot */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "error" && (
        <p role="alert" className="rounded-control border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">{state.message}</p>
      )}
      {state.status === "unconfigured" && (
        <p role="alert" className="rounded-control border border-line-strong bg-surface px-4 py-3 text-sm text-muted">
          The email form is not connected yet. Please message me on{" "}
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="text-lime underline underline-offset-4">WhatsApp</a>{" "}
          or email <a href={`mailto:${site.email}`} className="text-lime underline underline-offset-4">{site.email}</a>.
        </p>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button type="submit" disabled={pending} size="lg">
          {pending ? "Sending…" : "Send enquiry"}
        </Button>
        <p className="text-xs text-muted">Faster reply? WhatsApp me directly.</p>
      </div>
    </form>
  );
}
