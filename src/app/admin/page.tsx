import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { getAdminSession } from "@/lib/adminSession";
import { oswald } from "@/lib/constants";
import { MessageActions } from "./MessageActions";
import { signOutAdmin } from "./actions";

// Personal data: never cache this page.
export const dynamic = "force-dynamic";

const dateFormat = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "Asia/Kolkata",
  timeZoneName: "short",
});

export default async function AdminPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const [messages, total, unread] = await Promise.all([
    prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
    }),
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { read: false } }),
  ]);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 md:py-16">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1
            className={`${oswald.className} text-4xl font-bold uppercase tracking-wider md:text-5xl`}
          >
            Comms Log
          </h1>
          <p className="mt-2 font-mono text-sm uppercase tracking-widest text-blue-400">
            // Private dashboard
          </p>
        </div>
        <div className="flex items-center gap-4">
          <p className="font-mono text-xs uppercase tracking-widest text-white/60">
            <span className="text-blue-400">{unread} unread</span> · {total}{" "}
            total
          </p>
          <form action={signOutAdmin}>
            <button
              type="submit"
              className="rounded-full border border-white/20 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-white/80 transition-colors hover:border-white/50 hover:text-white"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>

      {messages.length === 0 ? (
        <p className="rounded-xl border border-white/10 p-8 text-center font-mono text-sm text-white/50">
          No messages yet.
        </p>
      ) : (
        <ul className="space-y-4">
          {messages.map((message) => (
            <li
              key={message.id}
              className={`rounded-xl border p-5 md:p-6 ${
                message.read
                  ? "border-white/10 bg-white/[0.03]"
                  : "border-blue-500/40 bg-blue-500/[0.06]"
              }`}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h2 className="flex items-center gap-2 text-lg font-bold">
                  {!message.read && (
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full bg-blue-400"
                      aria-label="Unread"
                    />
                  )}
                  {message.name}
                </h2>
                <time
                  dateTime={message.createdAt.toISOString()}
                  className="font-mono text-xs text-white/50"
                >
                  {dateFormat.format(message.createdAt)}
                </time>
              </div>

              <p className="mt-1 flex flex-wrap gap-x-4 font-mono text-sm text-white/70">
                <a
                  href={`mailto:${encodeURIComponent(message.email)}`}
                  className="underline decoration-white/30 underline-offset-4 hover:text-blue-300"
                >
                  {message.email}
                </a>
                {message.mobile && (
                  <a
                    href={`tel:${message.mobile.replace(/[^0-9+]/g, "")}`}
                    className="underline decoration-white/30 underline-offset-4 hover:text-blue-300"
                  >
                    {message.mobile}
                  </a>
                )}
              </p>

              <p className="mt-4 whitespace-pre-wrap break-words leading-relaxed text-white/85">
                {message.query}
              </p>

              <MessageActions
                id={message.id}
                read={message.read}
                name={message.name}
              />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
