import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { getAdminSession } from "@/lib/adminSession";
import { oswald } from "@/lib/constants";

const errorMessages: Record<string, string> = {
  AccessDenied: "That Google account is not allowed here.",
  Configuration: "Sign-in is not set up yet.",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await getAdminSession()) redirect("/admin");

  const { error } = await searchParams;

  // Without all four settings sign-in can never succeed, so say so up front
  // instead of sending the visitor to a Google error page.
  const configured = Boolean(
    process.env.ADMIN_EMAIL &&
      process.env.AUTH_SECRET &&
      process.env.AUTH_GOOGLE_ID &&
      process.env.AUTH_GOOGLE_SECRET,
  );

  const message = !configured
    ? errorMessages.Configuration
    : error
      ? (errorMessages[error] ?? "Sign-in failed. Please try again.")
      : null;

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md">
        <h1
          className={`${oswald.className} text-3xl font-bold uppercase tracking-wide`}
        >
          Restricted <span className="text-blue-400">Area</span>
        </h1>
        <p className="mt-2 font-mono text-xs uppercase tracking-widest text-white/50">
          // Owner only
        </p>

        {message && (
          <p role="alert" className="mt-6 font-mono text-xs text-red-300">
            {message}
          </p>
        )}

        {configured && (
          <form
            className="mt-8"
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/admin" });
            }}
          >
            <button
              type="submit"
              className="w-full rounded-lg bg-white px-4 py-3 font-bold uppercase tracking-wider text-black transition-all hover:bg-blue-400 active:scale-95"
            >
              Sign in with Google
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
