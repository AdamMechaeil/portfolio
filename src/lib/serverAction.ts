"use server";

import { createHmac } from "node:crypto";
import { headers } from "next/headers";
import prisma from "@/lib/db";
import {
  CONTACT_RATE_LIMIT,
  validateContact,
  type ContactInput,
  type ContactResult,
} from "@/lib/contact";

// A keyed hash of the visitor's IP (or of their email when no IP is available),
// so rate limiting works without storing anything that identifies a visitor.
// DATABASE_URL is a secret every environment already has, so it doubles as the key.
async function getVisitorKey(email: string) {
  const requestHeaders = await headers();
  const ip =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip") ||
    null;
  const key = process.env.DATABASE_URL ?? "contact-visitor-key";
  return createHmac("sha256", key)
    .update(ip ?? `email:${email.toLowerCase()}`)
    .digest("hex")
    .slice(0, 32);
}

export async function submitContactMessage(
  input: ContactInput,
): Promise<ContactResult> {
  try {
    // Honeypot: bots fill the hidden field. Pretend it worked and save nothing.
    if (input?.hp) return { success: true };

    const checked = validateContact(input ?? {});
    if (!checked.ok) return { success: false, error: checked.error };

    const visitorKey = await getVisitorKey(checked.data.email);

    const since = new Date(Date.now() - CONTACT_RATE_LIMIT.windowMs);
    const recent = await prisma.contactMessage.count({
      where: { visitorKey, createdAt: { gte: since } },
    });
    if (recent >= CONTACT_RATE_LIMIT.max) {
      return {
        success: false,
        error: "You have sent a few messages already. Please try again in a few minutes.",
      };
    }

    await prisma.contactMessage.create({
      data: { ...checked.data, visitorKey },
    });

    return { success: true };
  } catch (error) {
    console.error("Error saving contact message:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
