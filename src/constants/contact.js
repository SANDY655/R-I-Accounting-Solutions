export const PHONE_NUMBER = "91971523008156";
export const PHONE_DISPLAY = "+91 971523008156";
export const WHATSAPP_LABEL = "Chat on WhatsApp Business";

export const WHATSAPP_MESSAGE =
  "Hi, I'd like to enquire about your services.";

const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);

export const WHATSAPP_URL = `https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`;

export const WHATSAPP_API_URL = `https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${encodedMessage}`;

/** Android Chrome intent — targets WhatsApp Business (com.whatsapp.w4b). */
export function getWhatsAppBusinessIntentUrl() {
  return (
    `intent://send?phone=${PHONE_NUMBER}&text=${encodedMessage}` +
    `#Intent;scheme=whatsapp;package=com.whatsapp.w4b;action=android.intent.action.VIEW;` +
    `S.browser_fallback_url=${encodeURIComponent(WHATSAPP_URL)};end`
  );
}
