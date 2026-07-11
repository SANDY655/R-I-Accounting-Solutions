import React from "react";
import { WHATSAPP_URL } from "../constants/contact";
import { handleWhatsAppClick } from "../utils/openWhatsAppBusiness";

export default function WhatsAppLink({ className, children, ...props }) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={handleWhatsAppClick}
      {...props}
    >
      {children}
    </a>
  );
}
