import { site } from "@/config/site";

/** Build a WhatsApp deep link with a pre-filled message. */
export function whatsappUrl(message: string = site.whatsappMessage, number: string = site.whatsapp) {
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
