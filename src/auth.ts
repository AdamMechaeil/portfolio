import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { isAdminEmail } from "@/lib/admin";

// Google sign-in for a single account. Reads AUTH_SECRET, AUTH_GOOGLE_ID and
// AUTH_GOOGLE_SECRET from the environment. Sessions live in a signed cookie, so
// no database tables are needed.
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  session: { strategy: "jwt", maxAge: 60 * 60 * 8 },
  pages: { signIn: "/admin/login", error: "/admin/login" },
  callbacks: {
    // Reject every Google account except the owner's, and require Google to
    // confirm that the email is verified.
    signIn({ profile }) {
      return profile?.email_verified === true && isAdminEmail(profile.email);
    },
  },
});
