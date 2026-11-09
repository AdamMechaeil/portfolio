// Only the owner's Google account may use /admin. This fails closed: when
// ADMIN_EMAIL is not set, nobody gets in.
export function isAdminEmail(email: string | null | undefined): boolean {
  const allowed = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  return Boolean(allowed && email && email.trim().toLowerCase() === allowed);
}
