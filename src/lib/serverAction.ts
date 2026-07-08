"use server";

import prisma from "@/lib/db";

export async function submitContactMessage(data: {
  name: string;
  email: string;
  mobile: string;
  query: string;
}) {
  try {
    const { name, email, mobile, query } = data;

    if (!name || !email || !mobile || !query) {
      return { success: false, error: "All fields are required" };
    }

    const message = await prisma.contactMessage.create({
      data: {
        name,
        email,
        mobile,
        query,
      },
    });

    return { success: true, data: message };
  } catch (error) {
    console.error("Error saving contact message:", error);
    return { success: false, error: "Internal server error" };
  }
}
