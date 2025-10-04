export const CONTACT_PHONE = process.env.CONTACT_PHONE_NUMBER || ""
export const WHATSAPP_REF = `https://wa.me/${process.env.CONTACT_PHONE_NUMBER?.replaceAll(" ", "")}`
export const CONTACT_EMAIL = process.env.CONTACT_EMAIL || ""
