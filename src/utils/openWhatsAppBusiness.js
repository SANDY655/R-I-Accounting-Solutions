import {
  WHATSAPP_URL,
  getWhatsAppBusinessIntentUrl,
} from "../constants/contact";

const isAndroid = () => /Android/i.test(navigator.userAgent);

export function handleWhatsAppClick(event) {
  if (!isAndroid()) return;

  event.preventDefault();
  window.location.href = getWhatsAppBusinessIntentUrl();
}

export function getWhatsAppHref() {
  return isAndroid() ? getWhatsAppBusinessIntentUrl() : WHATSAPP_URL;
}
