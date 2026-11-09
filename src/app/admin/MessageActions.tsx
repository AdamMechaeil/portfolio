"use client";

import { useState, useTransition } from "react";
import { deleteMessage, setMessageRead } from "./actions";

const buttonClass =
  "rounded-full border border-white/20 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-white/80 transition-colors hover:border-white/50 hover:text-white disabled:opacity-50";

export function MessageActions({
  id,
  read,
  name,
}: {
  id: number;
  read: boolean;
  name: string;
}) {
  const [pending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState("");

  const run = (action: () => Promise<void>) => {
    setError("");
    startTransition(async () => {
      try {
        await action();
        setConfirming(false);
      } catch {
        setError("Something went wrong. Please try again.");
      }
    });
  };

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      <button
        type="button"
        disabled={pending}
        onClick={() => run(() => setMessageRead(id, !read))}
        className={buttonClass}
      >
        {read ? "Mark unread" : "Mark read"}
      </button>

      {confirming ? (
        <>
          <span className="font-mono text-xs text-red-300">
            Delete permanently?
          </span>
          <button
            type="button"
            disabled={pending}
            onClick={() => run(() => deleteMessage(id))}
            aria-label={`Confirm deleting the message from ${name}`}
            className="rounded-full border border-red-400/60 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-red-300 transition-colors hover:bg-red-500/10 disabled:opacity-50"
          >
            Yes, delete
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={() => setConfirming(false)}
            className={buttonClass}
          >
            Cancel
          </button>
        </>
      ) : (
        <button
          type="button"
          disabled={pending}
          onClick={() => setConfirming(true)}
          aria-label={`Delete the message from ${name}`}
          className={buttonClass}
        >
          Delete
        </button>
      )}

      {error && (
        <span role="alert" className="font-mono text-xs text-red-300">
          {error}
        </span>
      )}
    </div>
  );
}
