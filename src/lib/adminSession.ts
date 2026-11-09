import { auth } from "@/auth";
import { isAdminEmail } from "@/lib/admin";

// The single gate for everything under /admin. Pages and server actions both
// call this on every request, so access never depends on the login screen alone.
export async function getAdminSession() {
  const session = await auth();
  return session?.user?.email && isAdminEmail(session.user.email)
    ? session
    : null;
}
