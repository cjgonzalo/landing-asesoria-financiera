// Contact information constants
export const CONTACT_PHONE = process.env.CONTACT_PHONE_NUMBER || ""
export const CONTACT_EMAIL = process.env.CONTACT_EMAIL || ""
export const WHATSAPP_REF = `https://wa.me/${(process.env.CONTACT_PHONE_NUMBER || "").replace(/\s/g, "")}`
