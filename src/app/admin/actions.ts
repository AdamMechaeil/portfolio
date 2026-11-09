"use server";

import { revalidatePath } from "next/cache";
import { signOut } from "@/auth";
import prisma from "@/lib/db";
import { getAdminSession } from "@/lib/adminSession";

// Server actions can be called directly, so each one checks the session itself.
async function assertAdmin() {
  if (!(await getAdminSession())) throw new Error("Unauthorized");
}

function assertId(id: number) {
  if (!Number.isInteger(id) || id < 1) throw new Error("Invalid message id");
}

export async function setMessageRead(id: number, read: boolean) {
  await assertAdmin();
  assertId(id);
  await prisma.contactMessage.update({ where: { id }, data: { read } });
  revalidatePath("/admin");
}

export async function deleteMessage(id: number) {
  await assertAdmin();
  assertId(id);
  await prisma.contactMessage.delete({ where: { id } });
  revalidatePath("/admin");
}

export async function signOutAdmin() {
  await signOut({ redirectTo: "/admin/login" });
}
