import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, mobile, query } = body;

    if (!name || !email || !mobile || !query) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const message = await prisma.contactMessage.create({
      data: {
        name,
        email,
        mobile,
        query,
      },
    });

    return NextResponse.json(
      { success: true, data: message },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving contact message:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
