// Shared rules for the contact form: used by the modal (input limits) and by
// the server action (the real checks, since browser checks can be bypassed).
export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  mobile: 30,
  query: 2000,
} as const;

// At most `max` messages per visitor within `windowMs`.
export const CONTACT_RATE_LIMIT = {
  max: 3,
  windowMs: 10 * 60 * 1000,
} as const;

export type ContactInput = {
  name: string;
  email: string;
  mobile: string;
  query: string;
  // Honeypot: hidden from people, so only bots fill it in.
  hp: string;
};

export type ContactResult = { success: true } | { success: false; error: string };

export type CleanContact = {
  name: string;
  email: string;
  mobile: string | null;
  query: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_PATTERN = /^[0-9+()\-.\s]{6,30}$/;

export function validateContact(
  input: Partial<ContactInput>,
): { ok: true; data: CleanContact } | { ok: false; error: string } {
  const name = String(input.name ?? "").trim();
  const email = String(input.email ?? "").trim();
  const mobile = String(input.mobile ?? "").trim();
  const query = String(input.query ?? "").trim();

  if (!name) return { ok: false, error: "Please enter your name." };
  if (name.length > CONTACT_LIMITS.name) {
    return {
      ok: false,
      error: `Name is too long (max ${CONTACT_LIMITS.name} characters).`,
    };
  }

  if (!email || email.length > CONTACT_LIMITS.email || !EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  if (mobile && (mobile.length > CONTACT_LIMITS.mobile || !MOBILE_PATTERN.test(mobile))) {
    return { ok: false, error: "Please enter a valid mobile number, or leave it empty." };
  }

  if (!query) return { ok: false, error: "Please enter a message." };
  if (query.length > CONTACT_LIMITS.query) {
    return {
      ok: false,
      error: `Message is too long (max ${CONTACT_LIMITS.query} characters).`,
    };
  }

  return { ok: true, data: { name, email, mobile: mobile || null, query } };
}
